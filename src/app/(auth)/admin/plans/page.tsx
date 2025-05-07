"use client";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SubscriptionPlansPage from "./panels/SubscriptionPlansPage";
import OvarviewBilling from "./panels/OverviewBilling";
import TranactionsPage from "./panels/TranactionsPage";
import AddNewPlan from "./panels/AddNewPlan";
import {
  ArrowDownUp,
  LayoutDashboard,
  LayoutList,
  Settings,
} from "lucide-react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel" // Accessibility: Defines this as a tab panel
      hidden={value !== index} // Hide the panel if it doesn't match the active tab
      id={`simple-tabpanel-${index}`} // Unique ID for the panel
      aria-labelledby={`simple-tab-${index}`} // Links the panel to its corresponding tab
      {...other}
    >
      {/* Render children only when the panel is active */}
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function aProps(index: number) {
  return {
    id: `simple-tab-${index}`, // Unique ID for the tab
    "aria-controls": `simple-tabpanel-${index}`, // Links the tab to its corresponding panel
  };
}
// end points
const API_GET_TRANSACTION_TABLE_DATA = "/api/employers/table-data";

const BillingPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="px-4">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <div className="flex-1 rounded-xl border bg-white shadow-sm">
          <Box
            sx={{
              // Styles for the selected tab
              ".css-o37pu0-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                backgroundColor: "#2ba149", // Green background for selected tab
                borderRadius: "30px", // Rounded corners
                color: "white", // White text for selected tab
              },
              // General styles for all tabs
              ".css-o37pu0-MuiButtonBase-root-MuiTab-root": {
                minHeight: 0, // Remove extra height from tabs
                fontSize: 10,
                minWidth: 60,
              },
              // Styles for the Tabs container
              ".css-5i28le-MuiTabs-root": {
                minHeight: 0, // Remove extra height from tabs container
              },
              // Styles for the Tabs container
              ".MuiBox-root": {
                padding: 0, // Remove extra height from tabs container
              },
            }}
          >
            {/* Tabs container */}
            <Tabs
              value={value} // Current selected tab index
              onChange={handleChange} // Function to handle tab change
              aria-label="basic tabs example" // Accessibility label
              TabIndicatorProps={{
                style: { display: "none" }, // Hide the default indicator
              }}
              sx={{
                // Styling for all Tab components
                ".MuiTab-root": {
                  textTransform: "none", // Disable uppercase text
                },
              }}
            >
              {/* Individual tabs */}
              <Tab
                label={
                  <div className="flex items-center gap-1">
                    <LayoutDashboard size={15} /> Overview
                  </div>
                }
                {...aProps(0)}
              />{" "}
              {/* Tab 1 */}
              <Tab
                label={
                  <div className="flex items-center gap-1">
                    <ArrowDownUp size={15} /> Tranactions
                  </div>
                }
                {...aProps(1)}
              />{" "}
              {/* Tab 2 */}
              <Tab
                label={
                  <div className="flex items-center gap-1">
                    <LayoutList size={15} /> Plans
                  </div>
                }
                {...aProps(2)}
              />{" "}
              {/* Tab 2 */}
              <Tab
                label={
                  <div className="flex items-center gap-1">
                    <Settings size={15} /> Settings
                  </div>
                }
                {...aProps(3)}
              />{" "}
              {/* Tab 3 */}
            </Tabs>
          </Box>
        </div>
        <Button
          className="flex w-full gap-2 rounded-md bg-primary p-2 sm:w-fit"
          size="small"
          variant="contained"
          onClick={handleOpenModal}
        >
          <AddCircleOutlineIcon />
          <span className="text-xs">New Plan</span>
        </Button>
      </div>
      <AddNewPlan
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
      <CustomTabPanel value={value} index={0}>
        <OvarviewBilling />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TranactionsPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SubscriptionPlansPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        setting
      </CustomTabPanel>
    </div>
  );
};

export default BillingPage;
