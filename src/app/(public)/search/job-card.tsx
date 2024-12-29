"use client";
import { Avatar, IconButton } from "@mui/material";
import { Job } from "@/types";
import {
  Bookmark,
  BookmarkBorder,
  LocationOnOutlined,
  MedicalServicesOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import Flag from "@/components/UI/flagitem";
import ShareMenu from "@/components/UI/ShareMenu";
import Link from "next/link";
import { getLastEdit } from "@/util";

interface CandidateCardProps {
  job: Job;
  savedList?: string[];
  setSavedList?: React.Dispatch<React.SetStateAction<string[]>>;
  isApply?: boolean;
}

const JobCard: React.FC<CandidateCardProps> = ({
  job,
  savedList,
  setSavedList,
  isApply,
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
          <p className="text-primary mt-4 text-center text-sm">
            {getLastEdit(job.timeStamps)}
          </p>
        </div>
        <div>
          {isApply ? (
            <h6 className="text-main text-lg font-semibold">{job.title}</h6>
          ) : (
            <Link
              href={`/job/${job.id}`}
              className="text-main text-lg font-semibold hover:underline"
            >
              {job.title}
            </Link>
          )}
          <div className="text-secondary my-3 flex flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <LocationOnOutlined className="text-light-primary h-4 w-4 md:h-5 md:w-5" />
              <p className="text-xs md:text-base">{job.location}</p>
            </div>
            <div className="flex items-center gap-1">
              <SchoolOutlined className="text-light-primary h-4 w-4 md:h-5 md:w-5" />
              <p className="text-xs md:text-base">{job.education}</p>
            </div>
            <div className="flex items-center gap-1">
              <MedicalServicesOutlined className="text-light-primary h-4 w-4 md:h-5 md:w-5" />
              <p className="text-xs md:text-base">{job.specialty}</p>
            </div>
          </div>
          <div className="text-secondary my-3 flex flex-wrap gap-2">
            {job.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs md:text-base"
              >
                <span className="bg-secondary m-[6px] h-2 w-2 rounded-full"></span>
                {feature}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="hover:bg-primary border-light-primary text-main hover:text-primary-foreground rounded-[10px] border px-4 py-2 text-xs font-semibold transition-colors duration-300 focus:ring-2 focus:ring-white md:text-base">
              Healthcare
            </button>
            <button className="hover:bg-primary border-light-primary text-main hover:text-primary-foreground rounded-[10px] border px-4 py-2 text-xs font-semibold transition-colors duration-300 focus:ring-2 focus:ring-white md:text-base">
              Doctors
            </button>
            <button className="hover:bg-primary border-light-primary text-main hover:text-primary-foreground flex items-center gap-2 rounded-[10px] border px-4 py-2 text-xs font-semibold transition-colors duration-300 focus:ring-2 focus:ring-white md:text-base">
              Egypt
              <Flag code="eg" name="egypt" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-end justify-between gap-2 md:w-auto md:flex-col">
        <div className="flex justify-end">
          <IconButton onClick={toggleSave} size="medium">
            {isSaved ? (
              <Bookmark color="primary" className="text-primary h-8 w-8" />
            ) : (
              <BookmarkBorder
                color="primary"
                className="text-primary h-8 w-8"
              />
            )}
          </IconButton>
          <ShareMenu
            link={`https://www.example.com/job/${job.id}`}
            color="primary"
            className="text-primary h-12 w-12"
          />
        </div>
        {isApply ? (
          <button className="bg-primary hover:text-primary w-full text-nowrap rounded-[10px] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white focus:ring-2 focus:ring-white md:w-fit">
            Apply Now
          </button>
        ) : (
          <Link
            href={`/job/${job.id}`}
            className="bg-primary hover:text-primary w-full text-nowrap rounded-[10px] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white focus:ring-2 focus:ring-white md:w-fit"
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
