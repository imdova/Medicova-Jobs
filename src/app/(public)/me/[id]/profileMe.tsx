"use client";
import { UserState } from "@/types";
import { useSession } from "next-auth/react";
import SeekerPage from "./SeekerPage";
import EmployerPage from "./EmployerPage";
import Loading from "@/components/loading/loading";

export default function ProfileMe({
  profileUser,
}: {
  profileUser?: UserState;
}) {
  const { data: session, status } = useSession();
  const user = session?.user as UserState;
  const isMe = true || user?.id === profileUser?.id;

  if (status === "loading") {
    return <Loading />;
  }

  // return <EmployerPage user={user} isMe={isMe} />;
  return user?.type === "seeker" ? (
    <SeekerPage user={user} isMe={isMe} isLocked={true} />
  ) : user?.type === "employer" ? (
    <EmployerPage user={user} isMe={isMe} />
  ) : null;
}
