"use server";
import { API_CREATE_JOB_APPLICATION } from "@/api/seeker";
import { Result } from "@/types";
import { JobApplicationData } from "@/types/seeker";

export const applyForJob = async (
  applicationData: Partial<JobApplicationData>,
): Promise<Result> => {
  try {
    const response = await fetch(API_CREATE_JOB_APPLICATION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(applicationData),
    });
    console.log("🚀 ~ applyForJob response:", response);

    if (response.ok) {
      const data = await response.json();
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
export const getApplicationsBySeekerId = async (
  seekerId: string,
): Promise<Result<{ data: JobApplicationData[]; total: number }>> => {
  try {
    const response = await fetch(
      `${API_CREATE_JOB_APPLICATION}?seekerId=${seekerId}`,
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

export const getApplicationsByJobId = async (
  jobId: string,
): Promise<Result<{ data: JobApplicationData[]; total: number }>> => {
  try {
    const response = await fetch(
      `${API_CREATE_JOB_APPLICATION}?jobId=${jobId}`,
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

export const getApplicationsByCompanyId = async (
  companyId: string,
): Promise<Result<JobApplicationData[]>> => {
  try {
    const response = await fetch(
      `${API_CREATE_JOB_APPLICATION}?companyId=${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      },
    );
    console.log("🚀getApplicationsByCompanyId ~ response:", response);

    if (response.ok) {
      const data = await response.json();
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
