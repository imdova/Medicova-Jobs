import { getUser } from "@/lib/actions/users.actions";
import ProfileMe from "./profileMe";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: profileUser } = await getUser(id);
  // if(!profileUser) {
  //   return notFound();
  // }
  return <ProfileMe profileUser={profileUser} />;
};

export default ProfilePage;
