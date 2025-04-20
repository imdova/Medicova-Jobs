"use client";
import { matchRoute } from "./routeConfigs";
import MinimalHeader from "./MinimalHeader";
import FullHeader from "./FullHeader";
import CenteredHeader from "./CenteredHeader";
import TransparentHeader from "./TransparentHeader";
import DarkHeader from "./DarkHeader";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
// import useValidateUser from "@/hooks/useValidateUser";

const HeaderSelector: React.FC<{ user?: User }> = ({ user }) => {
  const pathname = usePathname();
  const headerType = matchRoute(pathname)?.headerType || "minimal";

  const headerComponents = {
    minimal: MinimalHeader,
    full: FullHeader,
    centered: CenteredHeader,
    transparent: TransparentHeader,
    dark: DarkHeader,
  };

  if (headerType === "none") return null;
  const SelectedHeader = headerComponents[headerType];

  return <SelectedHeader user={user} pathname={pathname} />;
};

export default HeaderSelector;
