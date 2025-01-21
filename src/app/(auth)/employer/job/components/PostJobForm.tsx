"use client";
import React, { useState } from "react";
import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import JobDetailsStep from "./steps/JobDetailsStep";
import ScreeningQuestionsStep from "./steps/ScreeningQuestionsStep";
import ReviewPublishStep from "./steps/ReviewPublishStep";
import { JobData } from "@/types";

const steps = [
  "Job Details",
  "Screening Questions(Optional)",
  "Review & Publish",
];

const initialJob: JobData = {
  companyId: "",
  title: "",
  jobIndustryId: "",
  jobSpecialityId: "",
  jobCategoryId: "",
  jobCareerLevelId: "",
  jobEmploymentTypeId: "",
  jobWorkPlace: null,
  gender: null,
  minAge: null,
  maxAge: null,
  educationLevel: null,
  country: "",
  city: null,
  maxExpYears: null,
  minExpYears: null,
  hideSalary: true,
  salaryRangeStart: null,
  salaryRangeEnd: null,
  salaryCurrency: null,
  availableVacancies: null,
  description: null,
  requirements: null,
  salaryDetails: null,
  keywords: [],
  skills: [],
  questions: [],
  showCompany: true,
  recieveEmails: true,
  jobEmail: null,
  draft: false,
  active: true,
  closed: false,
  startDateType: null,
  jobSectorId: "",
  validTo: null,
};
const PostJobForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobData, setJobData] = useState(initialJob);
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

  const onFirstStepSubmit = (data: JobData) => {
    const newData = { ...jobData, ...data };
    handleNext();
    setJobData(newData);
    console.log(newData);
  };
  const onSecondStepSubmit = (data: Partial<JobData>) => {
    const newData = { ...jobData, ...data };
    handleNext();
    setJobData(newData);
    console.log(newData);
  };
  const publish = () => {
    console.log(jobData);
  };
  const onDraft = (data?: Partial<JobData>) => {
    const newData = {
      ...jobData,
      ...data,
      draft: true,
    };
    console.log(newData);
  };

  if (activeStep === null) {
    // Prevent rendering until `activeStep` is initialized
    return null;
  }

  return (
    <div className="rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      {/* Header */}
      <Typography
        className="text-main"
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
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
            color: "var(--text-secondary)",
          },
          "& .MuiStepIcon-text": {
            fill: "var(--primary-foreground)", // Example: White text
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "var(--primary)",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "var(--primary)",
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
      <div className="grid gap-3">
        {activeStep === 0 && (
          <JobDetailsStep
            jobData={jobData}
            onDraft={onDraft}
            onSubmit={onFirstStepSubmit}
          />
        )}
        {activeStep === 1 && (
          <ScreeningQuestionsStep
            onBack={handleBack}
            onDraft={onDraft}
            onSubmit={onSecondStepSubmit}
          />
        )}
        {activeStep === 2 && (
          <ReviewPublishStep
            onBack={handleBack}
            jobData={jobData}
            onDraft={handleNext}
            onSubmit={publish}
          />
        )}
      </div>
    </div>
  );
};

export default PostJobForm;
