import React, { useEffect, useState } from "react";
import MinJobCard from "@/components/UI/job-card-min";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Company, Job } from "@/types";
import { getJobsByCompanyId } from "@/lib/actions/employer.actions";
import Link from "next/link";

const INITIAL_VISIBLE_ITEMS = 4;
const CompanyJobs: React.FC<{
  company: Company;
  isMe: boolean;
}> = ({ company, isMe }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleItems(INITIAL_VISIBLE_ITEMS);
    } else {
      setVisibleItems(jobs.length);
    }
    setIsExpanded(!isExpanded);
  };
  const remainingItems = jobs.length - visibleItems;

  const initJobs = async (id: string) => {
    const result = await getJobsByCompanyId(id);
    if (result.success && result.data) {
      setJobs(result.data.data);
    } else {
      console.error(result.message);
    }
  };

  useEffect(() => {
    if (company.id && jobs.length === 0) {
      initJobs(company.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMe && jobs.length === 0) {
    return null;
  }
  return (
    <div className="mt-5">
      {/* Title */}
      <div className="flex items-center justify-between rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
        <h3 className="text-2xl font-bold text-main">Latest jobs:</h3>
        {isMe && (
          <Tooltip title="Post New Job">
            <IconButton LinkComponent={Link} href="/employer/job/posted" className="rounded border border-solid border-gray-300 p-2">
              <Add />
            </IconButton>
          </Tooltip>
        )}
      </div>
      {/* Loop through MinJobCard 8 times */}
      {jobs.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
          {/* card  */}
          {jobs.slice(0, visibleItems).map((job, i) => (
            <MinJobCard key={i} job={job} />
          ))}
        </div>
      ) : isMe ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-base border border-gray-100 bg-white mt-5 p-5 shadow-lg">
          <h6 className="text-2xl font-semibold text-secondary">
            You haven&apos;t posted any jobs yet.
          </h6>
          <Button LinkComponent={Link} href="/employer/job/posted" variant="contained">
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
