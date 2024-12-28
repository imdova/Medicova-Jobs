"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          overflow: "auto",
          "& .MuiTabs-scrollButtons": {
            "&.Mui-disabled": {
              opacity: 0.3,
            },
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Industry" {...a11yProps(0)} />
          <Tab label="Sector" {...a11yProps(1)} />
          <Tab label="Category" {...a11yProps(2)} />
          <Tab label="Career Level" {...a11yProps(3)} />
          <Tab label="Company" {...a11yProps(4)} />
          <Tab label="Country" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Pharmacist
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Specialist doctor
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Healthcare
        </button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Pharmacist
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Specialist doctor
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Healthcare
        </button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Pharmacist
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Specialist doctor
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Healthcare
        </button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Pharmacist
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Specialist doctor
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Healthcare
        </button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Pharmacist
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Specialist doctor
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Healthcare
        </button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Pharmacist
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Specialist doctor
        </button>
        <button className="mr-2 rounded-[10px] border px-4 py-2 text-green-500 hover:bg-green-500 hover:text-white">
          Healthcare
        </button>
      </CustomTabPanel>
    </Box>
  );
}
