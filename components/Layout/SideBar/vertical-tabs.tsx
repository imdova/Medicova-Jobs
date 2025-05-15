"use client";
import { Collapse, Divider } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";

import Avatar from "@/components/UI/Avatar";
import { NavItem } from "@/types";
import { getSideBarLinks } from "./LayoutRoutConfigs";
import useActiveTab from "@/hooks/useActiveTab";
import { User } from "next-auth";
// ====== TYPES ======
interface SideBarProps {
  user?: User;
  pathname: string;
  isMinimal?: boolean;
}

interface TabComponentProps {
  item: NavItem;
  isActive: boolean;
  isMinimal: boolean;
}

interface ProfileTabProps {
  user: User;
  pathname: string;
  activeTab: number | null;
  isMinimal: boolean;
}

interface CollapseTabProps {
  item: NavItem;
  index: number;
  activeTab: number | null;
  isCollapsed: number | null;
  setIsCollapsed: React.Dispatch<React.SetStateAction<number | null>>;
  isMinimal: boolean;
}

const SectionHeader = ({
  text,
  isMinimal,
}: {
  text?: string;
  isMinimal: boolean;
}) => (
  <div className="h-[45px]">
    <Divider />
    <p
      className={`${isMinimal ? "px-1 text-xs" : "px-1 text-xs xl:text-sm"} font-medium normal-case text-gray-600 xl:p-4`}
    >
      {text}
    </p>
  </div>
);

const LinkTab = ({ item, isActive, isMinimal }: TabComponentProps) => {
  const IconComponent = item.icon;
  const disabled = item.path === "#" || item.path === undefined;

  return (
    <Link
      aria-disabled={disabled}
      className={`aria-disabled: mx-2 flex h-[45px] min-h-[40px] flex-row justify-start rounded-[10px] p-2 transition-all duration-300 ease-in-out aria-disabled:pointer-events-none aria-disabled:opacity-40 ${
        isActive ? "bg-light-primary text-white opacity-100" : "text-secondary"
      } `}
      href={item.path || "#"}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-4 text-left normal-case">
          {IconComponent && <IconComponent className="mx-1 h-5 w-5" />}
          <span>{item.label}</span>
        </div>
        {item.notifications && (
          <div
            className={`aspect-square rounded-full p-1 px-2 text-xs ${
              isActive
                ? "bg-primary-foreground text-light-primary"
                : "bg-secondary text-primary-foreground"
            } `}
          >
            {item.notifications}
          </div>
        )}
      </div>
    </Link>
  );
};

const CollapseTab = ({
  item,
  isCollapsed,
  setIsCollapsed,
  activeTab,
  index,
  isMinimal,
}: CollapseTabProps) => {
  const isOpen = isCollapsed === item.id;
  const IconComponent = item.icon;

  return (
    <div>
      <div
        className={`mx-2 flex h-[45px] min-h-[40px] cursor-pointer flex-row justify-start rounded-[10px] p-2 text-secondary transition-all duration-300 ease-in-out`}
        onClick={() => setIsCollapsed(isOpen ? null : item.id)}
      >
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-4 text-left normal-case">
            {IconComponent && <IconComponent className="mx-1 h-5 w-5" />}
            <span>{item.label}</span>
          </div>
          <KeyboardArrowDown
            className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
          />
        </div>
      </div>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div
          className={`${isMinimal ? "group-hover:ml-10" : "max-xl:group-hover:ml-10 xl:ml-10"} transition-all duration-300`}
        >
          {item.links?.map((link, linkIndex) => {
            const isActive = isOpen
              ? activeTab === index + linkIndex + 1
              : false;
            return (
              <LinkTab
                key={link.id}
                item={link}
                isActive={isActive}
                isMinimal={isMinimal}
              />
            );
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
  isMinimal,
}: ProfileTabProps) => {
  const isEmployer = user.type === "employer";
  const userAvatar = isEmployer ? user.companyPhoto : user.photo;
  const displayName = isEmployer
    ? user.companyName
    : `${user.firstName} .${user.lastName?.[0]}`;
  const email = isEmployer ? user.companyEmail || user.email : user.email;

  const path = isEmployer
    ? `/co/${user?.companyUserName}`
    : `/me/${user.userName}`;
  const isActive =
    activeTab === 0 &&
    decodeURIComponent(pathname) === decodeURIComponent(path);

  return (
    <Link
      className={`${isMinimal ? "mx-0" : "xl:mx-2"} flex h-[45px] flex-row justify-start rounded-[10px] p-[5px] opacity-100 transition-all duration-300 ease-in-out ${isActive ? "bg-light-primary text-white" : "text-gray-800/60"} `}
      href={path}
    >
      <div className="flex items-center gap-1">
        <Avatar src={userAvatar!} alt={`${displayName} photo`} size={40} />
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
// TODO : add hover effect
// ====== MAIN COMPONENT ======
export default function VerticalTabs({
  user: initialUser,
  pathname,
  isMinimal = false,
}: SideBarProps) {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const user = sessionUser || initialUser;
  const links = getSideBarLinks(user, pathname);
  const { activeTab, isCollapsed, setIsCollapsed } = useActiveTab(
    links,
    pathname,
  );

  // Calculate position of the active indicator
  const indicatorPosition = activeTab ? activeTab * 45 + 7.5 : 7.5;

  return (
    <div className="relative overflow-hidden">
      {/* Active indicator */}
      <div
        style={{ top: `${indicatorPosition}px` }}
        className="indicator absolute left-0 h-[30px] w-1 rounded-full bg-light-primary transition-all duration-700 ease-in-out"
      ></div>

      {/* Render navigation items */}
      {links.map((item, index) => {
        // Calculate additional offset for collapsed items
        const collapsedLinkIndex = links.findIndex(
          (link) => link.id === isCollapsed,
        );
        const collapsedLink = links.find((link) => link.id === isCollapsed);
        const additionalItems = isCollapsed
          ? index > collapsedLinkIndex
            ? collapsedLink?.links?.length || 0
            : 0
          : 0;

        // Render appropriate component based on item type
        switch (item.type) {
          case "profile":
            return user ? (
              <ProfileTab
                key={item.id}
                user={user}
                pathname={pathname}
                activeTab={activeTab}
                isMinimal={isMinimal}
              />
            ) : null;

          case "text":
            return (
              <SectionHeader
                key={item.id}
                text={item.section}
                isMinimal={isMinimal}
              />
            );

          case "collapse":
            return (
              <CollapseTab
                key={item.id}
                item={item}
                index={index}
                activeTab={activeTab}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMinimal={isMinimal}
              />
            );

          default:
            return (
              <LinkTab
                key={item.id}
                item={item}
                isActive={activeTab === index + additionalItems}
                isMinimal={isMinimal}
              />
            );
        }
      })}
    </div>
  );
}
