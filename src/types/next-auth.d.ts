import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      displayName?: string;
      avatarUrl?: string | null;
      isAdmin?: boolean;
      careerStage?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    displayName?: string;
    avatarUrl?: string | null;
    isAdmin?: boolean;
    careerStage?: string;
  }
}
