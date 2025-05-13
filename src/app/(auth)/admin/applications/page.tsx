"use client";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { LayoutDashboard, LayoutList, Settings } from "lucide-react";
import SettingPage from "./panels/setting";
import ApplicationList from "./panels/ApplicationList";
import OverviewApplications from "./panels/OverviewApplications";

type Tab = "over-view" | "application-list" | "setting";

const tabs: { key: Tab; title: string; icon?: React.ReactNode }[] = [
  {
    key: "over-view",
    title: "Over View",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    key: "application-list",
    title: "Application List",
    icon: <LayoutList className="h-5 w-5" />,
  },
  {
    key: "setting",
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const ApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="space-y-3 px-4">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
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
      </div>
      {activeTab === "over-view" && <OverviewApplications />}
      {activeTab === "application-list" && <ApplicationList />}
      {activeTab === "setting" && <SettingPage />}
    </div>
  );
};

export default ApplicationsPage;
