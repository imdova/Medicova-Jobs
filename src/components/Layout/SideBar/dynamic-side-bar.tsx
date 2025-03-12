"use client";
import { UserState } from "@/types";
import { matchRoute } from "./LayoutRoutConfigs";
import { usePathname } from "next/navigation";
import VerticalTabs from "./vertical-tabs";

export default function DynamicSideBar({ user }: { user?: UserState }) {
  const pathname = usePathname() || "/";
  const sideBarType = matchRoute(pathname)?.sideBarType || "";
  // TODO: add more styles of side bar , add minimal for the pages that contain a filter
  // TODO: make it fixed width
  return sideBarType === "full" ? (
    <aside className="mt ml-4 hidden w-80 rounded-base border border-gray-100 bg-white py-4 shadow-soft lg:block">
      <div className="sticky top-[85px]">
        <VerticalTabs user={user} pathname={pathname} />
      </div>
    </aside>
  ) : null;
}
