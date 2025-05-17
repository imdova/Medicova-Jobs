import { Company } from "@/types";
import { filteredJobs } from "@/lib/auth/utils";
import { getJobsByCompanyId } from "@/lib/actions/job.actions";
import AddNewJobButton from "./Modals/addNewJobButton";
import React from "react";
import { Add } from "@mui/icons-material";
import JobView from "./JobView";

interface CompanyJobsProps {
  company: Company;
  isEmployee: boolean;
}

const CompanyJobs = async ({ company, isEmployee }: CompanyJobsProps) => {
  const result = await getJobsByCompanyId(company.id, 1, 10);
  if (!result.success) return null;
  const { data: jobs, total } = result.data || { data: [], total: 0 };
  if (!isEmployee && jobs.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {/* Title */}
      <div className="flex items-center justify-between rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
        <h3 className="text-xl font-semibold text-main">Latest jobs:</h3>
        {isEmployee && (
          <AddNewJobButton
            company={company}
            className="rounded border border-solid border-gray-200 p-2"
            title="Create Job Now"
          >
            <Add />
          </AddNewJobButton>
        )}
      </div>
      {/* Loop through MinJobCard 8 times */}
      <JobView
        company={company}
        isEmployee={isEmployee}
        jobs={filteredJobs(jobs, isEmployee ? "all" : "active")}
      />
    </React.Fragment>
  );
};

export default CompanyJobs;
