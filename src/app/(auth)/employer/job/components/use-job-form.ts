import { INITIAL_JOB_DATA } from "@/constants/jobs/post-job";
import { JobData, NotificationType } from "@/types";
import React from "react";

export const useJobForm = (initialJob?: JobData) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [jobData, setJobData] = React.useState(initialJob || INITIAL_JOB_DATA);
  const [loading, setLoading] = React.useState(false);
  const [draftLoading, setDraftLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [notification, setNotification] =
    React.useState<NotificationType | null>(null);

  return {
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
  };
};
