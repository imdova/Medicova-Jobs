"use client";
import React, { useEffect } from "react";
import { Box, TextField, IconButton, Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import JobCard from "@/components/UI/job-card";
import { useSession } from "next-auth/react";
import { JobsTabs, UserState } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchJobs } from "@/store/slices/jobSlice";
import { filteredJobs } from "@/lib/auth/utils";

const tabs: JobsTabs[] = ["all", "active", "closed", "expired", "draft"];

const ManageJobs: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user as UserState;
  const companyId = user?.companyId || "";

  const {
    jobs: { data: jobs, loading, error },
  } = useAppSelector((state) => state.companyJobs);
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (jobs.length === 0 && companyId) {
      dispatch(fetchJobs(companyId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, companyId]);

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
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={`${tab} (${filteredJobs(jobs, tabs[index]).length})`}
            />
          ))}
        </Tabs>
      </div>

      {/* Job Listings */}
      <div className="flex flex-col gap-4 p-2">
        {filteredJobs(jobs, tabs[activeTab]).map((job) => (
          <JobCard key={job.id} job={job} isEdit={true} />
        ))}
      </div>
    </Box>
  );
};

export default ManageJobs;
