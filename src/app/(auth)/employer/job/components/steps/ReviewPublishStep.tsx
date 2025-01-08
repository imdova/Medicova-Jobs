import React from "react";
import { jobs } from "@/constants";
import { IconButton } from "@mui/material";
import JobOverview from "@/components/UI/JobOverview";
import {
  BookmarkBorder,
  CheckCircleOutline,
  Close,
  LocationOnOutlined,
  MedicalServicesOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import JobCard from "@/components/UI/job-card";
import { getFullLastEdit } from "@/util";
import ShareMenu from "@/components/UI/ShareMenu";

const job = jobs[0];

const ReviewPublishStep: React.FC = () => (
  <div className="w-full px-2 md:px-6">
    <div className="mb-6 flex justify-between">
      <div className="flex flex-col justify-between">
        <span className="mb-2 w-fit rounded-md bg-[#82c341]/40 px-2 py-1 text-xs font-semibold text-primary">
          {getFullLastEdit(job.timeStamps)}
        </span>
        <h1 className="mb-4 text-4xl font-bold text-main">{job.title}</h1>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-md text-sm text-gray-500">
            <LocationOnOutlined className="h-4 w-4 text-light-primary md:h-5 md:w-5" />
            <span className="ml-2 text-xs md:text-base">{job.location}</span>
          </div>
          <div className="rounded-md text-sm text-gray-500">
            <SchoolOutlined className="h-4 w-4 text-light-primary md:h-5 md:w-5" />
            <span className="ml-2 text-xs md:text-base">{job.education}</span>
          </div>
          <div className="rounded-md text-sm text-gray-500">
            <MedicalServicesOutlined className="h-4 w-4 text-light-primary md:h-5 md:w-5" />
            <span className="ml-2 text-xs md:text-base">{job.specialty}</span>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-end justify-between gap-2 md:w-auto md:flex-col">
        <div className="flex justify-end">
          <IconButton size="medium">
            <BookmarkBorder className="h-8 w-8" />
          </IconButton>
          <ShareMenu
            link={`https://www.example.com/job/${job.id}`}
            className="h-12 w-12"
          />
        </div>
        <button className="w-full text-nowrap rounded-[10px] bg-primary px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-900 focus:ring-2 focus:ring-white md:w-fit">
          Apply Now
        </button>
      </div>
    </div>
    <div className="mt-16 flex flex-col sm:flex-row sm:gap-8">
      <div className="flex-1">
        {/* Job Description */}
        <h3 className="text-2xl font-bold text-main">Job Description</h3>
        <p className="mt-2 text-secondary">{job.description}</p>
        {/* Job Overview only on mobile */}
        <JobOverview
          key={1}
          className="mt-8 block rounded-[10px] bg-green-50 p-4 md:hidden"
        />

        {/* Job Responsibilities */}
        <h3 className="mt-8 text-2xl font-bold text-main">Job Requirements</h3>
        <ul className="mt-2 text-secondary">
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
        <p className="mt-2 text-secondary">{job.additionalDetails}</p>

        {/* Skills related to the job post */}
        <h3 className="mt-8 text-2xl font-bold text-main">
          Skills related to the job post{" "}
        </h3>
        <div className="mt-2 flex flex-wrap">
          {job.skills.map((skill, i) => (
            <button
              key={i}
              className="mb-2 mr-2 rounded-md bg-primary-100 px-2 py-1 text-main duration-100 hover:bg-primary hover:text-primary-foreground"
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Related Search */}
        <h3 className="mt-8 text-2xl font-bold text-main">Related Search</h3>
        <div className="mt-2 flex flex-wrap">
          {job.relatedSearch.map((keyWord, i) => (
            <button
              key={i}
              className="mb-2 mr-2 rounded-md bg-primary-100 px-2 py-1 text-main duration-100 hover:bg-primary hover:text-primary-foreground"
            >
              {keyWord}
            </button>
          ))}
        </div>
      </div>
      {/* Job Overview only on desktop */}
      <JobOverview
        key={2}
        className="sticky top-[80px] hidden h-fit w-72 rounded-[10px] bg-primary-100 p-4 md:block"
      />
    </div>
  </div>
);

export default ReviewPublishStep;
