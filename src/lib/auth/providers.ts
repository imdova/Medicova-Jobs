import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateOTP, authenticateUser } from "./utils";

export const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
  }),
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: authenticateUser,
  }),
  CredentialsProvider({
    id: "OTP-Credentials",
    name: "OTP Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      otp: { label: "otp", type: "otp" },
    },
    authorize: authenticateOTP,
  }),
];
