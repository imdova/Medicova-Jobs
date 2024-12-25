"use client";
import React, { useState } from "react";
import { doctorsBase as doctors, searchFilters } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import JobFilter from "./filter";
import { IconButton } from "@mui/material";
import { GridViewOutlined, List } from "@mui/icons-material";
import JobCard from "./job-card";

const ApplicantsPage: React.FC = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q: query } = searchParams as {
    [key: string]: string;
  };
  const [savedList, setSavedList] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [K in keyof typeof searchFilters]: (typeof searchFilters)[K][number]["value"][];
  }>({
    "Residency (Location)": [],
    city: [],
    nationality: [],
    industry: [],
    category: [],
    "Education Level": [],
    "Years Of Experience": [],
    gender: [],
    age: [],
  });
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items per page
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page

  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row p-2 lg:max-w-[1170px]">
      {/* Left Column: Filter Section */}
      <JobFilter
        sections={searchFilters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        searchKeys={["Residency (Location)", "nationality"]}
      />
      {/* Right Column: Results Section */}
      <div className="w-full px-2 md:px-6 md:pl-9 lg:w-[80%]">
        <div className="mb-9 flex flex-wrap-reverse items-center justify-between md:flex-nowrap">
          <div>
            <h3 className="text-[24px] font-bold">Search Results</h3>
            <p className="text-sm text-gray-400">Showing 2500 Results</p>
          </div>
          <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-normal">
            <div>
              <label className="text-gray-400">Sort by:</label>
              <select className="bg-transparent focus:outline-none">
                <option value="most-relevant">Most relevant</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex gap-2 border-l px-2">
              <IconButton className="border-none bg-[#82C341] text-white">
                <GridViewOutlined />
              </IconButton>
              <IconButton className="border-none bg-[#82C341] text-white">
                <List />
              </IconButton>
            </div>
          </div>
        </div>
        {/* Applicant Cards */}
        <div className="flex flex-col gap-4">
          {doctors.map((doctor, index) => (
            <JobCard
              key={index}
              doctor={doctor}
              savedList={savedList}
              setSavedList={setSavedList}
            />
          ))}
        </div>

        {/* Pagination */}
        <CustomPagination
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={doctors.length} // Pass the total items count
        />
      </div>
    </div>
  );
};

export default ApplicantsPage;
