"use client";
import { UserState } from "@/types";
import { useSession } from "next-auth/react";
import SeekerPage from "./SeekerPage";
import EmployerPage from "./EmployerPage";

export default function ProfileMe({ profileUser }: { profileUser: UserState }) {
  const { data: session, status } = useSession();
  const user = session?.user as UserState;
  const isMe = true || user?.id === profileUser?.id;

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p> Loading...</p>
      </div>
    );
  }

  // return <EmployerPage user={user} isMe={isMe} />;
  return user?.type === "seeker" ? (
    <SeekerPage user={user} isMe={isMe} />
  ) : user?.type === "employer" ? (
    <EmployerPage user={user} isMe={isMe} />
  ) : null;
  //   return profileUser?.role === "seeker" ? (
  //     <SeekerPage user={profileUser} isMe={isMe} />
  //   ) : user?.role === "employer" ? (
  //     <EmployerPage user={profileUser} isMe={isMe} />
  //   ) : null;
}
