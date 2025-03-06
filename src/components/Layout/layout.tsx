"use client";
import { usePathname } from "next/navigation";
import { matchRoute } from "./SideBar/LayoutRoutConfigs";

const DynamicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || "/";
  const sideBarType = matchRoute(pathname)?.sideBarType || "";
  return (
    <div
      className={
        sideBarType === "full"
          ? "container mx-auto my-4 flex min-h-[calc(100vh-150px)] gap-5 w-full flex-row md:my-8 lg:max-w-[1300px]"
          : ""
      }
    >
      {children}
    </div>
  );
};

export default DynamicLayout;
