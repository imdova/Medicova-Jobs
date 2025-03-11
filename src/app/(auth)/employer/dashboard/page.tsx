import { Button } from "@mui/material";
import { Ellipse5, GridIcon } from "@/components/icons/icons";
import EastIcon from "@mui/icons-material/East";
import JobCard from "@/components/UI/job-card";
import {
  GroupOutlined,
  Search,
  ShopOutlined,
  WorkOutline,
} from "@mui/icons-material";
import Link from "next/link";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { notFound } from "next/navigation";
import { getJobsByCompanyId } from "@/lib/actions/job.actions";
import SearchInput from "@/components/UI/search-Input";
import StatusCard from "@/components/UI/StatusCard";
import { filteredJobs } from "@/lib/auth/utils";
import { formatTimeDuration, itemsInLastDays, itemsPerDays } from "@/util/general";
import FolderSection from "./foldersSection";

const INITIAL_JOBS = 5;
const INITIAL_DURATIONS = 29;
const Duration = formatTimeDuration(INITIAL_DURATIONS);

const Page = async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user;
  if (!user?.companyId) return notFound();
  const result = await getJobsByCompanyId(user?.companyId, 1, 30);
  const { data: jobs, total } = result.data || { data: [], total: 0 };
  const activeJobs = filteredJobs(jobs, "active");
  const jobsInLastDays = itemsInLastDays(jobs, INITIAL_DURATIONS);
  return (
    <div className="flex flex-col gap-8 px-4 md:px-0 lg:flex-row">
      <div className="flex-1">
        {/* cards */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          <StatusCard
            title="Total Jobs"
            value={total}
            icon={WorkOutline}
            trend={{
              value: "+" + itemsPerDays(jobs, INITIAL_DURATIONS),
              description: "Since last "+Duration,
              trendDirection: "up",
            }}
          />

          <StatusCard
            title="Active Jobs"
            value={activeJobs.length}
            icon={ShopOutlined}
            trend={{
              value: "+" + itemsPerDays(activeJobs, INITIAL_DURATIONS),
              description: "Since last "+Duration,
              trendDirection: "up",
            }}
          />
          <StatusCard
            className="col-span-2 md:col-span-1"
            title="New Applicants"
            value={
              jobsInLastDays.reduce(
                (acc, job) => acc + (job.applicationCount || 0),
                0,
              ) || 0
            }
            icon={GroupOutlined}
            trend={{
              description: `In Last ${jobsInLastDays.length} jobs`,
            }}
          />
        </div>
        {/* search */}
        <div className="flex gap-2 pt-5 lg:hidden">
          <div className="flex w-full items-center gap-2">
            <Search color="primary" />
            <input
              className="block w-full min-w-40 appearance-none border-b-2 border-gray-300 px-3 py-2 focus:border-[#2EAE7D] focus:outline-none"
              placeholder="search by title eg: doctor"
            />
          </div>
          <Button variant="contained" className="text-nowrap px-5">
            CV Search
          </Button>
        </div>
        {/* recent jobs */}
        <h2 className="mb-5 mt-10 text-3xl font-semibold text-main">
          Recent{" "}
          <span className="mt-5 text-3xl font-semibold text-light-primary">
            Jobs
          </span>
        </h2>

        {jobs.length > 0 ? (
          <div>
            <div className="flex flex-col gap-4">
              {jobs.slice(0, INITIAL_JOBS).map((job) => (
                <JobCard key={job.id} job={job} isEdit={true} />
              ))}
            </div>

            {jobs.length > INITIAL_JOBS && (
              <div className="flex w-full justify-center">
                <Link
                  href="/employer/job/manage-jobs"
                  className="group my-2 mt-5 text-xl text-primary hover:underline"
                >
                  All Jobs
                  <EastIcon className="mx-2 inline-block transition group-hover:translate-x-3" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center justify-center gap-4 rounded-base border border-gray-100 bg-white p-5 shadow-lg">
            <h6 className="text-2xl font-semibold text-secondary">
              You haven&apos;t posted any jobs yet.
            </h6>
            <Button
              LinkComponent={Link}
              href="/employer/job/posted"
              variant="contained"
            >
              Post Job Now
            </Button>
          </div>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <FolderSection companyId={user.companyId} />
        </Suspense>
      </div>
      <div className="lg:max-w-[250px]">
        <div className="flex w-full flex-col gap-2 rounded-base border border-gray-100 bg-white p-4 shadow-soft">
          <h6 className="text-center text-lg">{user.companyName}</h6>
          <Button
            LinkComponent={Link}
            href={`/co/${user.companyUserName}`}
            variant="contained"
          >
            View profile
          </Button>
          <Button
            LinkComponent={Link}
            href="/employer/company-info"
            variant="outlined"
          >
            Edit company page
          </Button>
        </div>
        <h6 className="mt-4 text-lg font-semibold text-main">
          You are now a <span className="text-light-primary">Silver Plan</span>{" "}
        </h6>
        <div className="relative mt-2 overflow-hidden rounded-base bg-primary p-10">
          <Ellipse5 className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-primary-100" />
          <GridIcon className="absolute right-4 top-4" />
          <h4 className="mb-2 text-lg font-bold text-white">
            Upgrade your Account to Get more applicants
          </h4>
          <button className="rounded-xl bg-white px-4 py-2 text-black shadow-soft transition-colors duration-300 hover:bg-black hover:text-white">
            Upgrade
          </button>
        </div>

        <SearchInput
          formClassName="mt-5 hidden flex-col gap-2 p-2 lg:flex"
          pathname="/employer/search/cv"
          variant="standard"
          placeholder="search by title eg: doctor"
          fullWidth
          className="mb-2"
          InputProps={{
            startAdornment: <Search color="primary" />,
          }}
        >
          <Button type="submit" variant="contained" className="text-xl">
            Search
          </Button>
        </SearchInput>
      </div>
    </div>
  );
};

export default Page;
