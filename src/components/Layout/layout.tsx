"use client";
import { usePathname } from "next/navigation";
import { matchRoute } from "./SideBar/LayoutRoutConfigs";

const DynamicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || "/";
  const sideBarType = matchRoute(pathname)?.sideBarType || "";
  return (
    <div
      className={
        sideBarType === "full" || sideBarType === "minimal"
          ? "container mx-auto my-4 flex min-h-[calc(100vh-150px)] w-full flex-row md:my-8 md:max-w-[1300px]"
          : ""
      }
    >
      {children}
    </div>
  );
};

export default DynamicLayout;
