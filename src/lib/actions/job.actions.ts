"use server";
import {
  API_CREATE_JOB,
  API_GET_JOB_BY_ID,
  API_GET_JOBS,
} from "@/api/employer";
import { JobData, Result } from "@/types";

export const createJob = async (jobData: JobData): Promise<Result<JobData>> => {
  try {
    const response = await fetch(API_CREATE_JOB, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(jobData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("🚀 ~ createJob ~ data:", data);
      return {
        success: true,
        message: "Job created successfully",
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

export const getJobsByCompanyId = async (
  companyId: string,
  page: number = 1,
  limit: number = 10,
): Promise<Result<{ data: JobData[]; total: number }>> => {
  try {
    const response = await fetch(
      `${API_GET_JOBS}?page=${page}&limit=${limit}&companyId=${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: "Jobs list fetched successfully",
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
export const getJobById = async (jobId: string): Promise<Result<JobData>> => {
  try {
    const response = await fetch(API_GET_JOB_BY_ID + jobId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    if (response.ok) {
      const data: JobData = await response.json();
      data.companyId = data.company?.id || "";
      data.jobCategoryName = data.jobCategory?.name || "";
      data.jobIndustryName = data.jobIndustry?.name || "";
      data.jobSpecialityName = data.jobSpeciality?.name || "";
      data.jobCareerLevelName = data.jobCareerLevel?.name || "";
      data.jobEmploymentTypeName = data.jobEmploymentType?.name || "";
      console.log("🚀 ~ getJobById ~ data:", data);
      return {
        success: true,
        message: "Job fetched successfully",
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
