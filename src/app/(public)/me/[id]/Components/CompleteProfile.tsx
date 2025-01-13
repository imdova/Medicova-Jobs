import React from "react";
import { Typography, Grid, Card, Box, CircularProgress } from "@mui/material";
import Link from "next/link";

const CompleteProfile: React.FC = () => {
  const value = 80;

  // Function to determine color based on value
  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return "var(--primary)";
    if (progress >= 50) return "#ff6600";
    return "#ff0000";
  };

  const progressColor = getProgressColor(value);

  return (
    <div className="mb-5 flex rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
      {/* Title and Description */}
      <div className="flex-1">
        <Link
          href="#"
          className="mb-2 text-2xl font-bold text-primary hover:underline"
        >
          Complete Your Profile!
        </Link>
        <p className="max-w-60 text-secondary">
          You are almost there—lets finish setting things up!
        </p>
      </div>
      {/* Circular Progress with Value */}
      <div className="grid h-[70px] w-[70px] grid-cols-1 grid-rows-1">
        <CircularProgress
          variant="determinate"
          value={value}
          size={70}
          sx={{
            color: progressColor,
          }}
          className="col-start-1 row-start-1"
        />
        <div className="col-start-1 row-start-1 flex items-center justify-center">
          <span className="text-xl font-black text-primary">80%</span>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
