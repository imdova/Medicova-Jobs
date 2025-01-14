import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { handleSocialLogin } from "./utils";
import { divideName } from "@/util";
import { Permission } from "@/types/permissions";
import { RoleState } from "@/types/next-auth";

export const callbacks = {
  async jwt({ token, user }: { token: JWT; user: any }) {
    const { firstName, lastName } = divideName(user?.name);
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.firstName = user.firstName || firstName;
      token.lastName = user.lastName || lastName;
      token.photo = user.photo || user.image;
      token.phone = user.phone;
      token.companyId = user.companyId;
      token.permissions = user.permissions;
      token.type = user.type;
    }
    return token;
  },

  async session({ session, token }: { session: Session; token: JWT }) {
    if (session.user) {
      session.user.id = token.id as string | null;
      session.user.email = token.email as string | null;
      session.user.firstName = token.firstName as string | null;
      session.user.lastName = token.lastName as string | null;
      session.user.photo = token.photo as string | null;
      session.user.phone = token.phone as string | null;
      session.user.companyId = token.companyId as string | null;
      session.user.permissions = token.permissions as Permission[];
      session.user.type = token.type as RoleState;
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

  async authorize(credentials: any, req: any) {
    console.log("🚀 ~ authorize ~ credentials:", credentials);
    const { state } = req.query; // Retrieve state from query params
    const parsedState = state ? JSON.parse(state) : null;

    console.log("Custom state:", parsedState);

    // Proceed with authentication
    return { id: 1, name: "User" }; // Example user
  },
};
