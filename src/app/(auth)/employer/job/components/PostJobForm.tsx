"use client";
import React, { act } from "react";
import { useSession } from "next-auth/react";
import { Stepper, Step, StepLabel, Alert, Snackbar } from "@mui/material";
import { JobData, NotificationType, Industry, EmploymentType } from "@/types";
// Components
import JobDetailsStep from "./steps/JobDetailsStep";
import ScreeningQuestionsStep from "./steps/ScreeningQuestionsStep";
import ReviewPublishStep from "./steps/ReviewPublishStep";
import { INITIAL_JOB_DATA } from "@/constants/jobs/post-job";
import { API_CREATE_JOB } from "@/api/employer";
import { TAGS } from "@/api";
import useUpdateApi from "@/hooks/useUpdateApi";
import useIsLeaving from "@/hooks/useIsLeaving";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import { useRouter } from "next/navigation";

// Constants
const FORM_STEPS = [
  "Job Details",
  "Screening Questions (Optional)",
  "Review & Publish",
] as const;

interface PostJobFormProps {
  job?: JobData;
  industries: Industry[];
  employmentTypes: EmploymentType[];
}

const PostJobForm: React.FC<PostJobFormProps> = ({
  job,
  industries,
  employmentTypes,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const companyId = user?.companyId || "";
  const companyEmail = user?.companyEmail || "";
  const [activeStep, setActiveStep] = React.useState(0);
  const [jobData, setJobData] = React.useState(job || INITIAL_JOB_DATA);
  const [notification, setNotification] =
    React.useState<NotificationType | null>(null);
  const [isDirty, setIsDirty] = React.useState(false);
  const { isLeaving, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });
  const handleNavigation = {
    next: () =>
      setActiveStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1)),
    back: (data?: Partial<JobData>) => {
      data && setJobData({ ...jobData, ...data, companyId });
      setActiveStep((prev) => Math.max(prev - 1, 0));
    },
  };

  const { isLoading, error, update } = useUpdateApi<JobData>(handleSuccess);
  const {
    isLoading: draftLoading,
    error: draftingError,
    update: draft,
    reset: resetDraftError,
  } = useUpdateApi<JobData>();

  const createJob = async () => {
    const body = { ...jobData, companyId, draft: false, active: true };
    await update(API_CREATE_JOB, { method: "POST", body }, TAGS.jobs);
  };
  const updateJob = async () => {
    const body = { ...jobData, draft: false, active: true };
    await update(API_CREATE_JOB, { body }, TAGS.jobs);
  };
  const draftJob = async (body: Partial<JobData>, preventDefault: boolean) => {
    body.country =
      body.country?.name && body.country?.code ? body.country : null;
    body.city = body.city ? body.city : null;
    if (body.id) {
      const data = await draft(API_CREATE_JOB, { body }, TAGS.jobs);
      handleDraftSuccess(data, preventDefault);
    } else {
      const data = await draft(
        API_CREATE_JOB,
        { method: "POST", body },
        TAGS.jobs,
      );
      handleDraftSuccess(data, preventDefault);
    }
  };

  async function handleSuccess(newJob: JobData) {
    router.push(`/job/${newJob.id}`);
  }
  async function handleDraftSuccess(newJob: JobData, preventDefault: boolean) {
    if (preventDefault) return;
    setJobData(newJob);
    !jobData.id &&
      router.replace("/employer/job/posted/" + newJob.id, { scroll: false });
    setNotification({
      message: "Your job has been saved to draft",
      severity: "success",
    });
  }

  const handleStepSubmit = {
    jobDetails: (data: JobData, isClean?: boolean) => {
      setIsDirty(!isClean);
      setJobData({ ...jobData, ...data, companyId });
      handleNavigation.next();
    },
    screening: (data: Partial<JobData>) => {
      setIsDirty(true);
      setJobData({ ...jobData, ...data, companyId });
      handleNavigation.next();
    },
    publish: async () => {
      setIsDirty(false);
      if (jobData.id) {
        updateJob();
      } else {
        createJob();
      }
    },
    draft: async (data?: Partial<JobData>, preventDefault: boolean = false) => {
      setIsDirty(false);
      const jobToSave = {
        ...jobData,
        ...data,
        companyId,
        draft: true,
        active: false,
      };
      draftJob(jobToSave, preventDefault);
    },
  };

  return (
    <div className="space-y-4">
      <LeaveConfirmationModal
        isOpen={isLeaving && isDirty}
        additionalButtons={[
          {
            text: "Save Draft",
            onClick: () => {
              handleUserDecision(true);
              handleStepSubmit.draft({}, true);
            },
            color: "warning",
            variant: "contained",
          },
        ]}
        onLeave={() => {
          handleUserDecision(true);
        }}
        onStay={() => {
          handleUserDecision(false);
        }}
      />
      <div className="rounded-base border border-gray-200 bg-white p-4 shadow-soft">
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
            initialJobData={job || INITIAL_JOB_DATA}
            industries={industries}
            employmentTypes={employmentTypes}
            onDraft={handleStepSubmit.draft}
            onSubmit={handleStepSubmit.jobDetails}
            draftLoading={draftLoading}
            isDirty={isDirty}
          />
        )}

        {activeStep === 1 && (
          <ScreeningQuestionsStep
            jobData={{ ...jobData, jobEmail: jobData.jobEmail || companyEmail }}
            onBack={handleNavigation.back}
            onDraft={handleStepSubmit.draft}
            onSubmit={handleStepSubmit.screening}
            draftLoading={draftLoading}
            isDirty={isDirty}
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
            isDirty={isDirty}
          />
        )}
      </div>

      <Snackbar
        open={!!notification || !!draftingError}
        autoHideDuration={6000}
        onClose={() => {
          setNotification(null);
          resetDraftError();
        }}
      >
        <Alert
          onClose={() => {
            setNotification(null);
            resetDraftError();
          }}
          severity={
            notification?.severity || (draftingError ? "error" : "info")
          }
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
