"use client";
import React, { useState } from "react";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { User } from "next-auth";
import UsersTab from "@/components/settings/usersTab";
import UpdateEmail from "@/components/settings/UpdateEmail";
import UpdatePassword from "@/components/settings/UpdatePassword";
import UpdatePhone from "@/components/settings/UpdatePhone";
import { usePermissions } from "@/hooks/usePermissions";
import RolesTab from "@/components/settings/RolesTab";

type TabValue = "login-details" | "users" | "roles";
const tabs: TabValue[] = ["login-details", "users", "roles"];

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user
  const [tabValue, setTabValue] = useState<TabValue>("login-details");
  const { permissions, roles } = usePermissions(user?.type, user?.companyId || "");
  console.log("permissions ==> ", permissions);
  console.log("roles ==> ", roles);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabValue) => {
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
    <div className="px-2 space-y-2 md:px-5">
      <Tabs
        className="rounded-base border border-gray-200 bg-white px-4 shadow-soft"
        value={tabValue}
        onChange={handleTabChange}
      >
        {tabs.map((tab) => (
          <Tab key={tab} value={tab} label={tab} />
        ))}
      </Tabs>

      {/* Tab Panels */}
      {tabValue === "login-details" && (
        <div>
          <UpdateEmail user={user} />
          <UpdatePhone user={user} />
          <UpdatePassword user={user} />
        </div>
      )}
      {tabValue === "users" && <UsersTab user={user} roles={roles} permissions={permissions} />}
      {tabValue === "roles" && <RolesTab user={user}roles={roles} permissions={permissions} />}
    </div>
  );
};

export default SettingsPage;
