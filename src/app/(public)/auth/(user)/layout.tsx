"use client";

import { UserState } from "@/types";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const user = session?.user as UserState;

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
        <h6 className="ml-4">Loading...</h6>
      </div>
    );
  }
  if (user && user.id) {
    redirect("/");
  }
  return <div>{children}</div>;
}
