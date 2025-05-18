import NextAuth from "next-auth";
import { Permission } from "./permissions";
export type RoleState =
  | "seeker"
  | "admin"
  | "employer"
  | "unEmployee"
  | "unverified";

declare module "next-auth" {
  interface User {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    userName: string | null;
    type: RoleState;
    isVerified?: boolean;
    photo: string | null;
    phone: string | null;
    companyId?: string | null;
    companyName?: string | null;
    companyUserName?: string | null;
    companyEmail?: string | null;
    companyPhoto?: string | null;
    permissions?: Permission[];
  }

  interface Session {
    user: User;
    redirectUrl: string | null;
  }
}
