"use client";
import {
  ArrowForward,
  BookmarkBorder,
  LocationOnOutlined,
  MedicalServicesOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import JobOverview from "@/components/UI/JobOverview";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import ShareMenu from "@/components/UI/ShareMenu";
import { formatEducationAndSpecialty, getFullLastEdit } from "@/util";
import { useSession } from "next-auth/react";
import { JobData } from "@/types";
import { notFound } from "next/navigation";
import Loading from "@/components/loading/loading";
import RelatedJobs from "./relatedJobs";
import {
  API_CREATE_JOB_APPLICATION,
  API_GET_JOB_APPLICATIONS,
} from "@/api/employer";
import useUpdateApi from "@/hooks/useUpdateApi";
import useFetch from "@/hooks/useFetch";

const JobDetailPage: React.FC<{ job: JobData }> = ({ job }) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const companyId = user?.companyId || "";
  const isEmployer = user?.type === "employer";
  const education = formatEducationAndSpecialty(job);
  const isOwner = job.company?.id === companyId;

  const { isLoading, error, isSuccess, reset, update } = useUpdateApi();
  const { data: applications, loading } = useFetch<
    PaginatedResponse<JobApplicationData>
  >(
    user?.id &&
      API_GET_JOB_APPLICATIONS + `?jobId=${job.id}&seekerId=${user?.id}`,
  );
  const isApplied = applications?.total && applications.total > 0;

  const applyJob = async () => {
    await update(API_CREATE_JOB_APPLICATION, {
      method: "POST",
      body: { jobId: job.id, seekerId: user?.id },
    });
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (!isOwner && job.draft) {
    return notFound();
  }

  return (
    <div className="px-4 md:pr-8">
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
                {job?.country?.name ? `${job.country.name}, ` : ""}
                {job?.city}{" "}
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
                {job.jobCategory}
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full items-end justify-between gap-2 md:w-auto md:flex-col">
          <div className="flex justify-end">
            <IconButton size="medium">
              <BookmarkBorder className="h-8 w-8" />
            </IconButton>
            <ShareMenu path={`/job/${job.id}`} className="h-12 w-12" />
          </div>
          {user?.id ? (
            isEmployer ? null : (
              <Button
                onClick={applyJob}
                disabled={loading || isApplied || isLoading || isSuccess}
                className="text-nowrap text-lg font-semibold"
                variant="contained"
              >
                {isLoading || loading
                  ? "Loading..."
                  : isSuccess || isApplied
                    ? "Applied"
                    : "Apply Now"}
              </Button>
            )
          ) : (
            <Button
              variant="contained"
              LinkComponent={Link}
              href="/auth/signin"
              className="text-nowrap text-lg font-semibold"
            >
              Apply Now
            </Button>
          )}
        </div>
      </div>
      <div className="mt-16 flex flex-col sm:flex-row sm:gap-8">
        <div className="flex-1">
          {/* Job Description */}
          {job.description && (
            <div className="max-w-[800px] overflow-hidden">
              <h3 className="text-xl font-semibold text-main">Job Description</h3>
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

          {job.requirements && (
            <>
              <h3 className="mt-8 text-xl font-semibold text-main">
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
              <h3 className="mt-8 text-xl font-semibold text-main">
                Additional Details
              </h3>
              <p className="mt-2 text-secondary">{job.salaryDetails}</p>
            </>
          )}

          {/* Skills related to the job post */}
          <h3 className="mt-8 text-xl font-semibold text-main">
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
          <h3 className="mt-8 text-xl font-semibold text-main">Related Search</h3>
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
          {/* {job.company && ( */}
          {job.company && (
            <div className={`mt-8 grid grid-cols-1 gap-4 md:grid-cols-2`}>
              {/* <div className={`mt-8 grid grid-cols-1 gap-4 ${job.company.images "md:grid-cols-2"}`}> */}
              {/* company details */}
              <div>
                <Link
                  href={"/co/" + job?.company.username}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={job.company.avatar || "/images/placeholder-avatar.svg"}
                    alt="company logo"
                    width={70}
                    height={70}
                    className="rounded-md bg-primary-100 object-cover"
                  />
                  <h6 className="group flex items-center gap-2">
                    <span className="text-lg font-bold text-main group-hover:underline">
                      {job.company.name}
                    </span>
                    <ArrowForward className="text-primary transition-transform duration-300 group-hover:translate-x-4" />
                  </h6>
                </Link>
                <p className="mt-2 line-clamp-6 text-secondary">
                  {job.company.about}
                </p>
              </div>
              {/* gallery */}
              <div className="grid grid-cols-3 grid-rows-2 gap-3">
                {job.company.banner1 && (
                  <Image
                    src={job.company.banner1}
                    alt="company banner 1"
                    width={400}
                    height={400}
                    className="col-span-2 row-span-2 h-full w-full rounded-md object-cover"
                  />
                )}
                {job.company.banner2 && (
                  <Image
                    src={job.company.banner2}
                    alt="company image 2"
                    width={400}
                    height={400}
                    className="h-full w-full rounded-md object-cover"
                  />
                )}
                {job.company.banner3 && (
                  <Image
                    src={job.company.banner3}
                    alt="company image 3"
                    width={400}
                    height={400}
                    className="h-full w-full rounded-md object-cover"
                  />
                )}
              </div>
            </div>
          )}
          {/* )} */}
        </div>
        {/* Job Overview only on desktop */}
        <JobOverview
          key={2}
          data={job}
          className="sticky top-[80px] hidden h-fit w-72 rounded-[10px] bg-primary-100 p-4 md:block"
        />
      </div>
      <RelatedJobs job={job} />
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => reset()}>
        <Alert
          onClose={() => reset()}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default JobDetailPage;
