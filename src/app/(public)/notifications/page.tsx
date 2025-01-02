"use client";
import VerticalTabs from "@/components/Layout/SideBar/vertical-tabs";
import { getFullLastEdit } from "@/util";
import {
  Book,
  Build,
  CheckCircleOutline,
  Edit,
  MoreVert,
  Search,
  Settings,
} from "@mui/icons-material";
import { Button, IconButton, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import React from "react";

const navItems = [
  {
    title: "All",
  },
  {
    title: "Job",
    number: 3,
  },
  {
    title: "Applications",
    number: 6,
  },
  {
    title: "Messages",
  },
  {
    title: "Reminders",
  },
];

interface NotificationItem {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: { status: "normal" | "warning" | "error" | "success"; text: string }[];
  timeStamp: Date;
  category: string;
  image: string;
}
const now = new Date();
const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
const twentyHoursAgo = new Date(now.getTime() - 20 * 60 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
const november11th2024 = new Date(Date.UTC(2024, 10, 11, 0, 0, 0));

const notifications: NotificationItem[] = [
  {
    title: "5 New Job Matches Found for 'Registered Nurse.'",
    description:
      "We found 5 jobs matching your preferences, including positions at ABC Healthcare and DEF Medical Center.",
    tags: [
      { status: "normal", text: "New" },
      { status: "normal", text: "Full-Time" },
      { status: "normal", text: "Remote" },
    ],
    timeStamp: now,
    category: "Job Recommendations",
    icon: Search,
    image:
      "https://www.gravatar.com/avatar/fd2db016ceeecd9303e31266a502d7ab?s=128&d=identicon&r=PG",
  },
  {
    title: "Application Submitted to XYZ Hospital.",
    description:
      "Your application for the Nurse position at XYZ Hospital has been successfully submitted. Click to view details.",
    tags: [
      { status: "success", text: "Pending" },
      { status: "normal", text: "Full-Time" },
    ],
    timeStamp: twoHoursAgo,
    category: "Application Updates",
    icon: CheckCircleOutline,
    image: "https://media.vanguardcommunications.net/Hospital-exterior.jpg",
  },
  {
    title: "ABC Healthcare Viewed Your Profile.",
    description:
      "An employer has viewed your profile. Make sure your profile is complete to increase your chances.",
    tags: [{ status: "warning", text: "Urgent" }],
    timeStamp: twentyHoursAgo,
    category: "Profile Updates",
    icon: Edit,
    image: "https://media.vanguardcommunications.net/Hospital-exterior.jpg",
  },
  {
    title: "Your Profile is 80% Complete.",
    description:
      "Add your certifications to increase your visibility to healthcare employers.",
    tags: [
      { status: "error", text: "Profile" },
      { status: "normal", text: "Action Required" },
    ],
    timeStamp: twoDaysAgo,
    category: "Reminders",
    icon: Build,
    image: "https://media.vanguardcommunications.net/Hospital-exterior.jpg",
  },
  {
    title: "3 Steps to Improve Your Resume.",
    description:
      "Follow these steps to make your resume stand out to healthcare employers.",
    tags: [
      { status: "normal", text: "Tip" },
      { status: "normal", text: "Resource" },
    ],
    timeStamp: november11th2024,
    category: "Tips & Resources",
    icon: Book,
    image:
      "https://i.iheart.com/v3/re/new_assets/66844a33690c77c14847c03c?ops=contain(1480,0)",
  },
];

const NotificationsPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
        <div className="flex items-center justify-between rounded-[10px] border border-gray-100 bg-white p-4 px-6 shadow-lg">
          <h1 className="text-xl font-semibold">Notifications</h1>
          <Button
            variant="text"
            className="text-sm text-secondary hover:underline"
          >
            Mark All As Read
          </Button>
        </div>

        <div className="mt-4 grid grid-flow-row rounded-[10px] border border-gray-100 bg-white px-2 shadow-lg">
          <div className="flex items-center justify-between gap-3 overflow-hidden border-b border-gray-100 p-3">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons={false}
              className="text-base"
            >
              {navItems.map((item, index) => (
                <Tab
                  key={index}
                  label={
                    <p className="text-sm">
                      {item.title}
                      {item.number && (
                        <span className="ml-2 inline-block h-4 w-4 rounded-3xl bg-light-primary text-xs text-white">
                          {item.number}
                        </span>
                      )}
                    </p>
                  }
                />
              ))}
              <span className="mx-4 block h-10 w-1 self-center border-l border-gray-300"></span>
              <Tab label={<p className="text-gray-400">Archive</p>} />
            </Tabs>
            <IconButton size="medium">
              <Settings />
            </IconButton>
          </div>
          {notifications.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex justify-between gap-3 border-b border-gray-100 p-3"
              >
                <div className="grid grid-cols-1 grid-rows-1">
                  <Image
                    src={item.image}
                    alt="image"
                    width={60}
                    height={60}
                    className="col-start-1 row-start-1 h-[60px] w-[60px] rounded-full border object-cover"
                  />
                  <div className="col-start-1 row-start-1 flex justify-end">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-light-primary p-1 text-white">
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h6 className="font-medium text-main">{item.title}</h6>
                  <p className="max-w-[700px] text-sm text-secondary">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`rounded px-2 py-1 text-xs text-gray-500 ${tag.status === "normal" ? "bg-gray-100" : tag.status === "error" ? "bg-red-100" : tag.status === "warning" ? "bg-yellow-100" : "bg-green-100"}`}
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {" "}
                    {getFullLastEdit(item.timeStamp)}
                  </p>
                </div>
                <div>
                  <IconButton size="medium">
                    <MoreVert className="h-6 w-6" />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
