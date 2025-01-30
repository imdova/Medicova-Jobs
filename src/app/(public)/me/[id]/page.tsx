import { getUser } from "@/lib/actions/users.actions";
import ProfileMe from "./profileMe";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  const result = await getUser(id);
  if (!result.success || !result.data) return notFound();
  const profileUser = result.data;
  return <ProfileMe profileUser={profileUser} />;
};

export default ProfilePage;
