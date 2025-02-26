"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { Stepper, Step, StepLabel, Alert, Snackbar } from "@mui/material";
import { addNewJob, updateJobOptimistic } from "@/store/slices/jobSlice";
// import { createJob, updateJob } from "@/lib/actions/job.actions";
import { convertEmptyStringsToNull } from "@/util";
import { JobData, JobStringData, UserState } from "@/types";

// Components
import JobDetailsStep from "./steps/JobDetailsStep";
import ScreeningQuestionsStep from "./steps/ScreeningQuestionsStep";
import ReviewPublishStep from "./steps/ReviewPublishStep";
import { useJobForm } from "./use-job-form";
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
}

const PostJobForm: React.FC<PostJobFormProps> = ({ job }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const user = session?.user as UserState;
  const companyId = user?.companyId || "";
  const companyEmail = user?.companyEmail || "";

  const {
    activeStep,
    setActiveStep,
    jobData,
    setJobData,
    draftLoading,
    setDraftLoading,
    notification,
    setNotification,
  } = useJobForm(job);

  const handleNavigation = {
    next: () =>
      setActiveStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1)),
    back: (data?: Partial<JobData>) => {
      data && setJobData({ ...jobData, ...data, companyId });
      setActiveStep((prev) => Math.max(prev - 1, 0));
    },
  };

  const { isLoading, error, update } = useUpdateApi<JobData>(handleSuccess);

  const createJob = async (data: Partial<JobData>) => {
    const body: Partial<JobStringData> = transformToJsonStrings(data);
    await update(API_CREATE_JOB, { method: "POST", body }, TAGS.jobs);
  };
  const updateJob = async (data: Partial<JobData>) => {
    const body: Partial<JobStringData> = transformToJsonStrings(data);
    await update(API_CREATE_JOB, { body }, TAGS.jobs);
  };

  async function handleSuccess(newJob: JobData) {
    if (!jobData.id) {
      dispatch(addNewJob(newJob));
      if (newJob.draft) {
        setNotification({
          message: "Your job has been saved to draft",
          severity: "success",
        });
      } else {
        router.push(`/job/${newJob.id}`);
      }
    } else {
      dispatch(updateJobOptimistic(newJob));
      if (newJob.draft) {
        setNotification({
          message: "Your job has been saved to draft",
          severity: "success",
        });
      }
    }
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
      if (jobData.id) {
        updateJob(jobToSave);
      } else {
        createJob(jobToSave);
      }

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
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostJobForm;
