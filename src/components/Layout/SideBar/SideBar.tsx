import { authOptions } from "@/lib/auth/config";
import { UserState } from "@/types";
import { getServerSession } from "next-auth";
import DynamicSideBar from "./dynamic-side-bar";

const SideBar = async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user as UserState;
  return <DynamicSideBar user={user} />;
};

export default SideBar;
