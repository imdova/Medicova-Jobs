"use client";
import React, { useEffect } from "react";
import { IconButton, Divider, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Edit, Email, KeyOutlined, PhoneIphone } from "@mui/icons-material";
import Link from "next/link";

const ContactInfoSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
  isLocked: boolean;
}> = ({ user, isMe, isLocked }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  return (
    <div className="mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">Contact Info</h3>
        {isMe && (
          <Link href="/job-seeker/setting">
            <IconButton
              component="span"
              className="rounded border border-solid border-gray-300 p-2"
            >
              <Edit />
            </IconButton>
          </Link>
        )}
      </div>

      {/* Email Section */}
      {isLocked && !isMe ? (
        <div>
          <p className="my-2 text-secondary">
            Unlock me to see my contact information{" "}
          </p>
          <Button
            startIcon={<KeyOutlined />}
            variant="outlined"
            className="text-nowrap"
            // onClick={unlock}
          >
            Unlock Now
          </Button>
        </div>
      ) : (
        <div>
          {user.email && (
            <p className="my-2 text-secondary">
              <Email className="mr-2 inline-block" color="primary" />
              <span className="font-semibold text-main">Email :</span>{" "}
              {user.email}
            </p>
          )}
          {/* Phone Section */}
          {user.phone && (
            <>
              <Divider sx={{ marginY: 1 }} />
              <p className="my-2 text-secondary">
                <PhoneIphone className="mr-2 inline-block" color="primary" />
                <span className="font-semibold text-main">Phone :</span>
                {user.phone}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default ContactInfoSection;
