import { jobs } from "@/constants";
import { Job } from "@/types";
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
      className={`flex gap-4 rounded-[10px] border border-gray-100 bg-white p-4 shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-2xl focus:ring-2 focus:ring-primary ${className}`}
    >
      <Image
        src="/images/company-logo.jpg"
        alt="company logo"
        width={70}
        height={90}
        className="h-[90px] rounded-md object-contain"
      />
      <div>
        <h6 className="my-1 text-left text-sm font-semibold text-main md:text-base">
          {job.title}
        </h6>
        <p className="text-left text-xs font-medium text-secondary md:line-clamp-3 md:text-sm">
          {job.location} | {job.education} | {job.specialty} |{" "}
          {job.features.join(" | ")}
        </p>
        {/* <div className="mt-1 flex flex-wrap gap-2">
          <span className="rounded-md border border-gray-200 bg-gray-50 p-1 px-2 text-xs text-main">
            Full-Time
          </span>
          <span className="rounded-md border border-light-primary p-1 px-2 text-xs text-light-primary">
            Full-Time
          </span>
          <span className="rounded-md border border-light-primary p-1 px-2 text-xs text-light-primary">
            Full-Time
          </span>
        </div> */}
      </div>
    </Link>
  );
};

export default MinJobCard;
