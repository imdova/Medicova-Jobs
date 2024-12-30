"use client";
import React, { useState } from "react";
import { jobs, searchJopFilters } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import JobFilter from "./filter";
import { FormControl, IconButton, MenuItem, Select } from "@mui/material";
import { GridViewOutlined, List } from "@mui/icons-material";
import MinJobCard from "@/components/UI/job-card-min";
import JobCard from "@/components/UI/job-card";

const SearchPage: React.FC = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q: query } = searchParams as {
    [key: string]: string;
  };
  const [view, setView] = useState<"grid" | "list">("list");
  const [savedList, setSavedList] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [K in keyof typeof searchJopFilters]: (typeof searchJopFilters)[K][number]["value"][];
  }>({
    "Job Level": [],
    "Main Specialty": [],
    "Salary Range": [],
    "Work Place": [],
    "Work Time": [],
    Categories: [],
    Industry: [],
  });
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items per page
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page

  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row p-2 lg:max-w-[1170px]">
      {/* Left Column: Filter Section */}
      <JobFilter
        sections={searchJopFilters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {/* Right Column: Results Section */}
      <div className="w-full px-2 md:px-6 md:pl-9 lg:w-[80%]">
        <div className="mb-9 flex flex-wrap-reverse items-center justify-between md:flex-nowrap">
          <div>
            <h3 className="text-[24px] font-bold text-main">Search Results</h3>
            <p className="text-sm text-secondary">Showing 2500 Results</p>
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
        {/* Applicant Cards */}

        {view === "list" ? (
          <div className="mb-8 flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedList={savedList}
                setSavedList={setSavedList}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {jobs.map((job) => (
              <MinJobCard
                key={job.id}
                job={job}
                className="flex-wrap justify-center md:flex-nowrap"
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <CustomPagination
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={200} // Pass the total items count
        />
      </div>
    </div>
  );
};

export default SearchPage;
