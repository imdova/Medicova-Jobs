"use client";
import {
  ArrowForward,
  BookmarkBorder,
  CheckCircleOutline,
  LocationOnOutlined,
  MedicalServicesOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import JobOverview from "@/components/UI/JobOverview";
import MinJobCard from "@/components/UI/job-card-min";
import { IconButton } from "@mui/material";
import ShareMenu from "@/components/UI/ShareMenu";
import { formatEducationAndSpecialty, getFullLastEdit } from "@/util";
import { useSession } from "next-auth/react";
import { JobData, UserState } from "@/types";
import { notFound } from "next/navigation";

const JobDetailPage: React.FC<{ job: JobData }> = ({ job }) => {
  const { data: session } = useSession();
  const user = session?.user as UserState;
  const companyId = user?.companyId || "";

  const education = formatEducationAndSpecialty(job);

  const isOwner = job.companyId === companyId;

  if (!isOwner && job.draft) {
    return notFound();
  }

  return (
    <div>
      {/* Applicant Cards */}
      <div className="mb-6 flex justify-between">
        <div className="flex flex-col justify-between">
          <span className="mb-2 w-fit rounded-md bg-[#82c341]/40 px-2 py-1 text-xs font-semibold text-primary">
            {getFullLastEdit(job.created_at || "")}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-main">{job.title}</h1>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-md text-sm text-gray-500">
              <LocationOnOutlined className="h-4 w-4 text-light-primary md:h-5 md:w-5" />
              <span className="ml-2 text-xs md:text-base">
                {job.country + ", " + job.city}
              </span>
            </div>
            {education && (
              <div className="rounded-md text-sm text-gray-500">
                <SchoolOutlined className="h-4 w-4 text-light-primary md:h-5 md:w-5" />
                <span className="ml-2 text-xs md:text-base">{education}</span>
              </div>
            )}
            <div className="rounded-md text-sm text-gray-500">
              <MedicalServicesOutlined className="h-4 w-4 text-light-primary md:h-5 md:w-5" />
              <span className="ml-2 text-xs md:text-base">
                {job.jobCategoryName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full items-end justify-between gap-2 md:w-auto md:flex-col">
          <div className="flex justify-end">
            <IconButton size="medium">
              <BookmarkBorder className="h-8 w-8" />
            </IconButton>
            <ShareMenu
              link={`https://www.example.com/job/${job.id}`}
              className="h-12 w-12"
            />
          </div>
          <button className="w-full text-nowrap rounded-[10px] bg-primary px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-900 focus:ring-2 focus:ring-white md:w-fit">
            Apply Now
          </button>
        </div>
      </div>
      {/* <JobCard key={0} job={job} isApply={true} /> */}

      <div className="mt-16 flex flex-col sm:flex-row sm:gap-8">
        <div className="flex-1">
          {/* Job Description */}
          {job.description && (
            <div className="max-w-[800px] overflow-hidden">
              <h3 className="text-2xl font-bold text-main">Job Description</h3>
              <div
                className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mt-2 max-w-[800px] text-wrap text-secondary"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          )}
          {/* Job Overview only on mobile */}
          <JobOverview
            key={1}
            data={job}
            className="mt-8 block rounded-[10px] bg-green-50 p-4 md:hidden"
          />

          {/* Job Responsibilities */}
          {/* <h3 className="mt-8 text-2xl font-bold text-main">
            Job Requirements
          </h3> */}
          {/* <ul className="mt-2 text-secondary">
            {job.requirements.map((item, i) => (
              <li key={i}>
                <CheckCircleOutline className="mb-2 mr-2 h-5 w-5 text-[#82C341]" />
                {item}
              </li>
            ))}
          </ul> */}

          {job.requirements && (
            <>
              <h3 className="mt-8 text-2xl font-bold text-main">
                Job Requirements
              </h3>
              <div
                className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl custom-list mt-2 text-secondary"
                dangerouslySetInnerHTML={{ __html: job.requirements }}
              />
            </>
          )}

          {job.salaryDetails && (
            <>
              <h3 className="mt-8 text-2xl font-bold text-main">
                Additional Details
              </h3>
              <p className="mt-2 text-secondary">{job.salaryDetails}</p>
            </>
          )}

          {/* Skills related to the job post */}
          <h3 className="mt-8 text-2xl font-bold text-main">
            Skills related to the job post{" "}
          </h3>
          <div className="mt-2 flex flex-wrap">
            {job.skills?.map((skill, i) => (
              <button
                key={i}
                className="mb-2 mr-2 rounded-md bg-primary-100 px-2 py-1 text-main duration-100 hover:bg-primary hover:text-primary-foreground"
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Related Search */}
          <h3 className="mt-8 text-2xl font-bold text-main">Related Search</h3>
          <div className="mt-2 flex flex-wrap">
            {job.keywords?.map((keyWord, i) => (
              <button
                key={i}
                className="mb-2 mr-2 rounded-md bg-primary-100 px-2 py-1 text-main duration-100 hover:bg-primary hover:text-primary-foreground"
              >
                {keyWord}
              </button>
            ))}
          </div>

          {/* company details */}
          {job.company && (
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* company details */}
              <div>
                <div className="flex items-center gap-2">
                  <Image
                    src={job.company.photo || "/images/company-logo.png"}
                    alt="company logo"
                    width={100}
                    height={100}
                  />
                  <Link href={"/co/" + job.company.id} className="group flex items-center gap-2">
                    <span className="text-lg font-bold text-main group-hover:underline">
                      {job.company.name}
                    </span>
                    <ArrowForward className="text-primary transition-transform duration-300 group-hover:translate-x-4" />
                  </Link>
                </div>
                <p className="mt-2 text-secondary">{job.company.about}</p>
              </div>
              {/* gallery */}
              {/* <div className="grid grid-cols-3 grid-rows-2 gap-3">
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
              </div> */}
            </div>
          )}
        </div>
        {/* Job Overview only on desktop */}
        <JobOverview
          key={2}
          data={job}
          className="sticky top-[80px] hidden h-fit w-72 rounded-[10px] bg-primary-100 p-4 md:block"
        />
      </div>
      {/* recent jobs */}

      <div className="mt-4 bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
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
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {/* card  */}
              {/* {jobs.map((job, i) => (
                <MinJobCard job={job} key={i} />
              ))} */}
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
  );
};

export default JobDetailPage;
