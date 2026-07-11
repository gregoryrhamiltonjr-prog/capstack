import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth-password";

const providers = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

if (process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET) {
  providers.push(
    Apple({
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: process.env.AUTH_APPLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

providers.push(
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = String(credentials?.email || "")
        .trim()
        .toLowerCase();
      const password = String(credentials?.password || "");
      if (!email || !password) return null;

      const user = await db.user.findUnique({ where: { email } });
      if (!user?.passwordHash || !user.isAdmin) return null;
      const ok = await verifyPassword(password, user.passwordHash);
      if (!ok) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.displayName || user.name || user.email,
        image: user.avatarUrl || user.image || null,
      };
    },
  })
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as never,
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/onboarding",
  },
  providers,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user?.id) {
        token.uid = user.id;
        const dbUser = await db.user.findUnique({ where: { id: user.id } });
        if (dbUser) {
          token.displayName = dbUser.displayName;
          token.avatarUrl = dbUser.avatarUrl;
          token.isAdmin = dbUser.isAdmin;
          token.careerStage = dbUser.careerStage;
        }
      }
      // Keep token.uid stable across requests
      if (!token.uid && token.sub) {
        token.uid = token.sub;
      }
      if (trigger === "update" && session) {
        if (session.displayName !== undefined) token.displayName = session.displayName;
        if (session.avatarUrl !== undefined) token.avatarUrl = session.avatarUrl;
        if (session.careerStage !== undefined) token.careerStage = session.careerStage;
        if (session.name !== undefined) token.name = session.name;
        if (session.image !== undefined) token.image = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        session.user.id = String(token.uid);
        session.user.displayName = token.displayName;
        session.user.avatarUrl = token.avatarUrl;
        session.user.isAdmin = token.isAdmin;
        session.user.careerStage = token.careerStage;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Ensure CapStack profile fields exist for OAuth users
      if (account?.provider !== "credentials" && user.email) {
        const email = user.email.trim().toLowerCase();
        const existing = await db.user.findUnique({ where: { email } });
        // Private platform: OAuth may NOT create new accounts. Only pre-provisioned
        // admins can sign in — deny everyone else before Auth.js links an account.
        if (!existing?.isAdmin) return false;

        const updates: { displayName?: string; avatarUrl?: string | null; image?: string | null; name?: string | null } = {};
        if (!existing.displayName || existing.displayName === "Learner") {
          updates.displayName = user.name || existing.displayName || email.split("@")[0];
        }
        if (!existing.avatarUrl && (user.image || existing.image)) {
          updates.avatarUrl = user.image || existing.image;
        }
        if (user.name && !existing.name) updates.name = user.name;
        if (user.image && !existing.image) updates.image = user.image;
        if (Object.keys(updates).length) {
          await db.user.update({ where: { id: existing.id }, data: updates });
        }
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.id) return;
      const displayName = user.name || user.email?.split("@")[0] || "Learner";
      await db.user.update({
        where: { id: user.id },
        data: {
          displayName,
          name: user.name || displayName,
          avatarUrl: user.image || null,
          image: user.image || null,
        },
      });
    },
  },
});

export function oauthProvidersEnabled() {
  return {
    google: Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
    apple: Boolean(process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET),
  };
}
