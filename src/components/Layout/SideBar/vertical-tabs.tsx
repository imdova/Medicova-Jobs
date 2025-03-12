"use client";
import { Collapse, Divider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { isCurrentPage } from "@/util";
import { NavItem, UserState } from "@/types";
import { getSideBarLinks } from "./LayoutRoutConfigs";
import { KeyboardArrowDown } from "@mui/icons-material";
import Avatar from "@/components/UI/Avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface SideBarProps {
  user?: UserState;
  pathname: string;
}

const findActiveLinkIndex = (
  links: NavItem[],
  pathname: string,
  isCollapsed: number | null,
): { activeIndex: number; parentId: number | null } => {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    // Check if the current link is active
    const path = link.path || link.pattern;
    if (path && isCurrentPage(pathname, path)) {
      const collapsedLinkIndex = links.findIndex(
        (link) => link.id === isCollapsed,
      );
      const collapsedLink = links.find((link) => link.id === isCollapsed);
      const additionalItems = isCollapsed
        ? i > collapsedLinkIndex
          ? collapsedLink?.links?.length || 0
          : 0
        : 0;
      return { activeIndex: i + additionalItems, parentId: null };
    }

    // If the link has sublinks, recursively check them
    if (link.links && link.links.length > 0) {
      const subLinkResult = findActiveLinkIndex(
        link.links,
        pathname,
        isCollapsed,
      );
      if (subLinkResult.activeIndex !== -1) {
        const collapsedLinkIndex = links.findIndex(
          (link) => link.id === isCollapsed,
        );
        const collapsedLink = links.find((link) => link.id === isCollapsed);

        const additionalItems =
          isCollapsed === link.id
            ? subLinkResult.activeIndex + 1
            : i > collapsedLinkIndex
              ? collapsedLink?.links?.length || 0
              : 0;
        return {
          activeIndex: i + additionalItems,
          parentId: link.id,
        };
      }
    }
  }

  // If no active link is found, return -1
  return { activeIndex: -1, parentId: null };
};


const useActiveTab = (links: NavItem[], pathname: string) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<number | null>(null);

  // Define updateActiveTab as a stable function
  const updateActiveTab = useCallback(
    (currentLinks: NavItem[]) => {
      const { activeIndex, parentId } = findActiveLinkIndex(
        currentLinks,
        pathname,
        isCollapsed,
      );
      // !isCollapsed && setIsCollapsed(parentId);
      setActiveTab(activeIndex);
    },
    [pathname, isCollapsed],
  );

  // Run updateActiveTab when links or pathname change
  useEffect(() => {
    if (links.length > 0) {
      updateActiveTab(links);
    }
  }, [links, pathname, updateActiveTab]);

  return { activeTab, setActiveTab, isCollapsed, setIsCollapsed };
};

export default function VerticalTabs({
  user: initialUser,
  pathname,
}: SideBarProps) {
  const { data: session } = useSession();
  const sessionUser = session?.user as UserState;
  const user = sessionUser || initialUser;
  const links = getSideBarLinks(user, pathname);
  const { activeTab, setActiveTab, isCollapsed, setIsCollapsed } = useActiveTab(
    links,
    pathname,
  );

  return (
    <div className="relative overflow-hidden">
      <div
        style={{
          top: `${activeTab ? activeTab * 45 + 7.5 : 7.5}px`,
        }}
        className="indicator absolute left-0 h-[30px] w-1 rounded-full bg-light-primary transition-all duration-700 ease-in-out"
      ></div>

      {links.map((item, index) => {
        const collapsedLinkIndex = links.findIndex(
          (link) => link.id === isCollapsed,
        );
        const collapsedLink = links.find((link) => link.id === isCollapsed);
        const additionalItems = isCollapsed
          ? index > collapsedLinkIndex
            ? collapsedLink?.links?.length || 0
            : 0
          : 0;
        switch (item.type) {
          case "profile":
            return user ? (
              <ProfileTab
                key={item.id}
                user={user}
                pathname={pathname}
                activeTab={activeTab}
              />
            ) : null;
          case "text":
            return <SectionHeader key={item.id} text={item.section} />;
          case "collapse":
            return (
              <CollapseTab
                key={item.id}
                item={item}
                index={index}
                activeTab={activeTab}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            );
          default:
            return (
              <LinkTab
                key={item.id}
                item={item}
                isActive={activeTab === index + additionalItems}
              />
            );
        }
      })}
    </div>
  );
}

