"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  BusinessOutlined,
  DescriptionOutlined,
  FolderOutlined,
  HelpOutline,
  HomeOutlined,
  InfoOutlined,
  MessageOutlined,
  NotificationsActiveOutlined,
  PaidOutlined,
  Person,
  PostAddOutlined,
  Search,
  SettingsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLastSegment } from "@/util";

type SideBarType = "employer" | "job-seeker";

interface VerticalTabsProps {
  sideBardType?: SideBarType;
}
type NavItem = {
  icon?: React.ElementType;
  label?: string;
  path?: string;
  notifications?: number;
  section?: string; // Optional section header
  type?: "divider" | "text" | "collapse";
  links?: NavItem[];
};

const navigationItems: NavItem[] = [
  {
    icon: HomeOutlined,
    label: "Home",
    path: "/",
  },
  {
    icon: Person,
    label: "My Profile",
    path: "/me/1",
  },
  {
    icon: InfoOutlined,
    label: "My Personal Information",
    path: "/job-seeker/general-info",
  },
  {
    icon: MessageOutlined,
    label: "Messages",
    path: "/chat",
    notifications: 3,
  },
  {
    icon: DescriptionOutlined,
    label: "My Applications",
    path: "/job-seeker/my-applications",
  },
  {
    icon: Search,
    label: "Find Jobs",
    path: "/search",
  },
  {
    icon: BusinessOutlined,
    label: "Browse Companies",
    path: "/job-seeker/browse-companies",
  },

  {
    icon: NotificationsActiveOutlined,
    label: "Notifications",
    path: "/notifications",
    notifications: 4,
  },
  {
    type: "divider",
  },
  {
    section: "Settings",
    type: "text",
  },
  {
    icon: SettingsOutlined,
    label: "Settings",
    path: "/job-seeker/setting",
  },
  {
    icon: HelpOutline,
    label: "Help Center",
    path: "#",
  },
];

export const employerSideBarLinks: NavItem[] = [
  {
    label: "Dashboard",
    icon: HomeOutlined,
    path: "/employer/dashboard",
  },
  {
    label: "Profile",
    icon: Person,
    path: "/me/1",
  },
  {
    label: "Company Info",
    icon: BusinessOutlined,
    path: "/employer/company-info",
  },
  {
    label: "Manage Jobs",
    icon: WorkOutline,
    path: "/employer/job/manage-jobs",
  },
  {
    label: "Post New Job",
    icon: PostAddOutlined,
    path: "/employer/job/posted",
  },
  {
    label: "Applicants",
    icon: WorkOutline,
    path: "/employer/job/applicants",
  },
  {
    label: "Search",
    icon: Search,
    path: "/employer/search",
    links: [
      {
        label: "Saved Searches",
        path: "/employer/search/saved-search",
      },
    ],
  },
  {
    label: "My Folders",
    icon: FolderOutlined,
    path: "/employer/search/saved-search",
  },
  {
    label: "Billing & Subscription",
    icon: PaidOutlined,
    path: "/employer/subscription-plans",
  },
  {
    label: "Report",
    icon: DescriptionOutlined,
  },
  {
    label: "Chat",
    icon: MessageOutlined,
    path: "/chat",
  },
  {
    type: "divider",
  },
  {
    type: "text",
    section: "Settings",
  },
  {
    label: "Settings",
    icon: SettingsOutlined,
    path: "/employer/setting",
  },
  {
    label: "Help Center",
    icon: HelpOutline,
  },
];
function a11yProps(index: number) {
  return {
    className:
      "duration-300 transition-color ease-in-out mx-4 rounded-[10px] h-[45px] min-h-[40px] flex flex-row justify-start text-secondary my-1",
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    sx: {
      "&.Mui-selected": {
        backgroundColor: "var(--light-primary)", // Add hover effect
        color: "white",
      },
    },
  };
}

export default function VerticalTabs({ sideBardType }: VerticalTabsProps) {
  const links =
    sideBardType === "employer" ? employerSideBarLinks : navigationItems;
  const pathname = usePathname(); // Get the current path
  let currentPage = pathname.split("/").pop();
  currentPage = pathname.includes("me") ? "me" : currentPage;
  const activeTabIndex = links.findIndex((link) => {
    return getLastSegment(link.path) == currentPage;
  });
  const [value, setValue] = useState(
    activeTabIndex >= 0 ? activeTabIndex : null,
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      orientation="vertical"
      value={value}
      onChange={handleChange}
      aria-label="nav tabs example"
      role="navigation"
      TabIndicatorProps={{
        sx: {
          backgroundColor: "var(--light-primary)", // Set the color of the indicator
          left: 0, // Move the indicator to the left
          width: 4, // Adjust the thickness of the indicator
          maxHeight: "30px", // Center the indicator vertically relative to the tab height
          borderRadius: 5, // Optional: Add rounded corners
          transform: "translateY(10px)", // Center the indicator vertically relative to its smaller height
        },
      }}
    >
      {links.map((item, index) => {
        const IconComponent = item.icon;
        if (item.type === "divider") {
          return <Divider key={index} className="mt-2" />;
        } else if (item.type === "text") {
          return (
            <p key={index} className="p-4 text-sm normal-case text-secondary">
              {item.section}
            </p>
          );
        } else if (item.type === "collapse") {
          return (
            <Tab
              key={index}
              // icon={<IconComponent />}
              // label={item.label}
              label={
                <div className="flex w-full flex-row items-center justify-between gap-2">
                  <div className="flex flex-row items-center gap-2 text-left normal-case">
                    {IconComponent && <IconComponent />}{" "}
                    <span>{item.label}</span>
                  </div>
                  {item.notifications && (
                    <div
                      className={`${value === index ? "bg-primary-foreground text-light-primary" : "bg-secondary text-primary-foreground"} aspect-square rounded-full p-1 px-2 text-xs`}
                    >
                      {item.notifications}
                    </div>
                  )}
                </div>
              }
              // iconPosition="start"
              {...a11yProps(index)}
            />
          );
        }
        return (
          <Tab
            key={index}
            // icon={<IconComponent />}
            // label={item.label}
            label={
              <div className="flex w-full flex-row items-center justify-between gap-2">
                <div className="flex flex-row items-center gap-2 text-left normal-case">
                  {IconComponent && <IconComponent />} <span>{item.label}</span>
                </div>
                {item.notifications && (
                  <div
                    className={`${value === index ? "bg-primary-foreground text-light-primary" : "bg-secondary text-primary-foreground"} aspect-square rounded-full p-1 px-2 text-xs`}
                  >
                    {item.notifications}
                  </div>
                )}
              </div>
            }
            // iconPosition="start"
            component={Link}
            href={item.path || "#"}
            {...a11yProps(index)}
          />
        );
      })}
    </Tabs>
  );
}
