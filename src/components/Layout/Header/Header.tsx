"use client";
import { usePathname } from "next/navigation";
import { matchRoute } from "./routeConfigs";
import MinimalHeader from "./MinimalHeader";
import FullHeader from "./FullHeader";
import CenteredHeader from "./CenteredHeader";
import TransparentHeader from "./TransparentHeader";
import DarkHeader from "./DarkHeader";
import { useSession } from "next-auth/react";
import { UserState } from "@/types";
import { NextAuthProvider } from "@/NextAuthProvider";

const DynamicHeader: React.FC = () => {
  const session = useSession();
  const user = session.data?.user as UserState;

  const pathname = usePathname() || "/";
  const headerType = matchRoute(pathname)?.headerType || "minimal";

  const headerComponents = {
    minimal: MinimalHeader,
    full: FullHeader,
    centered: CenteredHeader,
    transparent: TransparentHeader,
    dark: DarkHeader,
  };

  const SelectedHeader = headerComponents[headerType];

  return <SelectedHeader user={user} pathname={pathname} />;
};

const Header = () => {
  return (
    <NextAuthProvider>
      <DynamicHeader />
    </NextAuthProvider>
  );
};

export default Header;
