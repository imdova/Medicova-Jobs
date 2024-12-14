"use client";
import {
  Box,
  Tabs,
  Tab,
  Avatar,
  Button,
  Select,
  MenuItem,
  Typography,
  Pagination,
} from "@mui/material";
import FilterSections from "@/components/UI/filter";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const filterSections = {
  "Residency (Location)": [
    { label: "All", count: 5, value: "all" },
    { label: "Egypt", count: 3, value: "egypt" },
    { label: "Qatar", count: 2, value: "Qatar" },
  ],
  "Education Level": [
    { label: "All", count: 250, value: "all" },
    { label: "Technical Institute", count: 50, value: "institute" },
    { label: "Bachelor’s Degree", count: 100, value: "bachelor" },
    { label: "Doctorate Degree", count: 70, value: "doctorate" },
    { label: "Fellowship", count: 30, value: "fellowship" },
  ],
  "Years Of Experience": [
    { label: "All", count: 150, value: "all" },
    { label: "1-3", count: 50, value: "1-3" },
    { label: "3-5", count: 40, value: "3-5" },
    { label: "5-10", count: 30, value: "5-10" },
    { label: "+10", count: 30, value: "10+" },
  ],
};

const ApplicantsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    residency: "",
    education: "",
    experience: 0,
  });

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleFilterChange = (key: string, value: any) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box className="flex flex-row w-full bg-white min-h-screen md:p-5 p-2">
      {/* Left Column: Filter Section */}
      <Box
        className="scroll-bar-hidden"
        sx={{
          width: "20%",
          position: "sticky",
          mt: "66px",
          top: "190px",
          overflowY: "scroll",
          maxHeight: "calc(100vh - 180px)",
          paddingBottom: "16px",
        }}
      >
        <FilterSections
          sections={filterSections}
          onFilterChange={handleFilterChange}
          searchKeys={["Residency (Location)"]}
        />
      </Box>

      {/* Right Column: Results Section */}
      <Box
        sx={{
          width: "80%",
          padding: "16px",
        }}
      >
        <div className="w-full">
          <h2 className="font-bold text-[#185D43] text-3xl mb-5">
            Clinical Pharmacist in Damam, Saudi Arabia
          </h2>
        </div>

        <Box className="flex justify-between">
          <Tabs
            sx={{
              marginBottom: "20px",
              "& .MuiTabs-indicator": {
                backgroundColor: "#185D43", // Active tab indicator color
              },
              "& .MuiTab-root": {
                textTransform: "none",
                color: "rgba(0, 0, 0, 0.5)",
                minWidth: "125px", // Increased width for each tab
                fontSize: "15px", // Increased font size for each tab
              },
              "& .Mui-selected": {
                color: "#185D43!important",
                fontWeight: "bold",
              },
            }}
            value={selectedTab}
            onChange={handleTabChange}
          >
            <Tab
              label={
                <span className="flex items-center normal-case">
                  All Applicants (100)
                </span>
              }
            />
            <Tab
              label={
                <span className="flex items-center gap-1 normal-case">
                  Locked (20)
                  <LockIcon className="text-red-500 w-5 h-5 " />
                </span>
              }
            />
            <Tab
              label={
                <span className="flex items-center gap-1 normal-case ">
                  Unlocked (30)
                  <LockOpenIcon className="text-[#2EAE7D] w-5 h-5 " />
                </span>
              }
            />
            <Tab
              label={
                <span className="flex items-center gap-1  normal-case  ">
                  Shortlisted (10)
                  <StarIcon className="text-[#2EAE7D] w-5 h-5 " />
                </span>
              }
            />
          </Tabs>

          <Select
            className="h-12"
            value="time-desc"
            onChange={(e) => console.log(e.target.value)}
          >
            <MenuItem value="time-desc">Newest</MenuItem>
            <MenuItem value="time-asc">Oldest</MenuItem>
          </Select>
        </Box>
        <div className="flex justify-between mb-4 items-center">
          <div className="flex gap-5 items-center">
            <div className="h-fit rounded-md bg-[#D6DDEB]">
              <ExpandMoreIcon className="w-6 h-6 m-2" />
            </div>
            <div className="h-fit rounded-md bg-[#D6DDEB] p-2 px-4">
              <p className="inline-block">Action</p>
              <ExpandMoreIcon className="w-6 h-6 ml-2 inline-block" />
            </div>
          </div>
          <div className="h-fit rounded-md bg-[#D6DDEB] p-2 px-4">
            <p className="inline-block w-16">Export</p>
            <ExpandMoreIcon className="w-6 h-6 ml-2 inline-block" />
          </div>
        </div>
        {/* Applicant Cards */}
        {Array.from({ length: 20 }, (_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              marginBottom: "12px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Avatar className="mr-4">A</Avatar>
            {/* <Box className="flex-grow">
              <Typography variant="subtitle1">John Doe</Typography>
              <Typography variant="body2">Applied on: 12/12/2024</Typography>
            </Box>
            <Box className="flex items-center">
              <Button variant="contained" color="primary" className="mr-2">
                Send WhatsApp
              </Button>
              <Button variant="contained" className="mr-2">
                Message
              </Button>
              <Button variant="outlined" className="mr-2">
                Add to Favorites
              </Button>
              <Button variant="outlined">Download CV</Button>
            </Box> */}
          </Box>
        ))}

        {/* Pagination */}
        <Pagination count={10} className="mt-4" />
      </Box>
    </Box>
  );
};

export default ApplicantsPage;
