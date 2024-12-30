import React from "react";
import { jobs } from "@/constants";
import { IconButton } from "@mui/material";
import JobOverview from "@/components/UI/JobOverview";
import { CheckCircleOutline, Close } from "@mui/icons-material";
import JobCard from "@/components/UI/job-card";

const job = jobs[0];

const ReviewPublishStep: React.FC = () => (
  <div className="w-full px-2 md:px-6">
    {/* Applicant Cards */}
    <JobCard key={0} job={job} isApply={true} />

    <div className="mt-10 flex flex-col sm:flex-row sm:gap-8">
      <div className="flex-1">
        {/* Job Description */}
        <h3 className="text-2xl font-bold text-main">Job Description</h3>
        <p className="mt-2 font-medium text-secondary">{job.description}</p>
        {/* Job Overview only on mobile */}
        <JobOverview
          key={1}
          className="mt-8 block rounded-[10px] bg-green-50 p-4 md:hidden"
        />

        {/* Job Responsibilities */}
        <h3 className="mt-8 text-2xl font-bold text-main">Job Requirements</h3>
        <ul className="mt-2 font-medium text-secondary">
          {job.requirements.map((item, i) => (
            <li key={i}>
              <CheckCircleOutline className="mb-2 mr-2 h-5 w-5 text-[#82C341]" />
              {item}
            </li>
          ))}
        </ul>

        {/* Additional Details */}
        <h3 className="mt-8 text-2xl font-bold text-main">
          Additional Details
        </h3>
        <p className="mt-2 font-medium text-secondary">
          {job.additionalDetails}
        </p>

        {/* Skills related to the job post */}
        <div className="mt-8 rounded-[10px] bg-green-50 p-4">
          <h3 className="text-2xl font-semibold text-main">
            Skills related to the job post{" "}
          </h3>
          <div className="mt-2 flex flex-wrap">
            {job.skills.map((skill, i) => (
              <div
                key={i}
                className="mr-2 mt-2 rounded-[5px] border border-primary px-4 py-2 text-secondary focus:ring-2 focus:ring-primary md:mr-4"
              >
                {skill}
                <IconButton size="small" color="error">
                  <Close />
                </IconButton>
              </div>
            ))}
          </div>
        </div>

        {/* Related Search */}
        <div className="mt-8 rounded-[10px] bg-green-50 p-4">
          <h3 className="text-2xl font-semibold text-main">Related Search</h3>
          <div className="mt-2 flex flex-wrap">
            {job.relatedSearch.map((keyWord, i) => (
              <div
                key={i}
                className="mr-2 mt-2 rounded-[5px] border border-primary px-4 py-2 text-secondary focus:ring-2 focus:ring-primary md:mr-4"
              >
                {keyWord}
                <IconButton size="small" color="error">
                  <Close />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Job Overview only on desktop */}
      <JobOverview
        key={2}
        className="sticky top-[110px] hidden h-fit w-72 rounded-[10px] bg-primary-100 p-4 md:block"
      />
    </div>
  </div>
);

export default ReviewPublishStep;
