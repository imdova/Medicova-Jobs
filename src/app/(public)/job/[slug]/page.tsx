import { jobs } from "@/constants";
import JobCard from "../../search/job-card";
import VerticalTabs from "./vertical-tabs";
import { notFound } from "next/navigation";
import {
  AccessTimeOutlined,
  AccountBalanceWalletOutlined,
  ArrowForward,
  CheckCircleOutline,
  FmdGoodOutlined,
  PaidOutlined,
  PersonOutlineOutlined,
  SchoolOutlined,
  StarsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const ApplicantsPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const job = jobs.find((job) => job.id === slug);

  if (!job) return notFound();
  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row p-2 lg:max-w-[1300px]">
      {/* Left Column: Filter Section */}
      <div className="hidden w-1/5 rounded-[10px] border border-gray-100 bg-white py-4 shadow-xl lg:block">
        <div className="sticky top-4">
          <VerticalTabs />
        </div>
      </div>
      {/* Right Column: Results Section */}
      <div className="w-full px-2 md:px-6 md:pl-9 lg:w-[80%]">
        {/* Applicant Cards */}
        <JobCard key={0} job={job} isApply={true} />

        <div className="mt-10 flex flex-col sm:flex-row sm:gap-8">
          <div className="flex-1">
            {/* Job Description */}
            <h3 className="text-main text-2xl font-bold">Job Description</h3>
            <p className="text-secondary mt-2 font-medium">{job.description}</p>
            {/* Job Overview only on mobile */}
            <JobOverview className="mt-8 block rounded-[10px] bg-green-50 p-4 md:hidden" />

            {/* Job Responsibilities */}
            <h3 className="text-main mt-8 text-2xl font-bold">
              Job Requirements
            </h3>
            <ul className="text-secondary mt-2 font-medium">
              {job.requirements.map((item, i) => (
                <li key={i}>
                  <CheckCircleOutline className="mb-2 mr-2 h-5 w-5 text-[#82C341]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Additional Details */}
            <h3 className="text-main mt-8 text-2xl font-bold">
              Additional Details
            </h3>
            <p className="text-secondary mt-2 font-medium">
              {job.additionalDetails}
            </p>

            {/* Skills related to the job post */}
            <div className="mt-8 rounded-[10px] bg-green-50 p-4">
              <h3 className="text-main text-2xl font-semibold">
                Skills related to the job post{" "}
              </h3>
              <div className="mt-2 flex flex-wrap">
                {job.skills.map((skill, i) => (
                  <button
                    key={i}
                    className="text-secondary hover:bg-primary hover:text-primary-foreground border-primary focus:ring-primary mr-2 mt-2 rounded-[5px] border px-4 py-2 focus:ring-2 md:mr-4"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Search */}
            <div className="mt-8 rounded-[10px] bg-green-50 p-4">
              <h3 className="text-main text-2xl font-semibold">
                Related Search
              </h3>
              <div className="mt-2 flex flex-wrap">
                {job.relatedSearch.map((keyWord, i) => (
                  <button
                    key={i}
                    className="text-secondary hover:bg-primary hover:text-primary-foreground border-primary focus:ring-primary mr-2 mt-2 rounded-[5px] border px-4 py-2 focus:ring-2 md:mr-4"
                  >
                    {keyWord}
                  </button>
                ))}
              </div>
            </div>

            {/* company details */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* company details */}
              <div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/company-logo.jpg"
                    alt="company logo"
                    width={100}
                    height={100}
                  />
                  <Link href="#" className="group flex items-center gap-2">
                    <h3 className="text-main text-lg font-bold group-hover:underline">
                      {job.company.name}
                    </h3>
                    <ArrowForward className="text-primary transition-transform duration-300 group-hover:translate-x-4" />
                  </Link>
                </div>
                <p className="text-secondary mt-2">
                  Stripe is a technology company that builds economic
                  infrastructure for the internet. Businesses of every size—from
                  new startups to public companies—use our software to accept
                  payments and manage their businesses online.
                </p>
              </div>
              {/* gallery */}
              <div className="grid grid-cols-3 grid-rows-2 gap-3">
                <Image
                  src="/images/company-image1.jpg"
                  alt="company image 1"
                  width={400}
                  height={400}
                  className="col-span-2 row-span-2 h-full w-full rounded-md object-cover"
                />
                <Image
                  src="/images/company-image2.jpg"
                  alt="company image 2"
                  width={400}
                  height={400}
                  className="h-full w-full rounded-md object-cover"
                />
                <Image
                  src="/images/company-image3.jpg"
                  alt="company image 3"
                  width={400}
                  height={400}
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
            </div>
          </div>
          {/* Job Overview only on desktop */}
          <JobOverview className="bg-primary-100 sticky top-4 hidden h-fit w-72 rounded-[10px] p-4 md:block" />
        </div>
        {/* recent jobs */}

        <div className="bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
          <div className="bg-white/80 shadow-md">
            <div className="container mx-auto p-4 lg:max-w-[1170px]">
              <h2 className="text-light-primary my-6 text-center text-[45px] font-bold leading-none md:text-[60px]">
                <span className="text-main text-[45px] font-bold md:text-[60px]">
                  Related
                </span>{" "}
                Jobs
              </h2>
              <p className="text-secondary mx-auto mb-8 max-w-[700px] text-center text-2xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy
              </p>

              <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {/* card  */}
                {[1, 2, 3, 1, 2, 3, 1, 2, 3].map((_, i) => (
                  <button
                    key={i}
                    className="hover:border-primary focus:ring-primary flex gap-4 rounded-[10px] border border-gray-100 bg-white p-4 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:ring-2"
                  >
                    <Image
                      src="/images/company-logo.jpg"
                      alt="company logo"
                      width={70}
                      height={90}
                      className="h-[90px] rounded-md object-contain"
                    />
                    <div>
                      <h6 className="text-main my-1 text-left font-semibold">
                        Physical therapist
                      </h6>
                      <p className="text-secondary text-left text-sm font-medium">
                        Nomad Paris, France
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="text-main rounded-md border border-gray-200 bg-gray-50 p-1 px-2 text-xs">
                          Full-Time
                        </span>
                        <span className="border-light-primary text-light-primary rounded-md border p-1 px-2 text-xs">
                          Full-Time
                        </span>
                        <span className="border-light-primary text-light-primary rounded-md border p-1 px-2 text-xs">
                          Full-Time
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  href="#"
                  className="text-primary-foreground bg-primary hover:text-primary hover:bg-primary-foreground rounded-[8px] px-6 py-3 font-semibold uppercase transition-colors duration-300 focus:ring-2 focus:ring-white"
                >
                  Explore All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;

export const JobOverview: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div className={className}>
      <h4 className="text-main mb-4 text-lg font-semibold">Job Overview</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <PersonOutlineOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Career Level </h5>
            <p className="text-secondary"> Consultant </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccessTimeOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Job Type </h5>
            <p className="text-secondary"> Full Time Onsite </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <WorkOutlineOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Category </h5>
            <p className="text-secondary"> Doctors </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StarsOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Experience </h5>
            <p className="text-secondary"> (3-5) Years </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SchoolOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Degree </h5>
            <p className="text-secondary"> Master’s Degree </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccountBalanceWalletOutlined
            fontSize="medium"
            className="text-primary"
          />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Required Age </h5>
            <p className="text-secondary"> (45-50) Years </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PaidOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Offered Salary </h5>
            <p className="text-secondary"> $40000-$42000 </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FmdGoodOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Location </h5>
            <p className="text-secondary"> Geddah, Saudi Arabia </p>
          </div>
        </div>
      </div>
    </div>
  );
};
