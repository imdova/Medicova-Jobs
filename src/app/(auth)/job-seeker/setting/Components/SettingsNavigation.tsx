"use client";
import { Option } from "@/types";
import { isCurrentPage } from "@/util";
import { Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const tabs: Option[] = [
  { label: "Profile", value: "/job-seeker/setting" },
  { label: "Career preference", value: "/job-seeker/setting/preferences" },
  { label: "Login Details", value: "/job-seeker/setting/details" },
  { label: "Notifications", value: "/job-seeker/setting/notifications" },
];

const SettingsNavTabs = () => {
  const pathname = usePathname();
  const activeTab =
    tabs.find((tab) => isCurrentPage(pathname, tab.value)) || tabs[0];

  return (
    <div className="rounded-base border border-gray-200 bg-white overflow-hidden shadow-soft">
      <Tabs value={activeTab.value} variant="scrollable" scrollButtons={false}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            value={tab.value}
            LinkComponent={Link}
            href={tab.value}
            className=" font-semibold normal-case"
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
          className=" font-semibold normal-case"
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
