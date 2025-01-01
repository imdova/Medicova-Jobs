"use client";
import VerticalTabs from "@/components/Layout/SideBar/vertical-tabs";
import { MoreVert, WorkOutline } from "@mui/icons-material";
import { Button, IconButton, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import React from "react";

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
        <div className="flex items-center justify-between rounded-[10px] border border-gray-100 bg-white p-4 shadow-lg">
          <h1 className="text-lg font-semibold">Notifications</h1>
          <Button variant="text" className="text-sm">
            Mark All As Read
          </Button>
        </div>

        <div className="mt-4 grid grid-flow-row rounded-[10px] border border-gray-100 bg-white p-4 shadow-lg">
          <div className="flex justify-between gap-3 border-b border-gray-100 p-3">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
              className="text-base"
            >
              <Tab label="All" />
              <Tab
                label={
                  <p>
                    Job{" "}
                    <span className="rounded-3xl bg-primary p-1 px-2 text-white">
                      3
                    </span>
                  </p>
                }
              />
              <Tab
                label={
                  <p>
                    Abdications{" "}
                    <span className="rounded-3xl bg-primary p-1 px-2 text-white">
                      3
                    </span>
                  </p>
                }
              />
              <Tab label="Messages" />
              <Tab label="Reminders" />
              <Tab label="Archive" />
            </Tabs>
          </div>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              className="flex justify-between gap-3 border-b border-gray-100 p-3"
            >
              <div className="grid grid-cols-1 grid-rows-1">
                <Image
                  src="/images/company-logo.jpg"
                  alt="image"
                  width={60}
                  height={60}
                  className="col-start-1 row-start-1 h-[60px] w-[60px] rounded-full border object-cover"
                />
                <div className="col-start-1 row-start-1 flex justify-end">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary p-1 text-white">
                    <WorkOutline className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <h6 className="font-medium text-main">
                  5 New Job Matches Found for &apos;Registered Nurse.&apos;
                </h6>
                <p className="max-w-[700px] text-sm text-secondary">
                  We found 5 jobs matching your preferences, including positions
                  at ABC Healthcare and DEF Medical Center.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-primary-100 px-2 py-1 text-xs text-primary">
                    New
                  </span>
                  <span className="rounded bg-primary-100 px-2 py-1 text-xs text-primary">
                    New
                  </span>
                  <span className="rounded bg-primary-100 px-2 py-1 text-xs text-primary">
                    New
                  </span>
                  <span className="rounded bg-primary-100 px-2 py-1 text-xs text-primary">
                    New
                  </span>
                </div>
                <p className="text-xs text-gray-300"> 3 min ago</p>
              </div>
              <div>
                <IconButton size="medium">
                  <MoreVert className="h-6 w-6" />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
