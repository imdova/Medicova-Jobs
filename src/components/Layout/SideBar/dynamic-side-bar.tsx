"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Divider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { isCurrentPage } from "@/util";
import { NavItem, UserState } from "@/types";
import { getSideBarLinks } from "./LayoutRoutConfigs";
import { KeyboardArrowDown } from "@mui/icons-material";
import Image from "next/image";

interface SideBarProps {
  user?: UserState;
  pathname: string;
}

const useActiveTab = (links: NavItem[], pathname: string) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  // Define updateActiveTab as a stable function
  const updateActiveTab = useCallback(
    (currentLinks: NavItem[]) => {
      const activeTabIndex = currentLinks.findIndex((link) => {
        const path = link.path || link.pattern;
        return path ? isCurrentPage(pathname, path) : false;
      });
      setActiveTab(activeTabIndex >= 0 ? activeTabIndex : null);
    },
    [pathname],
  );

  // Run updateActiveTab when links or pathname change
  useEffect(() => {
    if (links.length > 0) {
      updateActiveTab(links);
    }
  }, [links, pathname, updateActiveTab]);

  return { activeTab, setActiveTab, updateActiveTab };
};

export default function DynamicSideBar({
  user,
  pathname,
}: SideBarProps) {
  const initialLinks = getSideBarLinks(user, pathname);
  const [links, setLinks] = useState<NavItem[]>(initialLinks);
  const { activeTab, setActiveTab, updateActiveTab } = useActiveTab(
    links,
    pathname,
  );

  const handleTabChange = (_event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    if (links.length === 0 && initialLinks.length > 0) {
      setLinks(initialLinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLinks]);

  return (
    <Tabs
      orientation="vertical"
      value={activeTab ?? false}
      onChange={handleTabChange}
      aria-label="Sidebar navigation tabs"
      role="navigation"
      TabIndicatorProps={{
        sx:
          activeTab !== null
            ? {
              backgroundColor: "var(--light-primary)",
              left: 0,
              width: 4,
              maxHeight: "30px",
              borderRadius: 5,
              transform: "translateY(10px)",
            }
            : { display: "none" },
      }}
    >
      {links.map((item, index) => {
        switch (item.type) {
          case "profile":
            return user ? (
              <ProfileTab
                key={item.id}
                user={user}
                pathname={pathname}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            ) : null;
          case "divider":
            return <Divider key={item.id} className="mt-2" />;
          case "text":
            return (
              <p
                key={item.id}
                className="p-4 text-sm normal-case text-gray-800"
              >
                {item.section}
              </p>
            );
          case "collapse":
            return (
              <CollapseTab
                key={item.id}
                item={item}
                index={index}
                links={links}
                setLinks={setLinks}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                updateActiveTab={updateActiveTab}
              />
            );
          default:
            return (
              <LinkTab
                key={item.id}
                item={item}
                index={index}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            );
        }
      })}
    </Tabs>
  );
}

// Type definition for navigation items

const CollapseTab = ({
  item,
  index,
  activeTab,
  setLinks,
  links,
  updateActiveTab,
  setActiveTab,
}: {
  item: NavItem;
  index: number;
  activeTab: number | null;
  links: NavItem[];
  setLinks: React.Dispatch<React.SetStateAction<NavItem[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
  updateActiveTab: (links: NavItem[]) => void;
}) => {
  const isActive = activeTab === index;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const IconComponent = item.icon;

  // Toggle the collapse state when the tab is clicked
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setLinks((e) => removeItems(e, index + 1, item.links?.length || 0));
      setActiveTab(null);
    } else {
      const newLinks = insertItemsAfterIndex(links, item.links || [], index);
      setLinks(newLinks);
      updateActiveTab(newLinks);
    }
  };
  // import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
  return (
    <Tab
      className={`transition-color mx-4 my-1 flex h-[45px] min-h-[40px] flex-row justify-start rounded-[10px] duration-300 ease-in-out ${isActive ? "bg-light-primary text-white opacity-100" : "text-gray-800"}`}
      id={`vertical-tab-${index}`}
      aria-controls={`vertical-tabpanel-${index}`}
      value={index}
      onClick={toggleCollapse}
      label={
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2 text-left normal-case">
            {IconComponent && <IconComponent />} <span>{item.label}</span>
          </div>
          <KeyboardArrowDown
            className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
          />
        </div>
      }
    />
  );
};
const ProfileTab = ({
  user,
  pathname,
  activeTab,
  onTabChange,
}: {
  user: UserState;
  pathname: string;
  activeTab: number | null;
  onTabChange: (index: number) => void;
}) => {
  const isEmployer = user.type === "employer";
  const path = isEmployer ? `/co/${user?.companyUserName}` : `/me/${user.userName}`;
  const isActive =
    activeTab === 0 && decodeURIComponent(pathname) == decodeURIComponent(path);

  return (
    <Tab
      className={`transition-color mx-4 my-1 flex opacity-100 flex-row justify-start rounded-[10px] p-[5px] duration-300 ease-in-out ${isActive ? "bg-light-primary text-white " : "text-gray-800/60"}`}
      id={`vertical-tab-0`}
      aria-controls={`vertical-tabpanel-0`}
      value={0}
      onClick={() => onTabChange(0)}
      component={Link}
      href={
        isEmployer
          ? `/co/${user?.companyUserName}`
          : user.userName
            ? `/me/${user.userName}`
            : "#"
      }
      label={
        <div className="flex items-center gap-1">
          <Image
            src={
              user.companyPhoto ||
              user?.photo ||
              "/images/placeholder-avatar.svg"
            }
            alt={(user?.companyName || user.firstName) + "photo"}
            width={40}
            height={40}
            className={`${isActive ? "border-white" : "border-gray-300"} aspect-square h-full max-h-[40px] w-full max-w-[40px] rounded-full border-2 bg-white object-cover`}
          />
          <div >
            <h6 className="text-left text-sm normal-case">
              {user?.companyName || user.firstName + " ." + user.lastName?.[0]}
            </h6>
            {!isEmployer && (
              <p className="line-clamp-1 max-w-full break-all text-left text-xs normal-case">
                {user.email}
              </p>
            )}
          </div>
        </div>
      }
    />
  );
};

