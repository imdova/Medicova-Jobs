import { matchRoute } from "./routeConfigs";
import MinimalHeader from "./MinimalHeader";
import FullHeader from "./FullHeader";
import CenteredHeader from "./CenteredHeader";
import TransparentHeader from "./TransparentHeader";
import DarkHeader from "./DarkHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { headers } from "next/headers";

const DynamicHeader: React.FC = async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user
  const headersList = headers();
  const pathname = headersList.get('x-url') || headersList.get('referer') || '/';
  const parsedPathname = new URL(pathname, 'http://localhost').pathname;
  const headerType = matchRoute(parsedPathname)?.headerType || "minimal";

  const headerComponents = {
    minimal: MinimalHeader,
    full: FullHeader,
    centered: CenteredHeader,
    transparent: TransparentHeader,
    dark: DarkHeader,
  };

  const SelectedHeader = headerComponents[headerType];

  return <SelectedHeader user={user} pathname={parsedPathname} />;
};

export default DynamicHeader;
