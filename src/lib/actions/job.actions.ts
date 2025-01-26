"use server";
import { TAGS } from "@/api";
import {
  API_CREATE_JOB,
  API_DELETE_JOB,
  API_GET_JOB_BY_ID,
  API_GET_JOBS,
  API_UPDATE_JOB,
} from "@/api/employer";
import { JobData, Result } from "@/types";
import { revalidateTag } from "next/cache";

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
      revalidateTag(TAGS.jobs);
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
export const updateJob = async (jobData: JobData): Promise<Result<JobData>> => {
  try {
    const response = await fetch(API_UPDATE_JOB + jobData.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(jobData),
    });
    if (response.ok) {
      const data = await response.json();
      revalidateTag(TAGS.jobs);
      return {
        success: true,
        message: "Job updated successfully",
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
export const deleteJob = async (jobId: string): Promise<Result<null>> => {
  try {
    const response = await fetch(API_DELETE_JOB + jobId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", 
        accept: "application/json",
      },
    });
    if (response.ok) {
      revalidateTag(TAGS.jobs);
      return {
        success: true,
        message: "Job deleted successfully",
        data: null,
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
      `${API_GET_JOBS}?page=${page}&limit=${limit}&companyIds=${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        next: { tags: [TAGS.jobs] },
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
      next: { tags: [TAGS.jobs] },
    });
    if (response.ok) {
      const data: JobData = await response.json();
      data.companyId = data.company?.id || null;
      data.jobCategoryId = data.jobCategory?.id || null;
      data.jobCategoryName = data.jobCategory?.name || null;
      data.jobIndustryId = data.jobIndustry?.id || null;
      data.jobIndustryName = data.jobIndustry?.name || null;
      data.jobSpecialityId = data.jobSpeciality?.id || null;
      data.jobSpecialityName = data.jobSpeciality?.name || null;
      data.jobCareerLevelId = data.jobCareerLevel?.id || null;
      data.jobCareerLevelName = data.jobCareerLevel?.name || null;
      data.jobEmploymentTypeId = data.jobEmploymentType?.id || null;
      data.jobEmploymentTypeName = data.jobEmploymentType?.name || null;
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
