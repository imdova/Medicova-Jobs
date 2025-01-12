import NextAuth from "next-auth";
export type RoleState = "seeker" | "admin" | "employer";

declare module "next-auth" {
  interface User {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    roles: string[];
    role: RoleState;
    active: boolean;
    photo?: string;
    birth: string | null;
    phone: string | null;
    companyId: string | null;
    created_at: string | null;
    deleted_at: string | null;
    updated_at: string | null;
  }

  interface Session {
    user: User & {
      id: string | null;
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      roles: string[];
      role: RoleState;
      active: boolean;
      photo?: string;
      birth: string | null;
      phone: string | null;
      companyId: string | null;
      created_at: string | null;
      deleted_at: string | null;
      updated_at: string | null;
    };
    redirectUrl:string | null
  }
}
