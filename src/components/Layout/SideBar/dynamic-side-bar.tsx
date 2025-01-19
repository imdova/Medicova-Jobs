"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isCurrentPage } from "@/util";
import { NavItem, UserState } from "@/types";
import { getSideBarLinks } from "./LayoutRoutConfigs";
import { KeyboardArrowDown } from "@mui/icons-material";
import Image from "next/image";

export interface SideBarProps {
  user?: UserState;
  status: "authenticated" | "loading" | "unauthenticated";
  pathname: string;
}

export default function DynamicSideBar({
  user,
  status,
  pathname,
}: SideBarProps) {
  const userType = user?.type;
  const initialLinks = getSideBarLinks(userType, pathname);
  const [links, setLinks] = useState<NavItem[]>(initialLinks);

  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    if (links.length === 0 && initialLinks.length > 0) {
      setLinks(initialLinks);
      const activeTabIndex = initialLinks.findIndex((link) =>
        link.path ? isCurrentPage(pathname, link.path) : false,
      );
      setActiveTab(activeTabIndex >= 0 ? activeTabIndex : null);
    }
    if (links.length > 0) {
      const activeTabIndex = links.findIndex((link) =>
        link.path ? isCurrentPage(pathname, link.path) : false,
      );
      setActiveTab(activeTabIndex >= 0 ? activeTabIndex : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLinks, pathname]);

  return (
    <Tabs
      orientation="vertical"
      value={activeTab ?? false}
      onChange={handleTabChange}
      aria-label="Sidebar navigation tabs"
      role="navigation"
      TabIndicatorProps={
        activeTab !== null
          ? {
              sx: {
                backgroundColor: "var(--light-primary)", // Set the color of the indicator
                left: 0, // Move the indicator to the left
                width: 4, // Adjust the thickness of the indicator
                maxHeight: "30px", // Center the indicator vertically relative to the tab height
                borderRadius: 5, // Optional: Add rounded corners
                transform: "translateY(10px)", // Center the indicator vertically relative to its smaller height
              },
            }
          : { style: { display: "none" } }
      }
    >
      {links.map((item, index) => {
        if (item.type === "profile" && user) {
          return (
            <ProfileTab
              key={item.id}
              user={user}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          );
        }
        if (item.type === "divider")
          return <Divider key={item.id} className="mt-2" />;
        if (item.type === "text")
          return (
            <p key={item.id} className="p-4 text-sm normal-case text-gray-800">
              {item.section}
            </p>
          );
        if (item.type === "collapse") {
          return (
            <CollapseTab
              key={item.id}
              item={item}
              index={index}
              activeTab={activeTab}
              setLinks={setLinks}
            />
          );
        }
        return (
          <LinkTab
            key={item.id}
            item={item}
            index={index}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        );
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
}: {
  item: NavItem;
  index: number;
  activeTab: number | null;
  setLinks: React.Dispatch<React.SetStateAction<NavItem[]>>;
}) => {
  const isActive = activeTab === index;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const IconComponent = item.icon;

  // Toggle the collapse state when the tab is clicked
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setLinks((e) => removeItems(e, index + 1, item.links?.length || 0));
    } else {
      setLinks((e) => insertItemsAfterIndex(e, item.links || [], index));
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
  activeTab,
  onTabChange,
}: {
  user: UserState;
  activeTab: number | null;
  onTabChange: (index: number) => void;
}) => {
  const isActive = activeTab === 0;
  return (
    <Tab
      className={`transition-color mx-4 my-1 flex flex-row justify-start rounded-[10px] p-[5px] duration-300 ease-in-out ${isActive ? "bg-light-primary text-white opacity-100" : "text-gray-800"}`}
      id={`vertical-tab-0`}
      aria-controls={`vertical-tabpanel-0`}
      value={0}
      onClick={() => onTabChange(0)}
      component={Link}
      href={user.firstName ? `/me/${user.firstName}` : "#"}
      label={
        <div className="flex items-center gap-1">
          <Image
            src={user?.photo || "/images/placeholder-avatar.svg"}
            alt={user.firstName + "photo"}
            width={40}
            height={40}
            className={`${isActive ? "border-white" : "border-gray-300"} object-cover" rounded-full border-2 bg-white`}
          />
          <div>
            <h6 className="text-left text-sm normal-case">
              {user.firstName + " ." + user.lastName?.[0]}
            </h6>
            <p className="max-w-full text-left text-xs normal-case">
              {user.email}
            </p>
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
