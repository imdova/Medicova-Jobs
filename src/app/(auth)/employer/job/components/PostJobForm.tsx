"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { Stepper, Step, StepLabel, Alert, Snackbar } from "@mui/material";
import { addNewJob, updateJobOptimistic } from "@/store/slices/jobSlice";
// import { createJob, updateJob } from "@/lib/actions/job.actions";
import { JobData, JobStringData, UserState, NotificationType, Industry, EmploymentType } from "@/types";

// Components
import JobDetailsStep from "./steps/JobDetailsStep";
import ScreeningQuestionsStep from "./steps/ScreeningQuestionsStep";
import ReviewPublishStep from "./steps/ReviewPublishStep";
import { INITIAL_JOB_DATA } from "@/constants/jobs/post-job";
import { API_CREATE_JOB } from "@/api/employer";
import { TAGS } from "@/api";
import useUpdateApi from "@/hooks/useUpdateApi";
import { transformToJsonStrings } from "@/util/job/post-job";

// Constants
const FORM_STEPS = [
  "Job Details",
  "Screening Questions (Optional)",
  "Review & Publish",
] as const;

interface PostJobFormProps {
  job?: JobData;
  industries: Industry[]
  employmentTypes: EmploymentType[]
}

const PostJobForm: React.FC<PostJobFormProps> = ({ job, industries, employmentTypes }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as UserState;
  const companyId = user?.companyId || "";
  const companyEmail = user?.companyEmail || "";

  const [activeStep, setActiveStep] = React.useState(0);
  const [jobData, setJobData] = React.useState(job || INITIAL_JOB_DATA);
  const [notification, setNotification] =
    React.useState<NotificationType | null>(null);

  const handleNavigation = {
    next: () =>
      setActiveStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1)),
    back: (data?: Partial<JobData>) => {
      data && setJobData({ ...jobData, ...data, companyId });
      setActiveStep((prev) => Math.max(prev - 1, 0));
    },
  };

  const { isLoading, error, update } = useUpdateApi<JobData>(handleSuccess);
  const { isLoading: draftLoading, error: draftingError, update: draft, reset: resetDraftError } = useUpdateApi<JobData>(handleDraftSuccess);

  const createJob = async (data: Partial<JobData>) => {
    const body: Partial<JobStringData> = transformToJsonStrings(data);
    await update(API_CREATE_JOB, { method: "POST", body }, TAGS.jobs);
  };
  const updateJob = async (data: Partial<JobData>) => {
    const body: Partial<JobStringData> = transformToJsonStrings(data);
    await update(API_CREATE_JOB, { body }, TAGS.jobs);
  };
  const draftJob = async (data: Partial<JobData>) => {
    const body: Partial<JobStringData> = transformToJsonStrings(data);
    if (data.id) {
      await draft(API_CREATE_JOB, { body }, TAGS.jobs);
    } else {
      await draft(API_CREATE_JOB, { method: "POST", body }, TAGS.jobs);
    }
  }

  async function handleSuccess(newJob: JobData) {
    router.push(`/job/${newJob.id}`);
  }
  async function handleDraftSuccess(newJob: JobData) {
    setJobData(newJob)
    setNotification({
      message: "Your job has been saved to draft",
      severity: "success",
    });
  }

  const handleStepSubmit = {
    jobDetails: (data: JobData) => {
      setJobData({ ...jobData, ...data, companyId });
      handleNavigation.next();
    },
    screening: (data: Partial<JobData>) => {
      setJobData({ ...jobData, ...data, companyId });
      handleNavigation.next();
    },
    publish: async () => {
      const jobToSubmit = {
        ...jobData,
        companyId,
        draft: false,
      };
      if (jobData.id) {
        updateJob(jobToSubmit);
      } else {
        createJob(jobToSubmit);
      }
    },
    draft: async (data?: Partial<JobData>) => {
      const jobToSave = {
        ...jobData,
        ...data,
        companyId,
        draft: true,
      };
      draftJob(jobToSave);

    },
  };

  return (
    <div className="space-y-4">
      <div className="rounded-base border border-gray-100 bg-white p-4 shadow-lg">
        <h1 className="text-center text-xl font-semibold tracking-tight text-main focus:outline-none md:text-2xl">
          Post Job Now
        </h1>

        <Stepper activeStep={activeStep} alternativeLabel>
          {FORM_STEPS.map((label) => (
            <Step
              key={label}
              completed={activeStep > FORM_STEPS.indexOf(label)}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="grid gap-3">
        {activeStep === 0 && (
          <JobDetailsStep
            jobData={jobData}
            industries={industries}
            employmentTypes={employmentTypes}
            onDraft={handleStepSubmit.draft}
            onSubmit={handleStepSubmit.jobDetails}
            draftLoading={draftLoading}
          />
        )}

        {activeStep === 1 && (
          <ScreeningQuestionsStep
            jobData={{ ...jobData, jobEmail: jobData.jobEmail || companyEmail }}
            onBack={handleNavigation.back}
            onDraft={handleStepSubmit.draft}
            onSubmit={handleStepSubmit.screening}
            draftLoading={draftLoading}
          />
        )}

        {activeStep === 2 && (
          <ReviewPublishStep
            jobData={jobData}
            onBack={handleNavigation.back}
            onDraft={handleStepSubmit.draft}
            onSubmit={handleStepSubmit.publish}
            loading={isLoading}
            draftLoading={draftLoading}
            error={error?.message || ""}
          />
        )}
      </div>

      <Snackbar
        open={!!notification || !!draftingError}
        autoHideDuration={6000}
        onClose={() => { setNotification(null); resetDraftError() }}
      >
        <Alert
          onClose={() => { setNotification(null); resetDraftError() }}
          severity={(notification?.severity) || (draftingError ? "error" : "info")}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification?.message || draftingError?.message || ""}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostJobForm;
