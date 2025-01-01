import { jobs } from "@/constants";
import { Job } from "@/types";
import {
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
      <div className="flex items-center gap-4">
        <Image
          src="/images/company-logo.jpg"
          alt="company logo"
          width={45}
          height={45}
          className="h-[45px] rounded-md border object-contain"
        />
        <h6 className="my-1 text-left text-sm font-semibold text-main md:text-sm">
          {job.title}
        </h6>
      </div>
      <div className="mt-2 flex flex-wrap text-secondary">
        <div className="mb-1 mr-2 flex gap-1 md:mb-0">
          <LocationOnOutlined className="h-4 w-4 text-secondary md:h-5 md:w-5" />
          <p className="text-xs md:text-sm">{job.location}</p>
        </div>
        <div className="mb-1 mr-2 flex gap-1 md:mb-0">
          <SchoolOutlined className="h-4 w-4 text-secondary md:h-5 md:w-5" />
          <p className="text-xs md:text-sm">{job.education}</p>
        </div>
      </div>
      <div className="mb-2 ml-[6px] flex max-w-[500px] flex-wrap text-secondary">
        {job.features.map((feature, index) => (
          <div key={index} className="mr-2 flex items-center gap-1 text-xs">
            <span className="h-[4px] w-[4px] rounded-full bg-secondary"></span>
            {feature}
          </div>
        ))}
      </div>
    </Link>
  );
};

export default MinJobCard;
