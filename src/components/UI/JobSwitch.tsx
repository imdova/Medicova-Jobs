import React from "react";
import { Switch } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { updateCompanyJob, updateJobOptimistic } from "@/store/slices/jobSlice";
import { JobData } from "@/types";

interface JobSwitchProps {
  job: JobData;
}

const JobSwitch: React.FC<JobSwitchProps> = ({ job }) => {
  const dispatch = useAppDispatch();
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked;
    if (job.id) {
      dispatch(updateJobOptimistic({ id: job.id, active: status }));
      dispatch(updateCompanyJob({ id: job.id, active: status }));
    }
  };

  return <Switch checked={job.active ? true : false} onChange={handleToggle} />;
};

export default JobSwitch;
