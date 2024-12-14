import { Box, Typography } from "@mui/material";
import Image from "next/image";
import SetForm from "./SetForm";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";

const Set = () => {
  return (
    <React.Fragment>
      <div className="absolute inset-0 bg-[url('/images/background.png')]  bg-cover bg-center opacity-20 z-[-1]"></div>
      {/* Main Content */}
      <Box className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center flex-col">
        <Box className="w-full flex justify-center items-center flex-col bg-[#f8faff]/80 max-w-[600px] shadow-xl">
          {/* Lock Icon */}
          <Image
            src="/images/set-password.jpg"
            width={200}
            height={170}
            alt="set password"
            className="mt-5 mix-blend-multiply object-contain"
          />

          {/* Title */}
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#03353C" }}>
            Set a new password
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{ color: "#00000080", textAlign: "center" }}
          >
            Must be at least 8 character.
          </Typography>

          {/* Email Input */}

          <SetForm />

          <Link
            href="/login"
            passHref
            className="text-[#93D3BD] flex items-center gap-2 mb-4"
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
        <div className="flex gap-5 max-w-[600px] px-10 my-10 justify-center w-full items-center h-1">
          <div className="flex-1 h-full bg-[#CDD3D1] rounded"></div>
          <div className="flex-1 h-full bg-[#CDD3D1] rounded"></div>
          <div className="flex-1 h-full bg-[#2EAE7DBF] rounded"></div>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Set;
