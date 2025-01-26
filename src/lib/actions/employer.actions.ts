"use server";
import { TAGS } from "@/api";
import {
  API_CREATE_COMPANY,
  API_GET_COMPANY_BY_ID,
  API_GET_COMPANY_SECTORS,
  API_GET_COMPANY_TYPE_BY_ID,
  API_GET_COMPANY_TYPES,
  API_GET_EMPLOYEE_BY_ID,
  API_GET_EMPLOYEES,
  API_GET_JOB_CATEGORIES,
  API_GET_JOB_CATEGORIES_BY_INDUSTRY,
  API_GET_JOB_EMPLOYMENT_TYPES,
  API_GET_JOB_INDUSTRIES,
  API_GET_JOBS,
  API_UPDATE_COMPANY,
} from "@/api/employer";
import {
  Company,
  EmploymentType,
  Industry,
  Job,
  JobCategory,
  Result,
  Sector,
} from "@/types";
import { revalidateTag } from "next/cache";

export const getEmployerWithID = async (id: string): Promise<Result> => {
  try {
    const response = await fetch(API_GET_EMPLOYEE_BY_ID + id, {
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
        message: "Role fetched successfully",
        data: data.company,
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
export const getEmployeeOfCompany = async (
  companyId: string,
  page: number = 1,
  limit: number = 10,
): Promise<Result<{ data: { id: string }[]; total: number }>> => {
  try {
    const response = await fetch(
      API_GET_EMPLOYEES + `?page=${page}&limit=${limit}&companyId=${companyId}`,
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
        message: "Roles fetched successfully",
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

export const createCompany = async (
  companyData: Company,
  userId: string,
): Promise<Result> => {
  try {
    const response = await fetch(API_CREATE_COMPANY + `?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(companyData),
    });
    if (response.ok) {
      const data = await response.json();
      data.typeId = data.type.id;
      data.sectorId = data.type.sector.id;
      return {
        success: true,
        message: "Company created successfully",
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
export const updateCompany = async (companyData: Partial<Company>): Promise<Result> => {
  try {
    const response = await fetch(API_UPDATE_COMPANY + companyData.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(companyData),
    });
    if (response.ok) {
      const data = await response.json();
      data.typeId = data.type.id;
      data.sectorId = data.type.sector.id;
      revalidateTag(TAGS.company);
      return {
        success: true,
        message: "Company updated successfully",
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
export const getCompanyById = async (
  companyId: string,
): Promise<Result<Company>> => {
  try {
    const response = await fetch(API_GET_COMPANY_BY_ID + companyId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      next: { tags: [TAGS.company] }
    });
    if (response.ok) {
      const data: Company = await response.json();
      data.typeId = data.type?.id || "";
      data.sectorId = data.type?.sector?.id;
      return {
        success: true,
        message: "Company fetched successfully",
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
    const response = await fetch(
      API_GET_COMPANY_TYPES + `?sectorId=${sectorId}`,
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
export const getTypeById = async (
  id: string,
): Promise<Result<{ id: string; name: string; sector: Sector }>> => {
  try {
    const response = await fetch(API_GET_COMPANY_TYPE_BY_ID + id, {
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
        message: "Type fetched successfully",
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

/// jobs actions

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
      `${API_GET_JOB_INDUSTRIES}?page=${page}&limit=${limit}`,
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
      `${API_GET_JOB_EMPLOYMENT_TYPES}?page=${page}&limit=${limit}`,
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
      `${API_GET_JOB_CATEGORIES_BY_INDUSTRY}?industryIds=${industryId}`,
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
