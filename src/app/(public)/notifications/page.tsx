"use client";
import VerticalTabs from "@/components/Layout/SideBar/vertical-tabs";
import NotificationCard from "@/components/UI/NotificationCard";
import { notifications } from "@/constants";
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

        <div className="mt-4 grid grid-flow-row rounded-[10px] border border-gray-100 bg-white shadow-lg">
          <div className="flex items-center justify-between gap-3 overflow-hidden border-b border-gray-100 p-3 px-5">
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
              <Tab label={<p className="text-sm text-gray-400">Archive</p>} />
            </Tabs>
            <IconButton size="medium">
              <Settings />
            </IconButton>
          </div>
          {notifications.map((item, index) => (
            <NotificationCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
