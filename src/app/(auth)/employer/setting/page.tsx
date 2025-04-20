"use client";
import React, { useState } from "react";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { User } from "next-auth";
import UsersTab from "@/components/settings/usersTab";
import UpdateEmail from "@/components/settings/UpdateEmail";
import UpdatePassword from "@/components/settings/UpdatePassword";

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user as User;
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (status === "loading") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CircularProgress />
        <h6 className="ml-4">Loading...</h6>
      </div>
    );
  }
  if (status === "unauthenticated") return notFound();

  return (
    <div className="px-2 md:px-5">
      <Tabs
        className="mb-2 rounded-base border border-gray-200 bg-white px-4 shadow-soft"
        value={tabValue}
        onChange={handleTabChange}
      >
        <Tab label="Login Details" />
        <Tab label="Users" />
      </Tabs>

      {/* Tab Panels */}
      {tabValue === 0 && (
        <div>
          <UpdateEmail user={user} />
          <UpdatePassword user={user} />
        </div>
      )}
      {tabValue === 1 && <UsersTab user={user} />}
    </div>
  );
};

export default SettingsPage;
