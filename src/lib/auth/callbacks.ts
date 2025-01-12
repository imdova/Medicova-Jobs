import { JWT } from "next-auth/jwt";
import { getServerSession, Session } from "next-auth";
import { handleSocialLogin } from "./utils";
import { RoleState } from "@/types/next-auth";
import { divideName } from "@/util";

export const callbacks = {
  async jwt({ token, user }: { token: JWT; user: any }) {
    const { firstName, lastName } = divideName(user?.name);
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.firstName = user.firstName || firstName;
      token.lastName = user.lastName || lastName;
      token.roles = user.roles;
      token.role = user.role || "seeker";
      token.active = user.active;
      token.photo = user.photo || user.image;
      token.birth = user.birth;
      token.phone = user.phone;
      token.companyId = user.companyId;
      token.created_at = user.created_at;
      token.deleted_at = user.deleted_at;
      token.updated_at = user.updated_at;
    }
    return token;
  },

  async session({ session, token }: { session: Session; token: JWT }) {
    if (session.user) {
      session.user.id = token.id as string | null;
      session.user.email = token.email as string | null;
      session.user.firstName = token.firstName as string | null;
      session.user.lastName = token.lastName as string | null;
      session.user.roles = token.roles as string[];
      session.user.role = token.role as RoleState;
      session.user.active = token.active as boolean;
      session.user.photo = token.photo as string | undefined;
      session.user.birth = token.birth as string | null;
      session.user.phone = token.phone as string | null;
      session.user.companyId = token.companyId as string | null;
      session.user.created_at = token.created_at as string | null;
      session.user.deleted_at = token.deleted_at as string | null;
      session.user.updated_at = token.updated_at as string | null;
    }
    return session;
  },

  async signIn({ user, account }: { user: any; account: any }) {
    if (account?.provider === "google" || account?.provider === "facebook") {
      return handleSocialLogin(user, account);
    }
    return true;
  },

  // async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
  //   // Redirect to /me/[name] after login
  //   // console.log("🚀 ~ redirect ~ url:", url)
  //   if (url === "/me") {
  //     const session = await getServerSession();
  //     console.log("🚀 ~ redirect ~ session:", session);
  //   }
  //   return baseUrl;
  // },
};
