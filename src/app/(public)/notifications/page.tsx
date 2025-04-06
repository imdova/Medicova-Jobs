"use client";
import NotificationCard from "@/components/UI/NotificationCard";
import { notifications } from "@/constants";
import { Settings } from "@mui/icons-material";
import { Button, IconButton, Tab, Tabs } from "@mui/material";
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
    <div className="w-full px-4 md:px-5">
      <div className="flex items-center  justify-between rounded-[10px] border border-gray-200 bg-white p-4 px-6 shadow-soft">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <Button
          variant="text"
          className="text-sm text-secondary hover:underline"
        >
          Mark All As Read
        </Button>
      </div>

      <div className="mt-4 grid grid-flow-row rounded-[10px] border border-gray-200 bg-white shadow-soft">
        <div className="flex items-center justify-between gap-3 overflow-hidden border-b border-gray-200 p-3 px-5">
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
  );
};

export default NotificationsPage;
