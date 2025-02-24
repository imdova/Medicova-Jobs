import { matchRoute } from "./SideBar/LayoutRoutConfigs";
import DynamicSideBar from "./SideBar/dynamic-side-bar";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "@/lib/auth/config";

const DynamicLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getServerSession(authOptions);
  const user = data?.user
  const headersList = headers();
  const fullPathName = headersList.get('x-url') || headersList.get('referer') || '/';
  const pathname = new URL(fullPathName, 'http://localhost').pathname;
  const sideBarType = matchRoute(pathname)?.sideBarType || "";
  const getLayout = () => {
    switch (sideBarType) {
      case "full":
        return (
          <div className="container mx-auto my-4 md:my-8 flex min-h-[calc(100vh-150px)] w-full flex-row lg:max-w-[1300px]">
            <aside className="hidden mx-2 w-1/5 rounded-base border border-gray-100 bg-white py-4 shadow-xl lg:block">
              <div className="sticky top-[85px]">
                <DynamicSideBar user={user} pathname={pathname} />
              </div>
            </aside>
            <main className="w-full px-0 md:px-6 lg:w-4/5">{children}</main>
          </div>
        );
      case "minimal":
        return children;
      default:
        return children;
    }
  };

  return getLayout();
};

export default DynamicLayout;
