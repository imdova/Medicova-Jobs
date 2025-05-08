"use client";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SubscriptionPlansPage from "./panels/SubscriptionPlansPage";
import OvarviewBilling from "./panels/OverviewBilling";
import TranactionsPage from "./panels/TranactionsPage";
import AddNewPlan from "./panels/AddNewPlan";
import { HandCoins, LayoutDashboard, LayoutList, Settings } from "lucide-react";
import { Add } from "@mui/icons-material";

type Tab = "over-view" | "tranactions" | "setting" | "plans";

const tabs: { key: Tab; title: string; icon?: React.ReactNode }[] = [
  {
    key: "over-view",
    title: "Over View",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    key: "tranactions",
    title: "Tranactions",
    icon: <LayoutList size={15} />,
  },
  {
    key: "plans",
    title: "Plans",
    icon: <HandCoins size={15} />,
  },
  {
    key: "setting",
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const BillingPage: React.FC = () => {
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
            className="flex flex-wrap"
            sx={{
              ".css-heg063-MuiTabs-flexContainer": {
                flexWrap: "Wrap",
              },
            }}
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
        <Button
          className="bg-primary"
          startIcon={<Add className="h-5 w-5" />}
          size="small"
          variant="contained"
          onClick={handleOpenModal}
        >
          <span className="text-xs">New Plan</span>
        </Button>
      </div>
      <AddNewPlan
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />

      {activeTab === "over-view" && <OvarviewBilling />}
      {activeTab === "tranactions" && <TranactionsPage />}
      {activeTab === "plans" && <SubscriptionPlansPage />}
      {activeTab === "setting" && "setting"}
    </div>
  );
};

export default BillingPage;
