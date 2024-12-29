import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import ResetForm from "./ResetForm";

const user = { email: "alaahassan@gmail.com" };

const Set = () => {
  return (
    <React.Fragment>
      <div className="absolute inset-0 z-[-1] bg-[url('/images/background.png')] bg-cover bg-center opacity-20"></div>
      <Box className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center">
        <Box className="flex w-full max-w-[600px] flex-col items-center justify-center bg-[#f8faff] shadow-md">
          {/* Lock Icon */}
          <Image
            src="/images/reset-password.jpg"
            width={200}
            height={170}
            alt="reset password"
            className="mt-5 object-contain mix-blend-multiply"
          />

          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ marginBottom: 1, color: "#03353C" }}
          >
            Password Reset
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            className="t mb-1 text-center text-lg font-semibold text-black/50"
          >
            We send a Code to{" "}
            <span className="text-light-primary">{user.email}</span>
          </Typography>

          {/* Email Input */}

          <ResetForm />

          <Link
            href="/login"
            replace
            passHref
            className="text-secondary my-4 flex items-center gap-2 hover:underline"
          >
            <ArrowBackIcon
              sx={{
                fontSize: "20px", // Size of the icon
              }}
            />
            <Typography
              component="span"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Back to login
            </Typography>
          </Link>
        </Box>
        {/* Stages */}
        <div className="my-10 flex h-1 w-full max-w-[600px] items-center justify-center gap-5 px-10">
          <div className="h-full flex-1 rounded bg-[#CDD3D1]"></div>
          <div className="bg-light-primary h-full flex-1 rounded"></div>
          <div className="h-full flex-1 rounded bg-[#CDD3D1]"></div>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Set;
