import { createJobApplication } from "@/lib/actions/users.actions";
import { JobData, UserState } from "@/types";
import { ApplicationType } from "@/types/seeker";
import { Button } from "@mui/material";
import React from "react";

type JobApplicationButtonProps = {
  job: JobData;
  user: UserState;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const JobApplicationButton = ({
  job,
  user,
  onSuccess,
  onError,
}: JobApplicationButtonProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (user.id && job.id && job.companyId) {
      const applicationData: ApplicationType = {
        seekerId: user.id,
        jobId: job.id,
        companyId: job.companyId,
      };
      const result = await createJobApplication(applicationData);
      if (result.success) {
        onSuccess?.();
      } else {
        onError?.(result.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className="text-lg font-semibold"
      variant="contained"
    >
      {isLoading ? <>Applying...</> : "Apply Now"}
    </Button>
  );
};

export default JobApplicationButton;
