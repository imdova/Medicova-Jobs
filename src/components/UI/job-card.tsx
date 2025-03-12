"use client";
import { IconButton } from "@mui/material";
import { JobData } from "@/types";
import {
  AccessTimeOutlined,
  Bookmark,
  BookmarkBorder,
  Edit,
  LocationOnOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import ShareMenu from "@/components/UI/ShareMenu";
import Link from "next/link";
import { DropdownMenu } from "./Controls";
import { getFullLastEdit } from "@/util";
import { educationOptions, jobWorkPlaceOptions } from "@/constants/job";
import { StartDateType } from "@/constants/enums/start-type.enum";
import JobSwitch from "./JobSwitch";
import Avatar from "./Avatar";

interface JobCardProps {
  job: JobData;
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
  const isSaved = savedList?.includes(job.id || "");
  const toggleSave = () =>
    setSavedList && setSavedList((pv) => toggleId(pv, job.id || ""));

  const workPlace =
    jobWorkPlaceOptions.find((x) => x.id === job?.jobWorkPlace)?.label || "";
  const education =
    educationOptions.find((x) => x.id === job?.educationLevel)?.label || "";
  return (
    <div className="grid w-full grid-cols-1 flex-wrap justify-between gap-5 rounded-[10px] border border-gray-100 bg-white p-2 shadow-soft sm:flex-nowrap md:grid-cols-4 md:p-5">
      <div className="flex flex-col gap-1 md:col-span-3 md:flex-nowrap md:justify-normal">
        <div className="flex items-start gap-2">
          <Link href={`/co/${job.company?.username}`}>
            <Avatar
              src={job.company?.avatar}
              alt={job.company?.name + " profile Image"}
              size={60}
              shape="square"
              className={`transition-color border border-gray-100 duration-300 hover:border-primary`}
            />
          </Link>
          <div>
            <div className="flex items-start">
              {isApply ? (
                <h6 className="font-semibold text-main">{job.title}</h6>
              ) : isEdit ? (
                <div className="flex items-start gap-2">
                  <Link
                    href={`/job/${job.id}`}
                    className="w-fit font-semibold text-main hover:underline"
                  >
                    {job.title}
                  </Link>
                  {job.draft ? (
                    <Link
                      href={`/employer/job/posted/${job.id}`}
                      className="rounded-2xl bg-orange-300 px-2 py-1 text-xs text-black hover:underline"
                    >
                      Draft
                    </Link>
                  ) : (
                    ""
                  )}
                  <IconButton
                    LinkComponent={Link}
                    href={`/employer/job/posted/${job.id}`}
                    size="small"
                    className="p-0"
                    aria-label="edit"
                  >
                    <Edit className="h-5 w-5 hover:text-light-primary" />
                  </IconButton>
                </div>
              ) : (
                <Link
                  href={`/job/${job.id}`}
                  className="font-semibold text-main hover:underline"
                >
                  {job.title}
                </Link>
              )}
              <div className="ml-3 flex items-center gap-1 py-1">
                <AccessTimeOutlined className="m-0 h-4 w-4 p-0 text-secondary" />
                <span className="text-nowrap text-xs text-secondary">
                  {getFullLastEdit(job.created_at || "")}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap text-secondary">
              {(job?.country?.name || job?.city || job?.state?.name) && (
                <div className="mr-2 flex items-center gap-1 text-secondary">
                  <LocationOnOutlined className="-ml-1 h-4 w-4 text-light-primary md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">
                    {job?.country?.name ? `${job.country.name}, ` : ""}
                    {job?.state?.name ? `${job.state.name}, ` : ""}
                    {job.city}
                  </p>
                </div>
              )}
              {education && job.jobSpeciality && (
                <div className="mr-2 flex items-center gap-1">
                  <SchoolOutlined className="h-4 w-4 text-light-primary md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">
                    {education} Degree at {job.jobSpeciality}{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 flex max-w-[600px] flex-wrap text-secondary">
            {/* /// */}
            {job.jobEmploymentType && (
              <div className="flex items-center gap-1 text-xs md:text-base">
                <div>
                  <span className="mx-[4px] block h-[6px] w-[6px] rounded-full bg-secondary md:mx-[5px]"></span>
                </div>
                {job.jobEmploymentType} | {workPlace}
              </div>
            )}
            {(job.minExpYears || job.maxExpYears) && (
              <div className="flex items-center gap-1 text-xs md:text-base">
                <div>
                  <span className="mx-[4px] block h-[6px] w-[6px] rounded-full bg-secondary md:mx-[5px]"></span>
                </div>
                {job.minExpYears && job.maxExpYears
                  ? `EX (${job.minExpYears} - ${job.maxExpYears})`
                  : job.minExpYears
                    ? `EX (${job.minExpYears}+)`
                    : job.maxExpYears
                      ? `EX (${job.maxExpYears}-)`
                      : null}
              </div>
            )}
            {(job.minAge || job.maxAge) && (
              <div className="flex items-center gap-1 text-xs md:text-base">
                <div>
                  <span className="mx-[4px] block h-[6px] w-[6px] rounded-full bg-secondary md:mx-[5px]"></span>
                </div>
                Age{" "}
                {job.minAge && job.maxAge
                  ? `(${job.minAge} - ${job.maxAge})`
                  : job.minAge
                    ? `(${job.minAge}+)`
                    : job.maxAge
                      ? `(${job.maxAge}-)`
                      : null}
              </div>
            )}
            {/* <div className="flex items-center gap-1 text-xs md:text-base">
              <div>
                <span className="mx-[4px] block h-[6px] w-[6px] rounded-full bg-secondary md:mx-[5px]"></span>
              </div>
              <span className="rounded-base bg-red-100/60 px-2 py-1 text-sm text-red-600">
                Urgently hiring
              </span>
            </div> */}
            {job.startDateType && (
              <div className="flex items-center gap-1 text-xs md:text-base">
                <div>
                  <span
                    className={`mx-[4px] block h-[6px] w-[6px] rounded-full md:mx-[5px] ${job.startDateType === StartDateType.IMMEDIATE ? "bg-red-600" : "bg-primary"}`}
                  ></span>
                </div>

                <span
                  className={`rounded-base px-2 py-1 text-xs ${job.startDateType === StartDateType.IMMEDIATE ? "bg-red-100/60 text-red-600" : "bg-primary-100 text-primary"}`}
                >
                  {job.startDateType === StartDateType.IMMEDIATE
                    ? "Urgently hiring"
                    : "Flexible start date"}
                </span>
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap">
            {job.jobIndustry && (
              <Link
                href={`/search?q=${job.jobIndustry}`}
                className="mr-2 text-sm text-primary underline hover:no-underline"
              >
                #{job.jobIndustry}
              </Link>
            )}
            {job.jobCategory && (
              <Link
                href={`/search?q=${job.jobCategory}`}
                className="mr-2 text-sm text-primary underline hover:no-underline"
              >
                #{job.jobCategory}
              </Link>
            )}
            {job.country && (
              <Link
                href={`/search?country=${job.country.name}&cCd=${job.country.code}`}
                className="mr-2 text-sm text-primary underline hover:no-underline"
              >
                #{job.country.name}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-end justify-between gap-2 md:w-auto md:flex-col">
        {isEdit ? (
          <div className="flex justify-end">
            {!job.draft && <JobSwitch job={job} />}
            {/* <Switch defaultChecked /> */}
            {!job.draft && (
              <ShareMenu
                link={`https://www.example.com/job/${job.id}`}
                className="h-12 w-12"
              />
            )}
            <DropdownMenu job={job} />
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
            href={`/employer/job/applicants/${job.id}`}
            className="w-full text-nowrap rounded-[10px] bg-primary px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-900 focus:ring-2 focus:ring-white md:w-fit"
          >
            View Applicants ({job.applicationCount || 0})
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
