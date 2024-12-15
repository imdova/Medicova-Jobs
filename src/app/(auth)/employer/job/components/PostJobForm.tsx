"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import JobDetailsStep from "./steps/JobDetailsStep";
import ScreeningQuestionsStep from "./steps/ScreeningQuestionsStep";
import ReviewPublishStep from "./steps/ReviewPublishStep";

const steps = [
  "Job Details",
  "Screening Questions(Optional)",
  "Review & Publish",
];

const PostJobForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep !== null && activeStep < steps.length - 1) {
      setActiveStep((prevStep) => (prevStep !== null ? prevStep + 1 : 0));
    }
  };

  const handleBack = () => {
    if (activeStep !== null && activeStep > 0) {
      setActiveStep((prevStep) => (prevStep !== null ? prevStep - 1 : 0));
    }
  };

  if (activeStep === null) {
    // Prevent rendering until `activeStep` is initialized
    return null;
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        margin: "0 auto",
        backgroundColor: "rgba(248, 248, 253, 0.6)",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
          color: "rgba(24, 93, 67, 1)",
        }}
      >
        Post Job Now
      </Typography>

      {/* Progress Indicator using Stepper */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 4,
          "& .MuiStepConnector-line": {
            borderColor: (theme) =>
              activeStep > 0 ? "rgba(46, 174, 125, 1)" : theme.palette.divider,
          },
          "& .MuiStepIcon-root": {
            color: "rgba(0, 0, 0, 0.5)",
          },
          "& .MuiStepIcon-text": {
            fill: "rgba(255, 255, 255, 1)", // Example: White text
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "rgba(24, 93, 67, 1)",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "rgba(24, 93, 67, 1)",
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontWeight: activeStep === index ? "bold" : "normal",
                  color:
                    activeStep === index
                      ? "rgba(24, 93, 67, 1)"
                      : "rgba(81, 91, 111, 1)",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Form Section */}
      <Box component="form" sx={{ display: "grid", gap: 3 }}>
        {activeStep === 0 && <JobDetailsStep />}
        {activeStep === 1 && <ScreeningQuestionsStep />}
        {activeStep === 2 && <ReviewPublishStep />}

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "flex-end" },
            fontSize: "14px",
            gap: 1,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ backgroundColor: "white", px: { sx: 2, md: 6 } }}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button className="px-2 md:px-6 text-sm bg-[#FFAE35] text-[#464748] rounded-none hover:bg-[#e19e39]">
            Save and Publish Later
          </Button>
          <Button
            variant="contained"
            sx={{
              px: { sx: 2, md: 6 },
              backgroundColor: "rgba(46, 174, 125, 1)",
              "&:hover": { backgroundColor: "rgba(36, 144, 103, 1)" },
            }}
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PostJobForm;
