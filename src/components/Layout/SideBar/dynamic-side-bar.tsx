"use client";
import { UserState } from "@/types";
import { matchRoute } from "./LayoutRoutConfigs";
import { usePathname } from "next/navigation";
import VerticalTabs from "./vertical-tabs";

export default function DynamicSideBar({ user }: { user?: UserState }) {
  const pathname = usePathname() || "/";
  const sideBarType = matchRoute(pathname)?.sideBarType || "";

  // TODO : add side bar for mobile
  const isMinimal = sideBarType === "minimal";
  const isFull = sideBarType === "full";
  return isFull || isMinimal ? (
    <aside
      className={`${isFull ? "w-[50px] lg:w-[250px]" : "w-[50px]"} mx-2 hidden transition-all duration-300 md:block`}
    >
      <div
        className={`${isMinimal ? "w-[50px] hover:w-[250px] hover:shadow-2xl" : "w-[50px] max-lg:hover:shadow-2xl max-lg:hover:w-[250px] lg:w-[250px]"} group scroll-bar-hidden fixed top-[98px] z-30 max-h-[calc(100dvh-126px)] overflow-y-auto rounded-base border border-gray-100 bg-white py-4 shadow-soft transition-all duration-300`}
      >
        <div className="min-w-[250px]">
          <VerticalTabs user={user} pathname={pathname} isMinimal={isMinimal} />
        </div>
      </div>
    </aside>
  ) : null;
}
