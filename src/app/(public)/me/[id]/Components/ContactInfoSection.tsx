"use client";
import React, { useEffect } from "react";
import { IconButton, Divider, Button, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { Edit, Email, KeyOutlined, PhoneIphone } from "@mui/icons-material";
import Link from "next/link";
import useUpdateApi from "@/hooks/useUpdateApi";
import { UNLOCKED_SEEKERS } from "@/api/employer";
import { TAGS } from "@/api";

const ContactInfoSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
  companyId?: string | null;
  isLocked: boolean;
}> = ({ user, isMe, companyId, isLocked }) => {
  const { isLoading, error, reset, update } = useUpdateApi();
  const unlock = () => {
    if (companyId) {
      update(
        UNLOCKED_SEEKERS,
        { method: "POST", body: { companyId, seekerId: user.id } },
        TAGS.applicants,
      );
    }
  };

  return (
    <div className="mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold text-main">Contact Info</h3>
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
      {isLocked ? (
        companyId ? (
          <div>
            <p className="my-2 text-secondary">
              Unlock me to see my contact information{" "}
            </p>
            <Button
              startIcon={<KeyOutlined />}
              variant="outlined"
              className="text-nowrap"
              onClick={unlock}
            >
              {isLoading ? "..loading" : "Unlock Now"}
            </Button>
          </div>
        ) : (
          <div>
            <p className="my-2 text-secondary">
              The Data Of this user Is Privater
            </p>
          </div>
        )
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
      <Snackbar open={!!error} autoHideDuration={6000} onClose={reset}>
        <Alert
          onClose={reset}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ContactInfoSection;
