"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Divider } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { isCurrentPage } from "@/util";
import { BaseHeaderProps } from "@/types";
import { getSideBarLinks } from "./LayoutRoutConfigs";

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

export default function DynamicSideBar({ user, pathname }: BaseHeaderProps) {
  const role = user?.role;
  const links = getSideBarLinks(role, pathname);
  const activeTabIndex = links.findIndex((link) => {
    return link.path && isCurrentPage(pathname, link.path);
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
