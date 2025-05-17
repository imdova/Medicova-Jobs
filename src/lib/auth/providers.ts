import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  changePasswordWithOTP,
  authenticateRegister,
  authenticateUser,
  authenticateToken,
} from "./utils";

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
      email: { type: "email" },
      password: { type: "password" },
      otp: { type: "text" },
    },
    authorize: changePasswordWithOTP,
  }),
  CredentialsProvider({
    id: "register",
    name: "register Credentials",
    credentials: {
      firstName: { type: "text" },
      lastName: { type: "text" },
      email: { type: "email" },
      password: { type: "password" },
      phone: { type: "text" },
      type: { type: "text" },
    },
    authorize: authenticateRegister,
  }),
  CredentialsProvider({
    id: "token-credentials",
    name: "credentials with token",
    credentials: {
      token: { type: "text" },
    },
    authorize: authenticateToken,
  }),
];
