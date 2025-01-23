import { notifications } from "@/constants";
import { JobData } from "@/types";
import { getFullLastEdit } from "@/util";
import {
  AccessTimeOutlined,
  LocationOnOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { educationOptions, jobWorkPlaceOptions } from "@/constants/job";
import { StartDateType } from "@/constants/enums/start-type.enum";
interface JobCardProps {
  job: JobData;
  className?: string;
}

const MinJobCard: React.FC<JobCardProps> = ({ job, className }) => {
  const workPlace =
    jobWorkPlaceOptions.find((x) => x.id === job?.jobWorkPlace)?.label || "";
  const education =
    educationOptions.find((x) => x.id === job?.educationLevel)?.label || "";
  return (
    <Link
      href={`/job/${job.id}`}
      className={`flex flex-col rounded-[10px] border border-gray-100 bg-white p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-2xl focus:ring-2 focus:ring-primary ${className}`}
    >
      <h6 className="my-1 mb-2 text-left text-sm font-semibold text-main md:text-sm">
        {job.title}
      </h6>
      <div className="flex items-center gap-2">
        <Image
          src={job.company?.photo || "/images/placeholder-avatar.svg"}
          alt={job.title}
          width={45}
          height={45}
          className="h-[45px] rounded-md border object-cover"
        />
        <div className="flex flex-wrap gap-2 text-secondary">
          <div className="mb-1 mr-2 flex gap-1 md:mb-0">
            <LocationOnOutlined className="h-4 w-4 text-light-primary" />
            <p className="text-xs">
              {job.country}, {job.city}{" "}
            </p>
          </div>

          <div className="mb-1 mr-2 flex gap-1 md:mb-0">
            <SchoolOutlined className="h-4 w-4 text-light-primary" />
            <p className="text-xs">
              {education} Degree at {job.jobSpeciality?.name}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-2 ml-[6px] mt-3 flex max-w-[500px] flex-wrap text-secondary">
        <div className="mr-2 mt-2 flex items-center gap-1 text-xs">
          <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
          {job.jobEmploymentType?.name} | {workPlace}
        </div>
        <div className="mr-2 mt-2 flex items-center gap-1 text-xs">
          <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
          EX ({job.minExpYears} - {job.maxExpYears})
        </div>
        <div className="mr-2 mt-2 flex items-center gap-1 text-xs">
          <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
          Age ({job.minAge} - {job.maxAge})
        </div>
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
      </div>
      <div className="mb-1 mr-2 flex gap-1 md:mb-0">
        <AccessTimeOutlined className="h-4 w-4 text-light-primary" />
        <p className="text-xs">{getFullLastEdit(job.createdAt || "")}</p>
      </div>
      <div className="mt-auto flex gap-3">
        <button className="mt-3 text-sm text-primary underline hover:no-underline">
          #{job.jobIndustry?.name}
        </button>
        <button className="mt-3 text-sm text-primary underline hover:no-underline">
          #{job.jobCategory?.name}
        </button>
        <button className="mt-3 text-sm text-primary underline hover:no-underline">
          #{job.country}
        </button>
      </div>
    </Link>
  );
};

export default MinJobCard;
