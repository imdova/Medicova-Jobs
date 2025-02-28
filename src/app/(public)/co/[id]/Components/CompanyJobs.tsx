import MinJobCard from "@/components/UI/job-card-min";
import { Button } from "@mui/material";
import { Company } from "@/types";
import { filteredJobs } from "@/lib/auth/utils";
import { getJobsByCompanyId } from "@/lib/actions/job.actions";
import AddNewJobButton from "./Modals/addNewJobButton";
import Link from "next/link";

const INITIAL_VISIBLE_ITEMS = 4;

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

  const filJobs = filteredJobs(jobs, isEmployee ? "all" : "active");
  const showMore = filJobs.length > INITIAL_VISIBLE_ITEMS;
  const remainingJobs = filJobs.length - INITIAL_VISIBLE_ITEMS;
  return (
    <div className="mt-5">
      {/* Title */}
      <div className="flex items-center justify-between rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
        <h3 className="text-2xl font-bold text-main">Latest jobs:</h3>
        {isEmployee && (
          <AddNewJobButton company={company} />
        )}
      </div>
      {/* Loop through MinJobCard 8 times */}
      {filJobs.length > 0 ? (
        <div
          className={`mt-4 grid ${filJobs.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2`}
        >
          {/* card  */}
          {filJobs.slice(0, INITIAL_VISIBLE_ITEMS).map((job, i) => (
            <MinJobCard key={i} job={job} />
          ))}
        </div>
      ) : isEmployee ? (
        <div className="mt-5 flex flex-col items-center justify-center gap-4 rounded-base border border-gray-100 bg-white p-5 shadow-lg">
          <h6 className="text-2xl font-semibold text-secondary">
            You haven&apos;t posted any jobs yet.
          </h6>
          {/* TODO : add Post Job Form modal */}
          <Button variant="contained">
            Post Job Now
          </Button>
        </div>
      ) : null}
      {showMore && (
        <div className="mt-5 flex items-center justify-center rounded-base border border-gray-100 bg-white p-3 shadow-lg">
          <Button LinkComponent={Link} href="/employer/jobs/manage-jobs" className="mt-2 p-0" variant="text">
            Show {remainingJobs} more Jobs
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
