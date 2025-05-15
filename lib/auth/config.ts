import { AuthOptions } from "next-auth";
import { providers } from "./providers";
import { callbacks } from "./callbacks";

export const authOptions: AuthOptions = {
  providers,
  callbacks,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
