"use client";

import { API_GET_JOB_APPLICATIONS } from "@/api/employer";
import { API_GET_SEEKERS } from "@/api/seeker";
import NotFoundPage from "@/app/not-found";
import DynamicTable from "@/components/tables/DTable";
import CellOptions from "@/components/UI/CellOptions";
import useFetch from "@/hooks/useFetch";
import {
  Check,
  Download,
  Eye,
  File,
  FileType,
  ListOrdered,
  SquarePen,
  View,
  Copy,
  Mail,
  MessageSquare,
  MessageCircleMore,
  Phone,
  Plus,
  UsersRound,
  Bookmark,
  CircleCheck,
  Forward,
  MapPin,
  GraduationCap,
  Clock,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SingleUserProps {
  params: {
    slug: string;
  };
}

const cvFile = {
  name: "CVjake Medical.pdf",
  url: "/path/to/cv.pdf",
  size: "2.4 MB",
  uploadDate: "May 15, 2023",
};
const menuItems = [
  {
    id: 1,
    title: "Send Email",
    icon: <Mail size={16} className="text-green-500" />,
    action: () => (window.location.href = "mailto:contact@example.com"),
  },
  {
    id: 2,
    title: "Send Web Message",
    icon: <MessageSquare size={16} className="text-green-500" />,
    action: () => console.log("Opening web message form"),
  },
  {
    id: 3,
    title: "Chat on WhatsApp",
    icon: <MessageCircleMore size={16} className="text-green-500" />,
    action: () => window.open("https://wa.me/1234567890", "_blank"),
  },
  {
    id: 4,
    title: "Call",
    icon: <Phone size={16} className="text-green-500" />,
    action: () => (window.location.href = "tel:+1234567890"),
  },
];

// data jobs columns
const columns = [
  {
    key: "name",
    header: "Company Name",
    render: (job: ApplicationsType) => (
      <Link href={``} className="flex items-center gap-2">
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={job.job.company.avatar}
          width={200}
          height={200}
          alt={job.job.company.name}
        />
        <div>
          <h2 className="text-sm">{job.job.company.name}</h2>
        </div>
      </Link>
    ),
  },
  {
    key: "title",
    header: "Job title",
    render: (job: ApplicationsType) => (
      <span className="text-sm">{job.job.title}</span>
    ),
  },

  {
    key: "date",
    header: "Date",
    render: (job: ApplicationsType) => {
      const formattedDate = new Date(job.updated_at).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      );

      return <span className="text-sm">{formattedDate}</span>;
    },
  },
  {
    key: "status",
    header: "Status",
    render: (job: ApplicationsType) => {
      const status = job.status;

      const statusStyles: Record<string, string> = {
        Review: "bg-yellow-100 text-yellow-800",
        Viewed: "bg-blue-100 text-blue-800",
        Shortlisted: "bg-purple-100 text-purple-800",
        Interviewed: "bg-indigo-100 text-indigo-800",
        Accepted: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
        Withdrawn: "bg-gray-200 text-gray-700",
      };

      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            statusStyles[status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    key: "action",
    header: "Action",
    render: () => (
      <CellOptions
        item={undefined}
        options={[
          {
            label: "View",
            icon: <Eye className="h-4 w-4" />, // optional icon
            action: (item) => console.log("Viewing", item),
          },
          {
            label: "Delete",
            icon: <Trash className="h-4 w-4 text-red-500" />,
            action: (item) => console.log("Deleting", item),
          },
        ]}
      />
    ),
  },
];

export default function SingleStudentOverview({ params }: SingleUserProps) {
  const slug = params.slug;
  const { data: users, setData } =
    useFetch<PaginatedResponse<UserProfile>>(API_GET_SEEKERS);
  const Seeker = users?.data.find((seeker) => seeker.id === slug);
  const { data: jobs, loading } = useFetch<PaginatedResponse<ApplicationsType>>(
    `${API_GET_JOB_APPLICATIONS}?seekerId=${Seeker?.id}`,
  );
  const [activeTab, setActiveTab] = useState("seeker-overview");
  const [copied, setCopied] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [showProfileLink, setShowProfileLink] = useState(false);
  const [availability, setAvailability] = useState(true);

  const profileLink = "modicean.net/mail/blog/LTPSBacios";

  const handleViewCV = () => {
    setCvModalOpen(true);
    console.log("Viewing CV...");
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/path/to/CVjake Medical.pdf";
    link.download = "CVjake Medical.pdf";
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!Seeker) return <NotFoundPage />;
  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("seeker-overview")}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition ${
            activeTab === "seeker-overview"
              ? "bg-primary text-white"
              : "text-secondary"
          }`}
        >
          <View size={15} />
          Job Seeker Overview
        </button>
        <button
          onClick={() => setActiveTab("job-applications")}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition ${
            activeTab === "job-applications"
              ? "bg-primary text-white"
              : "text-secondary"
          }`}
        >
          <ListOrdered size={15} />
          Job Applications
        </button>
        <button
          onClick={() => setActiveTab("user-activity")}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition ${
            activeTab === "user-activity"
              ? "bg-primary text-white"
              : "text-secondary"
          }`}
        >
          <ListOrdered size={15} />
          User Activity
        </button>
      </div>

      <div className="relative mb-4 flex justify-between rounded-lg border bg-white p-4 shadow-sm">
        {/* Student Details */}
        <div className="flex w-full flex-col items-center gap-6 lg:flex-row">
          <Image
            className="h-[250px] max-w-[250px] rounded-xl object-cover lg:h-[120px] lg:w-[150px]"
            src={Seeker.avatar ?? "/images/avatar-placeholder.png"}
            alt="Seeker image"
            width={300}
            height={300}
          />
          <div className="flex-1">
            <div className="mb-4 flex flex-col items-center justify-between gap-3 lg:flex-row">
              <div>
                <div className="mb-4 flex flex-col items-center gap-3 lg:flex-row">
                  <h1 className="max-w-[400px] text-xl font-bold">
                    {Seeker.firstName} {Seeker.lastName}
                  </h1>
                  {/* {Seeker?.isVerified && (
                    <span className="rounded-full bg-primary px-2 py-1 text-xs capitalize text-white">
                      {Seeker.type}
                    </span>
                  )} */}
                </div>
                <div>
                  <span className="text-sm text-secondary">
                    {Seeker.careerLevel}
                  </span>
                </div>
              </div>
              <div className="flex h-full items-start justify-end gap-3">
                <Link
                  className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                  href={"#"}
                >
                  <SquarePen size={12} />
                  Edit
                </Link>
                <Link
                  className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                  href={`/admin/students/profile/${Seeker.id}`}
                >
                  <Eye size={12} />
                  View Profile
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row">
              {Seeker.country && (
                <div className="flex flex-col text-center md:text-start">
                  <span className="text-sm text-secondary">Country</span>
                  <span className="text-sm font-semibold text-main">
                    {Seeker.country?.name}
                  </span>
                </div>
              )}
              {Seeker.birthDate && (
                <div className="flex flex-col text-center md:text-start">
                  <span className="text-sm text-secondary">Age</span>
                  <span className="text-sm font-semibold text-main">
                    {Seeker.birthDate} Years
                  </span>
                </div>
              )}
              <div className="flex flex-col text-center md:text-start">
                <span className="text-sm text-secondary">Education</span>
                <span className="text-sm font-semibold text-main">
                  education
                </span>
              </div>
              {Seeker.created_at && (
                <div className="flex flex-col text-center md:text-start">
                  <span className="text-sm text-secondary">Join Date</span>
                  <span className="text-sm font-semibold text-main">
                    {Seeker.created_at}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#E4F8FFE5] text-[#55BEE6]">
            <UsersRound size={20} />
          </div>
          <div>
            <span className="block text-sm">Jobs Applided</span>
            <h1 className="font-bold">1,245</h1>
            <span className="block text-xs text-primary">
              +12% from last month
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#DCFCE7] text-[#008236]">
            <Bookmark size={20} />
          </div>
          <div>
            <span className="block text-sm">Saved Jobs</span>
            <h1 className="font-bold">450</h1>
            <span className="block text-xs text-primary">
              +8% from last month
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#F3E8FF] text-[#AD46FF]">
            <CircleCheck size={20} />
          </div>
          <div>
            <span className="block text-sm">Profile Completeness</span>
            <h1 className="font-bold">%75</h1>
            <span className="block text-xs text-primary">
              +15% from last month
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="lg:col-span-5">
          {activeTab === "seeker-overview" && (
            <div className="rounded-xl border p-4 shadow-sm">
              <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <h2 className="text-xl font-semibold">
                  Recent Jobs Applications
                </h2>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 rounded-xl border border-primary px-4 py-2 text-sm text-primary transition hover:bg-primary hover:text-white">
                    <Forward size={17} />
                    Invite to apply
                  </button>
                  <button className="flex items-center gap-1 rounded-xl border bg-primary px-4 py-2 text-sm text-white transition hover:bg-green-700">
                    <Plus size={17} />
                    Add as recommended
                  </button>
                </div>
              </div>
              <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {jobs?.data.map((app) => {
                  return (
                    <div
                      className="rounded-xl border p-3 shadow-sm"
                      key={app.id}
                    >
                      <h2 className="mb-3 text-lg font-semibold">
                        {app.job.title}
                      </h2>
                      <div className="mb-4 flex gap-3">
                        <Image
                          className="h-14 w-14 rounded-lg"
                          src={app.job.company.avatar}
                          alt={app.job.company.name}
                          width={100}
                          height={100}
                        />
                        <div>
                          <p className="mb-1 flex items-center gap-2 text-xs text-secondary">
                            <MapPin className="text-light-primary" size={16} />
                            Saudi Arabia, Geddah
                          </p>
                          <p className="flex items-center gap-2 text-xs text-secondary">
                            <GraduationCap
                              className="text-light-primary"
                              size={16}
                            />
                            Saudi Arabia, Geddah
                          </p>
                        </div>
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-secondary">
                          <span>&#9679;</span> EX (5-7)
                        </div>
                        <div className="flex items-center gap-1 text-xs text-secondary">
                          <span>&#9679;</span> Age (40-45)
                        </div>
                      </div>
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-xs text-red-600">
                          <span>&#9679;</span>{" "}
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                            Urgently hirining
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-secondary">
                          <Clock className="text-light-primary" size={15} /> 2 h
                        </div>
                      </div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <Link
                          className="text-xs text-light-primary underline"
                          href={"#"}
                        >
                          #Healthcare
                        </Link>
                        <Link
                          className="text-xs text-light-primary underline"
                          href={"#"}
                        >
                          #Healthcare
                        </Link>
                        <Link
                          className="text-xs text-light-primary underline"
                          href={"#"}
                        >
                          #Healthcare
                        </Link>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href={``}
                          className="rounded-full bg-primary px-3 py-1 text-sm text-white transition hover:bg-green-700"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {activeTab === "job-applications" && (
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <h2 className="text-xl font-semibold">
                  Recent Jobs Applications
                </h2>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 rounded-xl border border-primary px-4 py-2 text-sm text-primary transition hover:bg-primary hover:text-white">
                    <Forward size={17} />
                    Invite to apply
                  </button>
                  <button className="flex items-center gap-1 rounded-xl border bg-primary px-4 py-2 text-sm text-white transition hover:bg-green-700">
                    <Plus size={17} />
                    Add as recommended
                  </button>
                </div>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <DynamicTable<ApplicationsType>
                  columns={columns}
                  data={jobs?.data || []}
                  minWidth={500}
                />
              )}
            </div>
          )}
          {activeTab === "user-activity" && ""}
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div>
            {" "}
            {/* Public Profile Card */}
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">
                      Your Public Profile
                    </h1>
                  </div>
                </div>

                {/* Profile Link Section with Toggle */}
                <div className="overflow-hidden">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Profile Link Visibility
                      </p>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={showProfileLink}
                          onChange={() => setShowProfileLink(!showProfileLink)}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    </div>

                    {showProfileLink && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 overflow-hidden rounded-md bg-gray-100 p-3">
                          <p className="truncate font-mono text-blue-600">
                            {profileLink}
                          </p>
                        </div>
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-1 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-300"
                        >
                          {copied ? (
                            <>
                              <Check size={16} /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={16} /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="mb-1 text-sm text-gray-600">
                          Immediate Availability
                        </p>
                        <p className="text-xs text-gray-500">
                          Let companies know you can start immediately
                        </p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={availability}
                          onChange={() => setAvailability(!availability)}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    </div>

                    {availability && (
                      <div className="mt-3 flex items-start rounded-md border border-green-200 bg-green-50 p-3">
                        <Check className="mt-0.5 flex-shrink-0 text-green-500" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Available for immediate start
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Your profile will show youre available to companies
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* CV Section */}
                <div className="overflow-hidden">
                  <div>
                    <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <File
                            size={17}
                            className="flex-shrink-0 text-blue-500"
                          />
                          <div className="ml-3 overflow-hidden">
                            <p className="truncate text-sm font-medium text-blue-800">
                              {cvFile.name}
                            </p>
                            {cvFile.size && (
                              <p className="text-xs text-gray-500">
                                {cvFile.size} •{" "}
                                {cvFile.uploadDate || "Uploaded"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleViewCV}
                            className="rounded-md p-1 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
                            title="View CV"
                          >
                            <FileType size={15} />
                          </button>
                          <button
                            onClick={handleDownloadCV}
                            className="rounded-md p-1 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
                            title="Download CV"
                          >
                            <Download size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CV Modal */}
          {cvModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="mx-4 w-full max-w-2xl rounded-lg bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Viewing CV</h3>
                  <button
                    onClick={() => setCvModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
                <div className="flex h-96 items-center justify-center bg-gray-100">
                  <p>PDF viewer would go here</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setCvModalOpen(false)}
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="p-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex w-full items-center px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-50"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
