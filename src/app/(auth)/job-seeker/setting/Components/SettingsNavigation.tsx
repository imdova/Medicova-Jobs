"use client";
import { Option } from "@/types";
import { isCurrentPage } from "@/util";
import { Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const tabs: Option[] = [
  { label: "Login Details", value: "/job-seeker/setting" },
  { label: "Notifications", value: "/job-seeker/setting/notifications" },
];

const SettingsNavTabs = () => {
  const pathname = usePathname();
  const activeTab =
    tabs.find((tab) => isCurrentPage(pathname, tab.value)) || tabs[0];

  return (
    <div className="body-container overflow-hidden rounded-base border border-gray-200 bg-white shadow-soft">
      <Tabs value={activeTab.value} variant="scrollable" scrollButtons={false}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            value={tab.value}
            LinkComponent={Link}
            href={tab.value}
            className="font-semibold normal-case"
          />
        ))}
      </Tabs>
    </div>
  );
};
const SettingsNavTabsSkeleton = () => {
  return (
    <Tabs variant="scrollable" scrollButtons={false}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          value={tab.value}
          className="font-semibold normal-case"
        />
      ))}
    </Tabs>
  );
};
const SettingsNavigation = () => {
  return (
    <Suspense fallback={<SettingsNavTabsSkeleton />}>
      <SettingsNavTabs />
    </Suspense>
  );
};

export default SettingsNavigation;
