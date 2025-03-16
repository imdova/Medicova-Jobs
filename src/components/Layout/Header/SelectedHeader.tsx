'use client';
import { matchRoute } from "./routeConfigs";
import MinimalHeader from "./MinimalHeader";
import FullHeader from "./FullHeader";
import CenteredHeader from "./CenteredHeader";
import TransparentHeader from "./TransparentHeader";
import DarkHeader from "./DarkHeader";
import { UserState } from "@/types";
import { usePathname } from "next/navigation";
// import useValidateUser from "@/hooks/useValidateUser";

const HeaderSelector: React.FC<{ user?: UserState }> = ({ user }) => {
    const pathname = usePathname();
    const headerType = matchRoute(pathname)?.headerType || "minimal";

    const headerComponents = {
        minimal: MinimalHeader,
        full: FullHeader,
        centered: CenteredHeader,
        transparent: TransparentHeader,
        dark: DarkHeader,
    };

    const SelectedHeader = headerComponents[headerType];

    return <SelectedHeader user={user} pathname={"/"} />;
};

export default HeaderSelector;
