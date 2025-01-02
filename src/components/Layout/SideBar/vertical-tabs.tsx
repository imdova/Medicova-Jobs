"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  BusinessOutlined,
  DescriptionOutlined,
  HelpOutline,
  HomeOutlined,
  MessageOutlined,
  NotificationsActiveOutlined,
  Person,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLastSegment } from "@/util";

type NavItem = {
  icon?: React.ElementType;
  label?: string;
  path?: string;
  notifications?: number;
  section?: string; // Optional section header
  type?: "divider" | "text";
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
    path: "/job-seeker/settings",
  },
  {
    icon: HelpOutline,
    label: "Help Center",
    path: "#",
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

export default function VerticalTabs() {
  const pathname = usePathname(); // Get the current path
  const currentPage = pathname.split("/")[1];
  const activeTabIndex = navigationItems.findIndex(
    (link) => getLastSegment(link.path) === currentPage,
  );
  const [value, setValue] = useState(
    activeTabIndex > 0 ? activeTabIndex : null,
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
      {navigationItems.map((item, index) => {
        const IconComponent = item.icon;
        if (item.type === "divider") {
          return <Divider key={index} className="mt-2" />;
        } else if (item.type === "text") {
          return (
            <p key={index} className="p-4 text-sm uppercase text-secondary">
              {item.section}
            </p>
          );
        }
        return (
          <Tab
            key={index}
            // icon={<IconComponent />}
            // label={item.label}
            label={
              <div className="flex w-full flex-row items-center justify-between gap-2">
                <div className="flex flex-row items-center gap-2 text-left">
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
