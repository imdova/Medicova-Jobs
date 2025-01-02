"use client";
import React, { useEffect } from "react";
import { IconButton, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { Edit, Email, PhoneIphone } from "@mui/icons-material";

const ContactInfoSection: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);
  const handleEditProfileClick = () => {
    router.push("/job-seeker/profile");
  };
  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">About Me</h3>
        <IconButton
          className="rounded border border-solid border-gray-300 p-2"
          onClick={handleEditProfileClick}
        >
          <Edit />
        </IconButton>
      </div>

      {/* Email Section */}
      <p className="my-2 text-secondary">
        <Email className="mr-2 inline-block" color="primary" />
        <span className="font-semibold text-main">Email :</span>{" "}
        jakegyll@email.com
      </p>
      <Divider sx={{ marginY: 1 }} />
      {/* Phone Section */}
      <p className="my-2 text-secondary">
        <PhoneIphone className="mr-2 inline-block" color="primary" />
        <span className="font-semibold text-main">Phone :</span> +44 1245 572
        135
      </p>
    </div>
  );
};
export default ContactInfoSection;
