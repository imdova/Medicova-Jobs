"use client";
import React, { useEffect } from "react";
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
import { useSession } from "next-auth/react";
import { JobData, UserState } from "@/types";
import { getJobsByCompanyId } from "@/lib/actions/job.actions";

const ManageJobs: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user as UserState;
  const companyId = user?.companyId || "";

  const [activeTab, setActiveTab] = React.useState(0);
  const [jobs, setJobs] = React.useState<JobData[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const fetchJobHandler = async () => {
    const result = await getJobsByCompanyId(companyId);
    if (result.success && result.data) {
      setJobs(result.data.data);
    }
  };

  useEffect(() => {
    if (companyId && !jobs.length) {
      fetchJobHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const filteredJobs = () => {
    switch (activeTab) {
      case 0: // All
        return jobs;
      case 1: // Active
        return jobs.filter((job) => job.active && !job.closed && !job.draft);
      case 2: // Closed
        return jobs.filter((job) => job.closed);
      case 3: // Expired (based on validity date)
        return jobs.filter((job) => job.validTo && new Date(job.validTo) < new Date());
      case 4: // Draft
        return jobs.filter((job) => job.draft);
      default:
        return jobs;
    }
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
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eee] p-2 md:w-auto md:gap-1 md:px-6">
            <TuneIcon className="text-primary" />
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
            "& .MuiTab-root": {
              textTransform: "none",
              minWidth: "125px", // Increased width for each tab
              fontSize: "15px", // Increased font size for each tab
            },
            "& .Mui-selected": {
              fontWeight: "bold",
            },
          }}
        >
          <Tab label={`All (${jobs.length})`} />
          <Tab
            label={`Active (${jobs.filter((job) => job.active && !job.closed && !job.draft).length})`}
          />
          <Tab label={`Closed (${jobs.filter((job) => job.closed).length})`} />
          <Tab
            label={`Expired (${jobs.filter((job) => job.validTo && new Date(job.validTo) < new Date()).length})`}
          />
          <Tab label={`Draft (${jobs.filter((job) => job.draft).length})`} />
        </Tabs>
      </div>

      {/* Job Listings */}
      <div className="flex flex-col gap-4 p-2">
        {filteredJobs().map((job) => (
          <JobCard key={job.id} job={job} isEdit={true} />
        ))}
      </div>
    </Box>
  );
};

export default ManageJobs;
