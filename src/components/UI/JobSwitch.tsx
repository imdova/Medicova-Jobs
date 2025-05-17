import React from "react";
import { Alert, Snackbar, Switch } from "@mui/material";
import { JobData } from "@/types";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_CREATE_JOB } from "@/api/employer";
import { TAGS } from "@/api";

interface JobSwitchProps {
  job: JobData;
}

const JobSwitch: React.FC<JobSwitchProps> = ({ job }) => {
  const { error, update, reset } = useUpdateApi<JobData>();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked;
    if (job.id) {
      const newJob = { id: job.id, active: status }
      update(API_CREATE_JOB, { body: newJob }, TAGS.jobs);
    }
  };


  return <>
    <Switch checked={job.active ? true : false} onChange={handleToggle} />
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={() => reset()}
    >
      <Alert
        onClose={() => reset()}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {error?.message}
      </Alert>
    </Snackbar>
  </>
};

export default JobSwitch;