const SectionHeader = ({ text }: { text?: string }) => (
  <div className="h-[45px]">
    <Divider />
    <p className="p-4 text-sm font-medium normal-case text-gray-600">{text}</p>
  </div>
);

// Type definition for navigation items

const CollapseTab = ({
  item,
  isCollapsed,
  setIsCollapsed,
  activeTab,
  index,
}: {
  item: NavItem;
  index: number;
  activeTab: number | null;
  isCollapsed: number | null;
  setIsCollapsed: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const isOpen = isCollapsed === item.id;
  const IconComponent = item.icon;

  return (
    <div>
      <div
        className="transition-color mx-4 flex h-[45px] min-h-[40px] cursor-pointer flex-row justify-start rounded-[10px] p-2 text-secondary duration-300 ease-in-out"
        onClick={() => setIsCollapsed(isOpen ? null : item.id)}
      >
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2 text-left normal-case">
            {IconComponent && <IconComponent />} <span>{item.label}</span>
          </div>
          <KeyboardArrowDown
            className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
          />
        </div>
      </div>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="ml-10">
          {item.links?.map((link, linkIndex) => {
            const isActive = isOpen
              ? activeTab === index + linkIndex + 1
              : false;
            return <LinkTab key={link.id} item={link} isActive={isActive} />;
          })}
        </div>
      </Collapse>
    </div>
  );
};
const ProfileTab = ({
  user,
  pathname,
  activeTab,
}: {
  user: UserState;
  pathname: string;
  activeTab: number | null;
}) => {
  const isEmployer = user.type === "employer";
  const userAvatar = isEmployer ? user.companyPhoto : user.photo;
  const displayName = isEmployer
    ? user.companyName
    : user.firstName + " ." + user.lastName?.[0];
  const email = isEmployer ? user.companyEmail || user.email : user.email;

  const path = isEmployer
    ? `/co/${user?.companyUserName}`
    : `/me/${user.userName}`;
  const isActive =
    activeTab === 0 && decodeURIComponent(pathname) == decodeURIComponent(path);

  return (
    <Link
      className={`${isActive ? "bg-light-primary text-white" : "text-gray-800/60"} transition-color mx-4 flex h-[45px] flex-row justify-start rounded-[10px] p-[5px] opacity-100 duration-300 ease-in-out`}
      href={path}
    >
      <div className="flex items-center gap-1">
        <Avatar src={userAvatar!} alt={displayName + "photo"} size={40} />
        <div>
          <h6 className="text-left text-sm normal-case">{displayName}</h6>
          <p className="line-clamp-1 max-w-full break-all text-left text-xs normal-case">
            {email}
          </p>
        </div>
      </div>
    </Link>
  );
};

const LinkTab = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const IconComponent = item.icon;
  return (
    <Link
      className={`${isActive ? "bg-light-primary text-white opacity-100" : "text-secondary"} transition-color mx-4 flex h-[45px] min-h-[40px] flex-row justify-start rounded-[10px] p-2 duration-300 ease-in-out`}
      href={item.path || "#"}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2 text-left normal-case">
          {IconComponent && <IconComponent />} <span>{item.label}</span>
        </div>
        {item.notifications && (
          <div
            className={`${
              isActive
                ? "bg-primary-foreground text-light-primary"
                : "bg-secondary text-primary-foreground"
            } aspect-square rounded-full p-1 px-2 text-xs`}
          >
            {item.notifications}
          </div>
        )}
      </div>
    </Link>
  );
};
