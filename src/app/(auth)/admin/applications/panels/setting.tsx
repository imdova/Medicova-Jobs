"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import IndustriesPage from "./Industries";
import CategoriesPage from "./Categories";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function aProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingPage: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="box-content">
      <Box sx={{ pb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Settings Tabs"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            minHeight: 0,
            "& .MuiTabs-flexContainer": {
              gap: 1,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: 12,
              minWidth: 80,
              minHeight: 32,
              px: 2,
              py: 0.5,
              borderRadius: "30px",
              backgroundColor: "#f0f0f0",
              "&.Mui-selected": {
                backgroundColor: "#2ba149",
                color: "white",
              },
            },
          }}
        >
          <Tab label="Industries" {...aProps(0)} />
          <Tab label="Categories" {...aProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <IndustriesPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CategoriesPage />
      </CustomTabPanel>
    </div>
  );
};

export default SettingPage;
