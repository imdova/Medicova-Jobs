"use client";
import React from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import JobCard from "@/components/UI/job-card";

const ManageJobs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ padding: { xs: "14px", md: "40px" } }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",

          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2,
        }}
      >
        {/* Search Input */}
        <TextField
          variant="outlined"
          placeholder="Search your job by title"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{
            width: { xs: "100%", md: "40%" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
            },
          }}
        />

        {/* Filter Section */}
        <Box sx={{ display: "flex", gap: 5 }}>
          <TextField
            className="hidden md:block"
            type="date"
            sx={{
              "& input": { padding: "10px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            variant="outlined"
          />
          {/* Filter Button with Background Color and Border Radius */}
          <button className="h-14 bg-[#eee] p-2 rounded-full w-14 md:w-auto flex md:gap-1 items-center justify-center md:px-6">
            <TuneIcon sx={{ color: "#2EAE7D" }} />
            <p className="hidden md:block">Filter</p>
          </button>
        </Box>
      </Box>

      {/* Tabs Section */}
      <div className="max-w-[calc(100vw-40px)]">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
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
        >
          <Tab label="All (20)" />
          <Tab label="Active (5)" />
          <Tab label="Closed (12)" />
          <Tab label="Expired (1)" />
          <Tab label="Draft (2)" />
        </Tabs>
      </div>

      {/* Job Listings */}
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <JobCard key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default ManageJobs;
