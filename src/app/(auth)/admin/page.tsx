"use client";
import DashboardOverView from "./components/employers/Ovarview";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { LayoutDashboard, Settings, Users } from "lucide-react";
import EmployerListPanel from "./components/employers/EmployerList";

type Tab = "over-view" | "employer-list" | "setting";

const tabs: { key: Tab; title: string; icon?: React.ReactNode }[] = [
  {
    key: "over-view",
    title: "Over View",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    key: "employer-list",
    title: "Employer List",
    icon: <Users className="h-5 w-5" />,
  },
  {
    key: "setting",
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];
const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="w-full px-4 md:px-5 space-y-3">
      <div className="flex flex-col items-center justify-between overflow-hidden rounded-base border border-gray-200 shadow-soft sm:flex-row md:items-center">
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
      {activeTab === "over-view" && <DashboardOverView />}
      {activeTab === "employer-list" && <EmployerListPanel />}
    </div>
  );
};

export default AdminPage;
