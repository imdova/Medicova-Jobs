"use server";
import { API_GET_SEEKERS } from "@/api/seeker";
import { Doctor, Result } from "@/types";

export const applyForJob = async (
  applicationData: Partial<JobApplicationData>,
): Promise<Result> => {
  try {
    const response = await fetch("API_CREATE_JOB_APPLICATION", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(applicationData),
    });
    if (response.ok) {
      const data = await response.json();
      data.jobId = data.job.id;
      data.seekerId = data.seeker.id;
      return {
        success: true,
        message: "Job application created successfully",
        data: data,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "An error occurred",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};

export const getApplications = async ({
  page = 1,
  limit = 10,
  jobId,
  seekerId,
  companyId,
  startDate,
}: ApplicationsFilter = {}): Promise<
  Result<{ data: JobApplicationData[]; total: number }>
> => {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page.toString());
    if (limit) queryParams.append("limit", limit.toString());
    if (jobId) queryParams.append("jobId", jobId);
    if (seekerId) queryParams.append("seekerId", seekerId);
    if (companyId) queryParams.append("companyId", companyId);
    if (startDate) queryParams.append("startDate", startDate);
    const response = await fetch(
      `${"API_CREATE_JOB_APPLICATION"}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      },
    );
    if (response.ok) {
      const data = await response.json();
      data.data.forEach((application: any) => {
        application.jobId = application.job.id;
        application.seekerId = application.seeker.id;
      });
      return {
        success: true,
        message: "Job applications fetched successfully",
        data: data,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "An error occurred",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};
export const getSeekers = async ({
  page = 1,
  limit = 10,
}: ApplicationsFilter = {}): Promise<
  Result<{ data: CandidateType[]; total: number }>
> => {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page.toString());
    if (limit) queryParams.append("limit", limit.toString());
    const response = await fetch(
      `${API_GET_SEEKERS}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      },
    );
    if (response.ok) {
      const data = await response.json();

      return { 
        success: true,
        message: "Seekers fetched successfully",
        data: data,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "An error occurred",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};
