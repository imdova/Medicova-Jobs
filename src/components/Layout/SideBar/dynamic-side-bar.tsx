"use client";
import { matchRoute } from "./LayoutRoutConfigs";
import { usePathname } from "next/navigation";
import VerticalTabs from "./vertical-tabs";
import { User } from "next-auth";

export default function DynamicSideBar({ user }: { user?: User }) {
  const pathname = usePathname() || "/";
  const sideBarType = matchRoute(pathname)?.sideBarType || "";

  // TODO : add side bar for mobile
  const isMinimal = sideBarType === "minimal";
  const isFull = sideBarType === "full";
  return isFull || isMinimal ? (
    <aside
      className={`${isFull ? "w-[50px] min-w-[50px] lg:w-[250px]" : "min-w-[50px] w-[50px]"} group/sideBard mx-2 hidden transition-all duration-300 md:block`}
    >
      <div
        className={`${isMinimal ? "w-[50px] hover:w-[250px] hover:shadow-2xl" : "w-[50px] max-lg:hover:w-[250px] max-lg:hover:shadow-2xl lg:w-[250px]"} scroll-bar-hidden group fixed top-[98px] z-30 max-h-[calc(100dvh-126px)] overflow-y-auto rounded-base border border-gray-100 min-h-[calc(100dvh-126px)] bg-white py-4 shadow-soft transition-all duration-300`}
      >
        <div className="min-w-[250px]">
          <VerticalTabs user={user} pathname={pathname} isMinimal={isMinimal} />
        </div>
      </div>
      {/* <div
        aria-hidden="true"
        className={`${isMinimal ? "group-hover/sideBard:opacity-100 opacity-0" : "opacity-0"} pointer-events-none fixed inset-0 z-[29] h-dvh w-screen bg-black/30 backdrop-blur-sm duration-300 `}
      ></div> */}
    </aside>
  ) : null;
}