const LinkTab = ({
  item,
  index,
  activeTab,
  onTabChange,
}: {
  item: NavItem;
  activeTab: number | null;
  index: number;
  onTabChange: (index: number) => void;
}) => {
  const isActive = activeTab === index;
  const isSub = item.type === "supLink";
  const IconComponent = item.icon;
  return (
    <Tab
      className={`transition-color mx-4 my-1 ${isSub ? "ml-10" : ""} flex h-[45px] min-h-[40px] flex-row justify-start rounded-[10px] duration-300 ease-in-out ${isActive ? "bg-light-primary text-white opacity-100" : "text-gray-800"}`}
      id={`vertical-tab-${index}`}
      aria-controls={`vertical-tabpanel-${index}`}
      value={index}
      onClick={() => onTabChange(index)}
      component={Link}
      href={item.path || "#"}
      label={
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2 text-left normal-case">
            {IconComponent && <IconComponent />} <span>{item.label}</span>
          </div>
          {item.notifications && (
            <div
              className={`${isActive
                ? "bg-primary-foreground text-light-primary"
                : "bg-secondary text-primary-foreground"
                } aspect-square rounded-full p-1 px-2 text-xs`}
            >
              {item.notifications}
            </div>
          )}
        </div>
      }
    />
  );
};

function insertItemsAfterIndex<T>(array: T[], items: T[], index: number): T[] {
  if (index < -1 || index >= array.length) {
    throw new Error("Index out of bounds");
  }
  // Return a new array with the items inserted
  return [...array.slice(0, index + 1), ...items, ...array.slice(index + 1)];
}

function removeItems<T>(array: T[], startIndex: number, count: number): T[] {
  if (startIndex < 0 || startIndex >= array.length) {
    throw new Error("Start index out of bounds");
  }
  if (count < 0) {
    throw new Error("Count cannot be negative");
  }

  // Remove items by slicing around the specified range
  return [...array.slice(0, startIndex), ...array.slice(startIndex + count)];
}
