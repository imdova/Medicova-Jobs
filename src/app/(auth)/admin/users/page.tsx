"use client";
import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import OverviewUsers from "./OverviewUsers";
import UserList from "./UserList";
import { LayoutDashboard, Settings, Users } from "lucide-react";
import { Add } from "@mui/icons-material";

type Tab = "over-view" | "users-list" | "setting";

const tabs: { key: Tab; title: string; icon?: React.ReactNode }[] = [
  {
    key: "over-view",
    title: "Over View",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    key: "users-list",
    title: "Users List",
    icon: <Users className="h-5 w-5" />,
  },
  {
    key: "setting",
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const UsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="w-full space-y-3 px-4 md:px-5">
      <div className="flex w-full gap-3">
        <div className="flex flex-1 flex-col items-center justify-between overflow-hidden rounded-base border border-gray-200 shadow-soft sm:flex-row md:items-center">
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="responsive tabs example"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                value={tab.key}
                label={
                  <span className="flex items-center gap-2 text-sm">
                    {tab.icon}
                    {tab.title}
                  </span>
                }
              />
            ))}
          </Tabs>
        </div>
        <Button variant="contained" startIcon={<Add className="h-5 w-5" />}>
          <span className="text-nowrap text-sm">Add User</span>
        </Button>
      </div>

      {activeTab === "over-view" && <OverviewUsers />}
      {/* {activeTab === "users-list" && <UserList />} */}
    </div>
  );
};

export default UsersPage;
