"use server";
import { TAGS } from "@/api";
import {
  API_CREATE_JOB,
  API_DELETE_JOB,
  API_GET_JOB_BY_ID,
  API_SEARCH_JOBS,
  API_GET_JOBS_BY_COMPANY_ID,
  API_UPDATE_JOB,
  API_FILTER_SEARCH_JOBS,
} from "@/api/employer";
import { JobData, Result } from "@/types";
import { JobSearchFilter, SearchResult } from "@/types/jobs";
import { toQueryString } from "@/util/general";
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
export const updateJob = async (
  jobData: Partial<JobData>,
): Promise<Result<JobData>> => {
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
): Promise<Result<PaginatedResponse<JobData>>> => {
  try {
    const response = await fetch(
      `${API_GET_JOBS_BY_COMPANY_ID}${companyId}?page=${page}&limit=${limit}`,
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
      const data: PaginatedResponse<JobData> = await response.json();
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
      const data = await response.json();
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

export const getJobsByFilters = async (
  filters: JobSearchFilter = {},
): Promise<Result<SearchResult>> => {
  try {
    const queryParams = toQueryString(filters);
    const response = await fetch(API_SEARCH_JOBS + queryParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      next: { tags: [TAGS.jobs] },
    });

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

export const getJobFilters = async (): Promise<Result<JobsAggregations>> => {
  try {
    const response = await fetch(API_FILTER_SEARCH_JOBS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

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
