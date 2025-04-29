"use client";

import ClampedList from "@/components/UI/ClampedList";
import MinJobCard from "@/components/UI/job-card-min";
import { Company, JobData } from "@/types";
import AddNewJobButton from "./Modals/addNewJobButton";
import { Button } from "@mui/material";
import Link from "next/link";

const INITIAL_VISIBLE_ITEMS = 2;
const JobView: React.FC<{
  jobs: JobData[];
  isEmployee: boolean;
  company: Company;
}> = ({ jobs, isEmployee, company }) => {
  const showMore = jobs.length > INITIAL_VISIBLE_ITEMS;
  const remainingJobs = jobs.length - INITIAL_VISIBLE_ITEMS;
  return (
    <div>
      {jobs.length > 0 ? (
        <ClampedList
          className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2"
          Component={MinJobCard}
          data={jobs}
          type="Jobs"
          initialVisibleItems={INITIAL_VISIBLE_ITEMS}
          componentProps={{}}
          buttonClassName="flex items-center justify-center rounded-base border border-gray-200 bg-white p-3 shadow-lg"
        />
      ) : isEmployee ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-base border border-gray-200 bg-white p-5 shadow-lg">
          <h6 className="text-2xl font-semibold text-secondary">
            You haven&apos;t posted any jobs yet.
          </h6>
          <AddNewJobButton
            company={company}
            variant="contained"
            btnVariant="button"
          >
            Post Job Now
          </AddNewJobButton>
        </div>
      ) : null}
    </div>
  );
};

export default JobView;
