import { jobs, notifications } from "@/constants";
import { Job } from "@/types";
import { getFullLastEdit } from "@/util";
import {
  AccessTimeOutlined,
  LocationOnOutlined,
  MedicalServicesOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
interface JobCardProps {
  job?: Job;
  className?: string;
}

const MinJobCard: React.FC<JobCardProps> = ({ job: initialJob, className }) => {
  const job = initialJob || jobs[0];
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
          src={notifications[3].image}
          alt="company logo"
          width={45}
          height={45}
          className="h-[45px] rounded-md border object-contain object-cover"
        />
        <div className="flex flex-wrap gap-2 text-secondary">
          <div className="mb-1 mr-2 flex gap-1 md:mb-0">
            <LocationOnOutlined className="h-4 w-4 text-light-primary" />
            <p className="text-xs">{job.location}</p>
          </div>

          <div className="mb-1 mr-2 flex gap-1 md:mb-0">
            <SchoolOutlined className="h-4 w-4 text-light-primary" />
            <p className="text-xs">{job.education}</p>
          </div>
        </div>
      </div>

      <div className="mb-2 ml-[6px] mt-3 flex max-w-[500px] flex-wrap text-secondary">
        {job.features.map((feature, index) => (
          <div
            key={index}
            className="mr-2 mt-2 flex items-center gap-1 text-xs"
          >
            <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
            {feature}
          </div>
        ))}
        <div className="mr-2 mt-2 flex items-center gap-1">
          <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
          <span className="rounded-base bg-red-100/60 px-2 py-1 text-xs text-red-600">
            Urgently hiring
          </span>
        </div>
      </div>
      <div className="mb-1 mr-2 flex gap-1 md:mb-0">
        <AccessTimeOutlined className="h-4 w-4 text-light-primary" />
        <p className="text-xs">{getFullLastEdit(job.timeStamps)}</p>
      </div>
      <div className="mt-auto flex gap-3">
        <button className="mt-3 text-sm text-primary underline hover:no-underline">
          #Healthcare
        </button>
        <button className="mt-3 text-sm text-primary underline hover:no-underline">
          #Doctors
        </button>
        <button className="mt-3 text-sm text-primary underline hover:no-underline">
          #Egypt
        </button>
      </div>
    </Link>
  );
};

export default MinJobCard;
