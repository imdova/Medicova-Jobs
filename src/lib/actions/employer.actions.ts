"use server";
import { TAGS } from "@/api";
import {
  API_GET_CATEGORIES_BY_INDUSTRY,
  API_GET_COMPANY_SECTORS,
  API_GET_COMPANY_TYPES_BY_SECTOR,
  API_GET_EMPLOYMENT_TYPES,
  API_GET_INDUSTRIES,
} from "@/api/admin";
import { API_GET_COMPANY_BY_USER_NAME, API_GET_JOBS } from "@/api/employer";
import { API_GET_SEEKERS } from "@/api/seeker";
import {
  Company,
  EmploymentType,
  Industry,
  Job,
  JobCategory,
  Result,
  Sector,
  UserState,
} from "@/types";
import { errorResult } from "@/util/general";

export const getCompanyByUserName = async (
  userName: string,
): Promise<Result<Company>> => {
  try {
    const response = await fetch(API_GET_COMPANY_BY_USER_NAME + userName, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      next: { tags: [TAGS.company] },
    });
    if (!response.ok) return errorResult("fetching company data by user name");
    return {
      success: true,
      message: "Company fetched successfully",
      data: await response.json(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};

export const getSectorList = async (): Promise<Result<Sector[]>> => {
  try {
    const response = await fetch(API_GET_COMPANY_SECTORS, {
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
        message: "Sector list fetched successfully",
        data: data.data,
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

export const getTypeList = async (
  sectorId: string,
): Promise<Result<Sector[]>> => {
  try {
    const response = await fetch(API_GET_COMPANY_TYPES_BY_SECTOR + sectorId, {
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
        message: "Type list fetched successfully",
        data: data.data,
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

export const getIndustries = async (
  page: number = 1,
  limit: number = 10,
): Promise<
  Result<{
    data: Industry[];
    total: number;
  }>
> => {
  try {
    const response = await fetch(
      `${API_GET_INDUSTRIES}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );
    if (response.ok) {
      const data: { total: number; data: Industry[] } = await response.json();
      return {
        success: true,
        message: "Industries list fetched successfully",
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
export const getEmploymentTypes = async (
  page: number = 1,
  limit: number = 10,
): Promise<
  Result<{
    data: EmploymentType[];
    total: number;
  }>
> => {
  try {
    const response = await fetch(
      `${API_GET_EMPLOYMENT_TYPES}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );
    if (response.ok) {
      const data: { total: number; data: EmploymentType[] } =
        await response.json();
      return {
        success: true,
        message: "Employment types list fetched successfully",
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
export const getCategoryFromIndustryId = async (
  industryId: string,
): Promise<
  Result<{
    data: JobCategory[];
    total: number;
  }>
> => {
  try {
    const response = await fetch(
      `${API_GET_CATEGORIES_BY_INDUSTRY}?industryIds=${industryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );
    if (response.ok) {
      const data: { total: number; data: JobCategory[] } =
        await response.json();
      return {
        success: true,
        message: "Category list fetched successfully",
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
export const getSpecialtyFromCategoryId = async (
  categoryId: string,
): Promise<
  Result<{
    data: JobCategory[];
    total: number;
  }>
> => {
  try {
    const response = await fetch(`${API_GET_JOBS}?categoryIds=${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    if (response.ok) {
      const data: { total: number; data: JobCategory[] } =
        await response.json();
      return {
        success: true,
        message: "Speciality list fetched successfully",
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
export const getPaginatedSeekers = async (
  page: number = 1,
  limit: number = 10,
): Promise<
  Result<{
    data: UserState[];
    total: number;
  }>
> => {
  try {
    const response = await fetch(
      `${API_GET_SEEKERS}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );
    if (response.ok) {
      const data: { total: number; data: UserState[] } = await response.json();
      return {
        success: true,
        message: "Seekers list fetched successfully",
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
