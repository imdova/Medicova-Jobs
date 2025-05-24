import NextAuth from "next-auth";
import { Permission } from "./permissions";
export type RoleState =
  | "seeker"
  | "admin"
  | "employer"
  | "unEmployee"
  | "unverified";

export type Role = {
  id: string;
  name: string;
  description: string;
  forUserType: RoleState;
  companyId: string | null;
  permissions: Permission[];

  // TODO: add users
  users: number;
};

export type Permission = {
  id: string;
  name: string;
  key: string;
  description: string;
  forUserType: RoleState;
};

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
