"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  BusinessOutlined,
  DescriptionOutlined,
  HelpOutline,
  HomeOutlined,
  MessageOutlined,
  PersonOffOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useState } from "react";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

function a11yProps(index: number) {
  return {
    className:
      "duration-300 transition-color ease-in-out mx-4 rounded-[10px] h-[45px] min-h-[40px] flex flex-row justify-start text-gray-500 my-1",
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    sx: {
      "&.Mui-selected": {
        backgroundColor: "#82C341", // Add hover effect
        color: "white",
      },
    },
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(3);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      orientation="vertical"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      TabIndicatorProps={{
        sx: {
          backgroundColor: "#82C341", // Set the color of the indicator
          left: 0, // Move the indicator to the left
          width: 4, // Adjust the thickness of the indicator
          maxHeight: "30px", // Center the indicator vertically relative to the tab height
          borderRadius: 5, // Optional: Add rounded corners
          transform: "translateY(10px)", // Center the indicator vertically relative to its smaller height
        },
      }}
    >
      <Tab
        icon={<HomeOutlined />}
        label="Home"
        iconPosition="start"
        {...a11yProps(0)}
      />
      <Tab
        // icon={<Message />}
        label={
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <MessageOutlined /> <span>Messages</span>
            </div>
            <div
              className={`${value === 1 ? "bg-white text-[#82C341]" : "bg-gray-500 text-white"} aspect-square rounded-full p-1 px-2 text-xs`}
            >
              3
            </div>
          </div>
        }
        // iconPosition="start"
        {...a11yProps(1)}
      />
      <Tab
        icon={<DescriptionOutlined />}
        label="My Applications"
        iconPosition="start"
        {...a11yProps(2)}
      />
      <Tab
        icon={<Search />}
        iconPosition="start"
        label="Find Jobs"
        {...a11yProps(3)}
      />
      <Tab
        icon={<BusinessOutlined />}
        iconPosition="start"
        label="Browse Companies"
        {...a11yProps(4)}
      />
      <Tab
        icon={<PersonOffOutlined />}
        iconPosition="start"
        label="My Public Profile"
        {...a11yProps(5)}
      />
      <Divider className="mt-2" />
      <p className="p-4 text-sm uppercase text-gray-500">Settings</p>

      <Tab
        icon={<SettingsOutlined />}
        iconPosition="start"
        label="settings"
        {...a11yProps(6)}
      />
      <Tab
        icon={<HelpOutline />}
        iconPosition="start"
        label="Help Center"
        {...a11yProps(7)}
      />
    </Tabs>
  );
}
