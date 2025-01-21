import NextAuth from "next-auth";
import { Permission } from "./permissions";
export type RoleState = "seeker" | "admin" | "employer";

declare module "next-auth" {
  interface User {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    type: RoleState;
    photo: string | null;
    phone: string | null;
    companyId: string | null;
    permissions: Permission[];
  }

  interface Session {
    user: User;
    redirectUrl: string | null;
  }
}
