"use client";
import React, { useEffect, useState } from "react";
import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import JobDetailsStep from "./steps/JobDetailsStep";
import ScreeningQuestionsStep from "./steps/ScreeningQuestionsStep";
import ReviewPublishStep from "./steps/ReviewPublishStep";
import { JobData, UserState } from "@/types";
import { useSession } from "next-auth/react";
import { createJob, updateJob } from "@/lib/actions/job.actions";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearCompanyJobs } from "@/store/slices/jobSlice";
import { useFormDirty } from "@/hooks/useFormDirty";
import { usePrompt } from "@/hooks/usePrompt";
import { convertEmptyStringsToNull, hasDataChanged } from "@/util";

const steps = [
  "Job Details",
  "Screening Questions(Optional)",
  "Review & Publish",
];

const initialJob: JobData = {
  companyId: null,
  title: "",
  jobIndustryId: null,
  jobIndustryName: null,
  jobSpecialityId: null,
  jobSpecialityName: null,
  jobCategoryId: null,
  jobCategoryName: null,
  jobCareerLevelId: null,
  jobCareerLevelName: null,
  jobEmploymentTypeId: null,
  jobEmploymentTypeName: null,
  jobWorkPlace: null,
  gender: null,
  minAge: null,
  maxAge: null,
  educationLevel: null,
  country: null,
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
  validTo: null,
};
// const initialJob: JobData = {
//   companyId: "",
//   title: "",
//   jobIndustryId: "",
//   jobSpecialityId: "",
//   jobCategoryId: "",
//   jobCareerLevelId: "",
//   jobEmploymentTypeId: "",
//   jobWorkPlace: null,
//   gender: null,
//   minAge: null,
//   maxAge: null,
//   educationLevel: null,
//   country: "",
//   city: null,
//   maxExpYears: null,
//   minExpYears: null,
//   hideSalary: true,
//   salaryRangeStart: null,
//   salaryRangeEnd: null,
//   salaryCurrency: null,
//   availableVacancies: null,
//   description: null,
//   requirements: null,
//   salaryDetails: null,
//   keywords: [],
//   skills: [],
//   questions: [],
//   showCompany: true,
//   recieveEmails: true,
//   jobEmail: null,
//   draft: false,
//   active: true,
//   closed: false,
//   startDateType: null,
//   jobSectorId: "",
//   validTo: null,
// };
type PostJobFormProps = {
  job?: JobData;
};
const PostJobForm: React.FC<PostJobFormProps> = ({ job }) => {
  const route = useRouter();
  const { data: session } = useSession();
  const user = session?.user as UserState;
  const companyId = user?.companyId || "";

  const dispatch = useAppDispatch();
  const { isDirty, markAsDirty, markAsClean } = useFormDirty();

  const [activeStep, setActiveStep] = useState(0);
  const [jobData, setJobData] = useState(job ? job : initialJob);

  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [error, setError] = useState<string>("");

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
    const newData = { ...jobData, ...data, companyId };
    handleNext();
    setJobData(newData);
    console.log(newData);
  };
  const onSecondStepSubmit = (data: Partial<JobData>) => {
    const newData = { ...jobData, ...data, companyId };
    handleNext();
    setJobData(newData);
    console.log(newData);
  };
  const publish = async () => {
    const newData = {
      ...jobData,
      companyId,
      draft: false,
    };
    setLoading(true);
    if (jobData.id) {
      await handleUpdate(newData);
    } else {
      await handleCreate(newData);
    }
    setLoading(false);
  };

  const onDraft = async (data?: Partial<JobData>) => {
    const newData = {
      ...jobData,
      ...data,
      companyId,
      draft: true,
    };
    setDraftLoading(true);
    if (jobData.id) {
      await handleUpdate(newData);
    } else {
      await handleCreate(newData);
    }
    setDraftLoading(false);
  };
  const handleCreate = async (data: JobData) => {
    const result = await createJob(convertEmptyStringsToNull(data));
    if (result.success && result.data) {
      const job = result.data;
      route.push(`/job/${job.id}`);
      dispatch(clearCompanyJobs());
      markAsClean();
      console.log("Job Created successfully");
    } else {
      setError(result.message);
    }
    return result;
  };
  const handleUpdate = async (data: JobData) => {
    const result = await updateJob(convertEmptyStringsToNull(data));
    if (result.success && result.data) {
      const job = result.data;
      route.push(`/job/${job.id}`);
      dispatch(clearCompanyJobs());
      markAsClean();
      console.log("Job Updated successfully");
    } else {
      setError(result.message);
    }
    return result;
  };

  // Effect to determine if the form data has been modified.
  usePrompt("You have unsaved changes. Leave screen?", isDirty); // Prompts the user if they attempt to leave with unsaved changes.
  useEffect(() => {
    if (job && jobData) {
      if (hasDataChanged(job, jobData)) {
        markAsDirty();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job, jobData]);

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
            draftLoading={draftLoading}
          />
        )}
        {activeStep === 1 && (
          <ScreeningQuestionsStep
            onBack={handleBack}
            onDraft={onDraft}
            onSubmit={onSecondStepSubmit}
            draftLoading={draftLoading}
          />
        )}
        {activeStep === 2 && (
          <ReviewPublishStep
            onBack={handleBack}
            jobData={jobData}
            onDraft={onDraft}
            onSubmit={publish}
            loading={loading}
            draftLoading={draftLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default PostJobForm;
