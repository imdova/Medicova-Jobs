import { JobData } from "@/types";
import { formatEducationAndSpecialty, getFullLastEdit } from "@/util";
import {
  AccessTimeOutlined,
  LocationOnOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { jobWorkPlaceOptions } from "@/constants/job";
import { StartDateType } from "@/constants/enums/start-type.enum";
import Avatar from "./Avatar";
interface JobCardProps {
  job: JobData;
  className?: string;
}
const MinJobCard: React.FC<JobCardProps> = ({ job, className }) => {
  const workPlace =
    jobWorkPlaceOptions.find((x) => x.id === job?.jobWorkPlace)?.label || "";
  const education = formatEducationAndSpecialty(job);

  return (
    <div
      className={`flex flex-col rounded-[10px] border border-gray-200 bg-white p-4 shadow-soft transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl focus:ring-2 focus:ring-primary ${className}`}
    >
      <div className="my-1 mb-2 text-left text-sm font-semibold text-main md:text-sm">
        <Link
          href={`/job/${job.id}`}
          className="my-1 mb-2 text-left text-sm font-semibold text-main md:text-sm hover:underline">
          {job.title}{" "}
        </Link>
        {job.draft ? (
          <Link
            href={`/employer/job/posted/${job.id}`}
            className="rounded-2xl bg-orange-300 px-2 py-1 text-xs text-black hover:underline">
            Draft
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/co/${job.company?.username}`}>
          <Avatar
            src={job.company?.avatar}
            alt={job.title}
            size={45}
            shape="square"
            className="border border-transparent hover:border-primary "
          />
        </Link>
        <div className="flex flex-wrap gap-2 text-secondary">
          {(job.country || job.city) && (
            <div className="mb-1 mr-2 flex gap-1 md:mb-0">
              <LocationOnOutlined className="h-4 w-4 text-light-primary" />
              <p className="text-xs">
                {job.country ? job.country.name : ""}
                {job.city ? `, ${job.city}` : ""}
              </p>
            </div>
          )}

          {education && (
            <div className="mb-1 mr-2 flex gap-1 md:mb-0">
              <SchoolOutlined className="h-4 w-4 text-light-primary" />
              <p className="text-xs">{education}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-2 ml-[6px] mt-3 flex max-w-[500px] flex-wrap text-secondary">
        {job.jobEmploymentType && workPlace && (
          <div className="mr-2 mt-2 flex items-center gap-1 text-xs">
            <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
            {job.jobEmploymentType} {workPlace ? " | " + workPlace : ""}
          </div>
        )}
        {job.minExpYears !== null && job.maxExpYears !== null ? (
          <div className="mr-2 mt-2 flex items-center gap-1 text-xs">
            <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
            EX ({job.minExpYears || "0"} - {job.maxExpYears})
          </div>
        ) : null}

        {job.minAge && job.maxAge && (
          <div className="mr-2 mt-2 flex items-center gap-1 text-xs">
            <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
            Age ({job.minAge} - {job.maxAge})
          </div>
        )}
        {job.startDateType && (
          <div className="mr-2 mt-2 flex items-center gap-1">
            <span
              className={`h-[4px] w-[4px] rounded-full ${job.startDateType === StartDateType.IMMEDIATE ? "bg-red-600" : "bg-primary"}`}
            ></span>
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
      {job.created_at && (
        <div className="mb-1 mr-2 flex gap-1 md:mb-0">
          <AccessTimeOutlined className="h-4 w-4 text-light-primary" />
          <p className="text-xs">{getFullLastEdit(job.created_at)}</p>
        </div>
      )}
      <div className="mt-auto">
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
  );
};

export default MinJobCard;
