"use client";
import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { LayoutDashboard, Settings, Users } from "lucide-react";
import { Add } from "@mui/icons-material";
import DashboardOverView from "../components/employers/Overview";
import EmployerListPanel from "../components/employers/EmployerList";
import AddNewEmployer from "../components/employers/add-employer";

type Tab = "over-view" | "employer-list" | "setting";

const tabs: { key: Tab; title: string; icon?: React.ReactNode }[] = [
  {
    key: "over-view",
    title: "Over View",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    key: "employer-list",
    title: "Employer List",
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: "setting",
    title: "Settings",
    icon: <Settings className="h-4 w-4" />,
  },
];
const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full space-y-3 px-4 md:px-5">
      <div className="flex w-full flex-col gap-3 md:flex-row">
        <div className="rounded-base shadow-soft flex flex-1 flex-col items-center justify-between overflow-hidden border border-gray-200 sm:flex-row md:items-center">
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
                  <span className="flex items-center gap-2 text-xs">
                    {tab.icon}
                    {tab.title}
                  </span>
                }
              />
            ))}
          </Tabs>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          variant="contained"
          startIcon={<Add className="h-4 w-4" />}
        >
          <span className="text-xs text-nowrap">Add Company</span>
        </Button>
        <AddNewEmployer
          handleCloseModal={() => setModalOpen(false)}
          isModalOpen={modalOpen}
        />
      </div>
      {activeTab === "over-view" && <DashboardOverView />}
      {activeTab === "employer-list" && <EmployerListPanel />}
    </div>
  );
};

export default AdminPage;
