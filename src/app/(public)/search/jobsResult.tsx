"use client";
import { FormControl, IconButton, MenuItem, Select } from "@mui/material";
import { GridViewOutlined, List } from "@mui/icons-material";
import { useState } from "react";
import { JobData } from "@/types";
import JobCard from "@/components/UI/job-card";
import MinJobCard from "@/components/UI/job-card-min";
import { useSession } from "next-auth/react";
const JobsResult: React.FC<{ jobs: JobData[]; total: number }> = ({
  jobs,
  total,
}) => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log("🚀 ~ user:", user)
  const [view, setView] = useState("list");
  return (
    <>
      <div className="min-h-dvh">
        <div className="mb-9 flex flex-wrap-reverse items-center justify-between md:flex-nowrap">
          <div>
            <h3 className="text-[24px] font-bold text-main">Search Results</h3>
            <p className="text-sm text-secondary">
              {total === 0 ? "No results" : `Showing ${total} Results`}{" "}
            </p>
          </div>
          <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-normal">
            <div className="flex items-baseline gap-1">
              <label className="mb-1 text-secondary">Sort by:</label>
              <FormControl variant="standard" className="w-32">
                <Select
                  className="border-none bg-transparent text-main focus:outline-none"
                  disableUnderline
                  defaultValue="most-relevant"
                >
                  <MenuItem value="most-relevant">Most relevant</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex gap-2 border-l px-2">
              <IconButton
                onClick={() => setView("grid")}
                className={`${view === "grid" ? "bg-light-primary text-primary-foreground" : "text-secondary"} border-none focus:text-primary focus:outline-primary`}
              >
                <GridViewOutlined />
              </IconButton>
              <IconButton
                onClick={() => setView("list")}
                className={`${view === "list" ? "bg-light-primary text-primary-foreground" : "text-secondary"} border-none focus:text-primary focus:outline-primary`}
              >
                <List />
              </IconButton>
            </div>
          </div>
        </div>
        {total === 0 && (
          <div>
            <div className="p-4 text-center">
              <h1 className="mb-4 text-3xl font-semibold">No jobs found</h1>
              <p className="text-gray-600">
                Please refine your search by changing the keywords or the
                country
              </p>
            </div>
          </div>
        )}
        {view === "list" ? (
          <div className="mb-8 flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} seekerId={user?.id} />
            ))}
          </div>
        ) : (
          <div className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
            {jobs.map((job) => (
              <MinJobCard key={job.id} item={job} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default JobsResult;
