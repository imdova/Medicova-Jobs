import { jobs } from "@/constants";
import VerticalTabs from "./vertical-tabs";
import { notFound } from "next/navigation";
import { ArrowForward, CheckCircleOutline } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import JobOverview from "@/components/UI/JobOverview";
import MinJobCard from "@/components/UI/job-card-min";
import JobCard from "@/components/UI/job-card";

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
            <h3 className="text-2xl font-bold text-main">Job Description</h3>
            <p className="mt-2 font-medium text-secondary">{job.description}</p>
            {/* Job Overview only on mobile */}
            <JobOverview
              key={1}
              className="mt-8 block rounded-[10px] bg-green-50 p-4 md:hidden"
            />

            {/* Job Responsibilities */}
            <h3 className="mt-8 text-2xl font-bold text-main">
              Job Requirements
            </h3>
            <ul className="mt-2 font-medium text-secondary">
              {job.requirements.map((item, i) => (
                <li key={i}>
                  <CheckCircleOutline className="mb-2 mr-2 h-5 w-5 text-[#82C341]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Additional Details */}
            <h3 className="mt-8 text-2xl font-bold text-main">
              Additional Details
            </h3>
            <p className="mt-2 font-medium text-secondary">
              {job.additionalDetails}
            </p>

            {/* Skills related to the job post */}
            <div className="mt-8 rounded-[10px] bg-green-50 p-4">
              <h3 className="text-2xl font-semibold text-main">
                Skills related to the job post{" "}
              </h3>
              <div className="mt-2 flex flex-wrap">
                {job.skills.map((skill, i) => (
                  <button
                    key={i}
                    className="mr-2 mt-2 rounded-[5px] border border-primary px-4 py-2 text-secondary hover:bg-primary hover:text-primary-foreground focus:ring-2 focus:ring-primary md:mr-4"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Search */}
            <div className="mt-8 rounded-[10px] bg-green-50 p-4">
              <h3 className="text-2xl font-semibold text-main">
                Related Search
              </h3>
              <div className="mt-2 flex flex-wrap">
                {job.relatedSearch.map((keyWord, i) => (
                  <button
                    key={i}
                    className="mr-2 mt-2 rounded-[5px] border border-primary px-4 py-2 text-secondary hover:bg-primary hover:text-primary-foreground focus:ring-2 focus:ring-primary md:mr-4"
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
                    <h3 className="text-lg font-bold text-main group-hover:underline">
                      {job.company.name}
                    </h3>
                    <ArrowForward className="text-primary transition-transform duration-300 group-hover:translate-x-4" />
                  </Link>
                </div>
                <p className="mt-2 text-secondary">
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
          <JobOverview
            key={2}
            className="sticky top-4 hidden h-fit w-72 rounded-[10px] bg-primary-100 p-4 md:block"
          />
        </div>
        {/* recent jobs */}

        <div className="bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
          <div className="bg-white/80 shadow-md">
            <div className="container mx-auto p-4 lg:max-w-[1170px]">
              <h2 className="my-6 text-center text-[45px] font-bold leading-none text-light-primary md:text-[60px]">
                <span className="text-[45px] font-bold text-main md:text-[60px]">
                  Related
                </span>{" "}
                Jobs
              </h2>
              <p className="mx-auto mb-8 max-w-[700px] text-center text-2xl text-secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy
              </p>

              <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {/* card  */}
                {[1, 2, 3, 1, 2, 3, 1, 2, 3].map((_, i) => (
                  <MinJobCard key={i} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  href="#"
                  className="rounded-[8px] bg-primary px-6 py-3 font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary focus:ring-2 focus:ring-white"
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
