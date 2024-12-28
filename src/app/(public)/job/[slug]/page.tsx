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
            <h3 className="text-2xl font-bold">Job Description</h3>
            <p className="mt-2 font-medium text-gray-500">{job.description}</p>
            {/* Job Overview only on mobile */}
            <JobOverview className="mt-8 block rounded-[10px] bg-green-50 p-4 md:hidden" />

            {/* Job Responsibilities */}
            <h3 className="mt-8 text-2xl font-bold">Job Requirements</h3>
            <ul className="mt-2 font-medium text-gray-500">
              {job.requirements.map((item, i) => (
                <li key={i}>
                  <CheckCircleOutline className="mb-2 mr-2 h-5 w-5 text-[#82C341]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Additional Details */}
            <h3 className="mt-8 text-2xl font-bold">Additional Details</h3>
            <p className="mt-2 font-medium text-gray-500">
              {job.additionalDetails}
            </p>

            {/* Skills related to the job post */}
            <div className="mt-8 rounded-[10px] bg-green-50 p-4">
              <h3 className="text-2xl font-semibold">
                Skills related to the job post{" "}
              </h3>
              <div className="mt-2 flex flex-wrap">
                {job.skills.map((skill, i) => (
                  <button
                    key={i}
                    className="mr-2 mt-2 rounded-[5px] bg-[#2BA149] px-4 py-2 text-white hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-[#2BA149] md:mr-4"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Search */}
            <div className="mt-8 rounded-[10px] bg-green-50 p-4">
              <h3 className="text-2xl font-semibold">Related Search</h3>
              <div className="mt-2 flex flex-wrap">
                {job.relatedSearch.map((keyWord, i) => (
                  <button
                    key={i}
                    className="mr-4 mt-2 rounded-[5px] bg-[#2BA149] px-4 py-2 text-white hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-[#2BA149]"
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
                    <h3 className="text-lg font-bold group-hover:underline">
                      {job.company.name}
                    </h3>
                    <ArrowForward className="text-[#2BA149] transition-transform duration-300 group-hover:translate-x-4" />
                  </Link>
                </div>
                <p className="mt-2 text-gray-500">
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
          <JobOverview className="sticky top-4 hidden h-fit w-72 rounded-[10px] bg-green-50 p-4 md:block" />
        </div>
        {/* recent jobs */}

        <div className="mt-8 bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
          <div className="bg-white/80 p-4 shadow-md">
            <h2 className="text-center text-2xl font-black text-[#2BA149] md:text-4xl">
              <span className="text-2xl font-black text-black md:text-4xl">
                Related
              </span>{" "}
              Jobs
            </h2>
            <p className="mx-auto mt-2 max-w-[700px] px-4 text-center text-gray-500 md:text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
            </p>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* card  */}
              {[1, 2, 3, 1, 2, 3].map((_, i) => (
                <button
                  key={i}
                  className="flex items-center gap-4 rounded-[10px] border border-gray-100 bg-white p-2 px-4 shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#2BA149] hover:shadow-2xl focus:ring-2 focus:ring-[#2BA149]"
                >
                  <Image
                    src="/images/company-logo.jpg"
                    alt="company logo"
                    width={70}
                    height={70}
                    className="rounded-md"
                  />
                  <div>
                    <h6 className="font-semibold">Physical therapist</h6>
                    <p className="text-sm font-medium text-gray-500">
                      Nomad Paris, France
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link
                href="#"
                className="rounded-[8px] bg-[#2BA149] px-6 py-3 font-semibold uppercase text-white transition-colors duration-300 hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-white"
              >
                Explore All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;

const JobOverview: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div className={className}>
      <h4 className="mb-4 text-lg font-semibold">Job Overview</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <PersonOutlineOutlined fontSize="medium" sx={{ color: "#2EAE7D" }} />
          <div className="flex flex-col">
            <h5 className="font-semibold"> Career Level </h5>
            <p className="text-black/50"> Consultant </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccessTimeOutlined fontSize="medium" sx={{ color: "#2EAE7D" }} />
          <div className="flex flex-col">
            <h5 className="font-semibold"> Job Type </h5>
            <p className="text-black/50"> Full Time Onsite </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <WorkOutlineOutlined fontSize="medium" sx={{ color: "#2EAE7D" }} />
          <div className="flex flex-col">
            <h5 className="font-semibold"> Category </h5>
            <p className="text-black/50"> Doctors </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StarsOutlined fontSize="medium" sx={{ color: "#2EAE7D" }} />
          <div className="flex flex-col">
            <h5 className="font-semibold"> Experience </h5>
            <p className="text-black/50"> (3-5) Years </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SchoolOutlined fontSize="medium" sx={{ color: "#2EAE7D" }} />
          <div className="flex flex-col">
            <h5 className="font-semibold"> Degree </h5>
            <p className="text-black/50"> Master’s Degree </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccountBalanceWalletOutlined
            fontSize="medium"
            sx={{ color: "#2EAE7D" }}
          />
          <div className="flex flex-col">
            <h5 className="font-semibold"> Required Age </h5>
            <p className="text-black/50"> (45-50) Years </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PaidOutlined fontSize="medium" sx={{ color: "#2EAE7D" }} />
          <div className="flex flex-col">
            <h5 className="font-semibold"> Offered Salary </h5>
            <p className="text-black/50"> $40000-$42000 </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FmdGoodOutlined fontSize="medium" sx={{ color: "#2EAE7D" }} />
          <div className="flex flex-col">
            <h5 className="font-semibold"> Location </h5>
            <p className="text-black/50"> Geddah, Saudi Arabia </p>
          </div>
        </div>
      </div>
    </div>
  );
};
