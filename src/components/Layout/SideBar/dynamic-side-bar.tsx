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
      className={`${isFull ? "w-[50px] min-w-[50px] xl:w-[250px]" : "w-[50px] min-w-[50px]"} ml-5 group/sideBard hidden transition-all duration-300 md:block`}
    >
      <div
        className={`${isMinimal ? "w-[50px] hover:w-[250px] hover:shadow-2xl" : "w-[50px] max-xl:hover:w-[250px] max-xl:hover:shadow-2xl xl:w-[250px]"} scroll-bar-hidden group fixed top-[98px] z-30 max-h-[calc(100dvh-126px)] min-h-[calc(100dvh-126px)] overflow-y-auto overflow-x-hidden rounded-base border border-gray-200 bg-white py-4 shadow-soft transition-all duration-300`}
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
