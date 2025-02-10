"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { Stepper, Step, StepLabel, Alert, Snackbar } from "@mui/material";
import { addNewJob, updateJobOptimistic } from "@/store/slices/jobSlice";
import { createJob, updateJob } from "@/lib/actions/job.actions";
import { convertEmptyStringsToNull } from "@/util";
import { JobData, UserState } from "@/types";

// Components
import JobDetailsStep from "./steps/JobDetailsStep";
import ScreeningQuestionsStep from "./steps/ScreeningQuestionsStep";
import ReviewPublishStep from "./steps/ReviewPublishStep";
import { useJobForm } from "./use-job-form";

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
    loading,
    setLoading,
    draftLoading,
    setDraftLoading,
    error,
    setError,
    notification,
    setNotification,
  } = useJobForm(job);

  const handleNavigation = {
    next: () =>
      setActiveStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1)),
    back: (data?: Partial<JobData>) => {
      console.log("🚀 ~ data:", data?.jobEmail);
      data && setJobData({ ...jobData, ...data, companyId });
      setActiveStep((prev) => Math.max(prev - 1, 0));
    },
  };

  const handleJobCreation = async (
    data: JobData,
    type: "new" | "draft" = "new",
  ) => {
    const result = await createJob(convertEmptyStringsToNull(data));

    if (result.success && result.data) {
      const newJob = result.data;
      dispatch(addNewJob(newJob));

      if (type === "draft") {
        setNotification({
          message: "Your job has been saved to draft",
          severity: "success",
        });
        return router.replace(`/employer/job/posted/${newJob.id}`);
      }
      router.push(`/job/${newJob.id}`);
    } else {
      setError(result.message);
    }
  };

  const handleJobUpdate = async (
    data: JobData,
    type: "new" | "draft" = "new",
  ) => {
    const result = await updateJob(convertEmptyStringsToNull(data));

    if (result.success && result.data) {
      const updatedJob = result.data;
      dispatch(updateJobOptimistic(updatedJob));
      if (type === "draft") {
        setNotification({
          message: "Your job has been saved to draft",
          severity: "success",
        });
        return router.replace(`/employer/job/posted/${updatedJob.id}`);
      }
      router.push(`/job/${updatedJob.id}`);
    } else {
      setError(result.message);
    }
  };

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

      setLoading(true);
      try {
        if (jobData.id) {
          await handleJobUpdate(jobToSubmit);
        } else {
          await handleJobCreation(jobToSubmit);
        }
      } finally {
        setLoading(false);
      }
    },
    draft: async (data?: Partial<JobData>) => {
      const jobToSave = {
        ...jobData,
        ...data,
        companyId,
        draft: true,
      };

      setDraftLoading(true);
      try {
        if (jobData.id) {
          await handleJobUpdate(jobToSave, "draft");
        } else {
          await handleJobCreation(jobToSave, "draft");
        }
      } finally {
        setDraftLoading(false);
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
            loading={loading}
            draftLoading={draftLoading}
            error={error}
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
