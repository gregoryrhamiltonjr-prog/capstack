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
      if (!user?.passwordHash) return null;
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
      }
      // Keep token.uid stable across requests
      if (!token.uid && token.sub) {
        token.uid = token.sub;
      }
      if (trigger === "update" && session) {
        // no-op placeholder for client session updates
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        (session.user as { id?: string }).id = String(token.uid);
      }
      return session;
    },
    async signIn({ user, account }) {
      // Ensure CapStack profile fields exist for OAuth users
      if (account?.provider !== "credentials" && user.email) {
        const existing = await db.user.findUnique({ where: { email: user.email } });
        if (existing) {
          const updates: { displayName?: string; avatarUrl?: string | null; image?: string | null; name?: string | null } = {};
          if (!existing.displayName || existing.displayName === "Learner") {
            updates.displayName = user.name || existing.displayName || user.email.split("@")[0];
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
