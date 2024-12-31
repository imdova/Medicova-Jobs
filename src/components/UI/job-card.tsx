"use client";
import { Avatar, IconButton, Switch } from "@mui/material";
import { Job } from "@/types";
import {
  Bookmark,
  BookmarkBorder,
  Edit,
  LocationOnOutlined,
  MedicalServicesOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import Flag from "@/components/UI/flagitem";
import ShareMenu from "@/components/UI/ShareMenu";
import Link from "next/link";
import { getLastEdit } from "@/util";
import { DropdownMenu } from "./Controls";

interface JobCardProps {
  job: Job;
  savedList?: string[];
  setSavedList?: React.Dispatch<React.SetStateAction<string[]>>;
  isApply?: boolean;
  isEdit?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  savedList,
  setSavedList,
  isApply,
  isEdit,
}) => {
  const isSaved = savedList?.includes(job.id);
  const toggleSave = () =>
    setSavedList && setSavedList((pv) => toggleId(pv, job.id));

  return (
    <div className="grid w-full grid-cols-1 flex-wrap justify-between gap-5 rounded-[10px] border border-gray-100 bg-white p-2 shadow-lg sm:flex-nowrap md:grid-cols-4 md:p-5">
      <div className="flex justify-center gap-5 md:col-span-3 md:flex-nowrap md:justify-normal">
        <div>
          <Avatar
            src={"/images/company-logo.jpg"}
            alt={job.title}
            sx={{ width: 76, height: 76 }}
          />
          <p className="mt-4 text-center text-xs text-secondary">
            {getLastEdit(job.timeStamps)}
          </p>
        </div>
        <div>
          {isApply ? (
            <h6 className="text-lg font-semibold text-main">{job.title}</h6>
          ) : isEdit ? (
            <div className="flex items-center gap-2">
              <h6 className="text-lg font-semibold text-main">{job.title}</h6>
              <IconButton size="small" aria-label="edit">
                <Edit className="h-5 w-5 hover:text-light-primary" />
              </IconButton>
            </div>
          ) : (
            <Link
              href={`/job/${job.id}`}
              className="text-lg font-semibold text-main hover:underline"
            >
              {job.title}
            </Link>
          )}
          <div className="mt-2 flex flex-wrap text-secondary">
            <div className="mb-1 mr-2 flex items-center gap-1 md:mb-0">
              <LocationOnOutlined className="h-4 w-4 text-secondary md:h-5 md:w-5" />
              <p className="text-xs md:text-base">{job.location}</p>
            </div>
            <div className="mb-1 mr-2 flex items-center gap-1 md:mb-0">
              <SchoolOutlined className="h-4 w-4 text-secondary md:h-5 md:w-5" />
              <p className="text-xs md:text-base">{job.education}</p>
            </div>
            <div className="mb-1 mr-2 flex items-center gap-1 md:mb-0">
              <MedicalServicesOutlined className="h-4 w-4 text-secondary md:h-5 md:w-5" />
              <p className="text-xs md:text-base">{job.specialty}</p>
            </div>
          </div>
          <div className="mb-2 flex max-w-[500px] flex-wrap text-secondary">
            {job.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs md:text-base"
              >
                <span className="mx-[4px] h-2 w-2 rounded-full bg-secondary md:mx-[5px]"></span>
                {feature}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="rounded-[10px] border border-light-primary px-4 py-2 text-xs font-semibold text-main transition-colors duration-300 hover:bg-primary hover:text-primary-foreground focus:ring-2 focus:ring-white md:text-base">
              Healthcare
            </button>
            <button className="rounded-[10px] border border-light-primary px-4 py-2 text-xs font-semibold text-main transition-colors duration-300 hover:bg-primary hover:text-primary-foreground focus:ring-2 focus:ring-white md:text-base">
              Doctors
            </button>
            <button className="flex items-center gap-2 rounded-[10px] border border-light-primary px-4 py-2 text-xs font-semibold text-main transition-colors duration-300 hover:bg-primary hover:text-primary-foreground focus:ring-2 focus:ring-white md:text-base">
              Egypt
              <Flag code="eg" name="egypt" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-end justify-between gap-2 md:w-auto md:flex-col">
        {isEdit ? (
          <div className="flex justify-end">
            <Switch defaultChecked />
            <ShareMenu
              link={`https://www.example.com/job/${job.id}`}
              className="h-12 w-12"
            />
            <DropdownMenu />
          </div>
        ) : (
          <div className="flex justify-end">
            <IconButton onClick={toggleSave} size="medium">
              {isSaved ? (
                <Bookmark color="primary" className="h-8 w-8" />
              ) : (
                <BookmarkBorder className="h-8 w-8" />
              )}
            </IconButton>
            <ShareMenu
              link={`https://www.example.com/job/${job.id}`}
              className="h-12 w-12"
            />
          </div>
        )}

        {isApply ? (
          <button className="w-full text-nowrap rounded-[10px] bg-primary px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-900 focus:ring-2 focus:ring-white md:w-fit">
            Apply Now
          </button>
        ) : isEdit ? (
          <Link
            href={`/job/${job.id}`}
            className="w-full text-nowrap rounded-[10px] bg-primary px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-900 focus:ring-2 focus:ring-white md:w-fit"
          >
            View Applicants ({job.skills.length})
          </Link>
        ) : (
          <Link
            href={`/job/${job.id}`}
            className="w-full text-nowrap rounded-[10px] bg-primary px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-900 focus:ring-2 focus:ring-white md:w-fit"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;

function toggleId(ids: string[], id: string): string[] {
  // Check if the ID already exists in the array
  if (ids.includes(id)) {
    // If it exists, remove it
    return ids.filter((existingId) => existingId !== id);
  } else {
    // If it doesn't exist, add it
    return [...ids, id];
  }
}
