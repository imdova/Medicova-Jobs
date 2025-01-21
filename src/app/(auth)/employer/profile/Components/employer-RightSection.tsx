import React from "react";
import { Box, IconButton, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import post from "@/components/images/post.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import { Edit } from "@mui/icons-material";

export const PostYourFirstJob = () => {
  return (
    <div className="relative mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Centered Image */}
        <Image
          src={post}
          alt="Login Cover"
          width={50}
          height={50}
          priority={true}
        />

        {/* Typography below the Image */}
        <p className="mb-2 text-center font-semibold text-secondary">
          To find better candidates, make your job description detailed, use
          relevant keywords, and add screening questions to your job post.
        </p>
      </Box>

      {/* Centered Button */}
      <div className="flex justify-center">
        <Button component={Link} href="/employer/job/posted" variant="contained">
          Post a job for free
        </Button>
      </div>
    </div>
  );
};

export const EmployerSocialMedia: React.FC = () => {
  return (
    <div className="relative mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className="mb-2 text-2xl font-semibold text-main">Social Links</h6>
        <IconButton className="rounded border border-solid border-gray-300 p-2">
          <Edit />
        </IconButton>
      </Box>

      <div className="flex gap-4">
        <Link href="#">
          <InstagramIcon sx={{ color: "rgba(241, 9, 234, 1)" }} />
        </Link>
        <Link href="#">
          <TwitterIcon sx={{ color: "rgba(91, 146, 250, 1)" }} />
        </Link>
        <Link href="#">
          <LanguageIcon sx={{ color: "rgba(46, 174, 125, 1)" }} />
        </Link>
      </div>
    </div>
  );
};
