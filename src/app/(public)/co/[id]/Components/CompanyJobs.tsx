'use client'
import React, { useEffect, useState } from "react";
import MinJobCard from "@/components/UI/job-card-min";
import { Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Company } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchJobs } from "@/store/slices/jobSlice";
import { filteredJobs } from "@/lib/auth/utils";
import PostJobModal from "./Modals/post-job-modal";

const INITIAL_VISIBLE_ITEMS = 4;

const CompanyJobs: React.FC<{
  company: Company;
  isEmployee: boolean;
}> = ({ company, isEmployee }) => {
  const {
    jobs: { data: jobs, loading: jobsLoading, error },
  } = useAppSelector((state) => state.companyJobs);
  const dispatch = useAppDispatch();

  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);
  const [isExpanded, setIsExpanded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleItems(INITIAL_VISIBLE_ITEMS);
    } else {
      setVisibleItems(jobs.length);
    }
    setIsExpanded(!isExpanded);
  };

  const remainingItems = jobs.length - visibleItems;

  useEffect(() => {
    if (jobs.length === 0 && company?.id) {
      dispatch(fetchJobs(company?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, company?.id]);
  if (jobsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
        <h6 className="ml-4">Loading...</h6>
      </div>
    );
  }

  if (!isEmployee && jobs.length === 0) {
    return null;
  }

  const filJobs = filteredJobs(jobs, isEmployee ? "all" : "active");

  return (
    <div className="mt-5">
      <PostJobModal company={company} isOpen={isModalOpen} onClose={onClose} />
      {/* Title */}
      <div className="flex items-center justify-between rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
        <h3 className="text-2xl font-bold text-main">Latest jobs:</h3>
        {isEmployee && (
          <Tooltip title="Post New Job">
            <IconButton
              onClick={onOpen}
              className="rounded border border-solid border-gray-300 p-2"
            >
              <Add />
            </IconButton>
          </Tooltip>
        )}
      </div>
      {/* Loop through MinJobCard 8 times */}
      {filJobs.length > 0 ? (
        <div
          className={`mt-4 grid ${filJobs.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2`}
        >
          {/* card  */}
          {filJobs.slice(0, visibleItems).map((job, i) => (
            <MinJobCard key={i} job={job} />
          ))}
        </div>
      ) : isEmployee ? (
        <div className="mt-5 flex flex-col items-center justify-center gap-4 rounded-base border border-gray-100 bg-white p-5 shadow-lg">
          <h6 className="text-2xl font-semibold text-secondary">
            You haven&apos;t posted any jobs yet.
          </h6>
          <Button onClick={onOpen} variant="contained">
            Post Job Now
          </Button>
        </div>
      ) : null}
      {jobs.length > INITIAL_VISIBLE_ITEMS && (
        <div className="mt-5 flex items-center justify-center rounded-base border border-gray-100 bg-white p-3 shadow-lg">
          <Button className="mt-2 p-0" variant="text" onClick={handleToggle}>
            {isExpanded ? `Show less Jobs` : `Show ${remainingItems} more Jobs`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
