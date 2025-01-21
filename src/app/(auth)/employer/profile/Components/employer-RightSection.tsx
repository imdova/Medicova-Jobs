import React from "react";
import { Box, IconButton, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import post from "@/components/images/post.svg";
import { Edit, Instagram, Language, LinkedIn, LinkOutlined, Twitter } from "@mui/icons-material";

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
        <Button
          component={Link}
          href="/employer/job/posted"
          variant="contained"
        >
          Post a job for free
        </Button>
      </div>
    </div>
  );
};

type Props = {
  data?: { [key: string]: string }; // Optional prop
};

const socialMediaIcons: { [key: string]: JSX.Element } = {
  instagram: <Instagram sx={{ color: "rgba(241, 9, 234, 1)" }} />,
  twitter: <Twitter sx={{ color: "rgba(91, 146, 250, 1)" }} />,
  linkedin: <LinkedIn sx={{ color: "rgba(0, 119, 181, 1)" }} />,
  website: <Language sx={{ color: "rgba(46, 174, 125, 1)" }} />,
};

export const EmployerSocialMedia: React.FC<Props> = ({ data = {} }) => {
  // If the data object is empty or undefined
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="relative mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 className="mb-2 text-2xl font-semibold text-main">
            Social Links
          </h6>
          <IconButton className="rounded border border-solid border-gray-300 p-2">
            <Edit />
          </IconButton>
        </Box>
        <p className="text-gray-500">No social media links provided.</p>
      </div>
    );
  }

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
        {Object.entries(data).map(([key, link]) => (
          <Link href={link} key={key} target="_blank" rel="noopener noreferrer">
            {socialMediaIcons[key.toLowerCase()] || (
              <LinkOutlined sx={{ color: "rgba(128, 128, 128, 1)" }} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
