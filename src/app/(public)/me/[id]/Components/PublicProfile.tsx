import React from "react";
import { Typography, Grid, Card, Box, Switch, IconButton } from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const PublicProfile: React.FC = () => {
  return (
    <div className="mb-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      {/* Title and Description */}
      <h3 className="mb-2 text-xl font-semibold text-main">Your Public Profile</h3>

      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold text-main">
          Public Profile
        </label>
        <Switch color="primary" defaultChecked />
      </div>
      <div className="my-1 flex items-center justify-between rounded-base bg-primary-100 p-2 py-3">
        <div>
          <p className="text-sm text-secondary">
            Here is your public profile link:
          </p>
          <Link href="#" className="text-sm text-primary underline">
            www.medicova.net/me/2
          </Link>
        </div>
        <IconButton className="rounded border border-solid border-gray-300 p-2">
          <EditIcon />
        </IconButton>
      </div>
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold text-main">
          Profile Visibility
        </label>
        <Switch color="primary" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold text-main">
          Available for immediate start
        </label>
        <Switch color="primary" />
      </div>

      {/* Centered Typography with Background */}
      <p className="mt-1 rounded-base bg-primary-100 p-2 text-sm text-secondary">
        Let companies know you can start immediately by adding the Immediate
        start badge to your profile
      </p>
    </div>
  );
};

export default PublicProfile;
