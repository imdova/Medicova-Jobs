"use server";
import {
  API_CREATE_COMPANY,
  API_GET_COMPANY_BY_ID,
  API_GET_COMPANY_SECTORS,
  API_GET_COMPANY_TYPES,
  API_GET_EMPLOYEE_BY_ID,
} from "@/api/employer";
import { Company, Result, Sector } from "@/types";

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

export const createCompany = async (companyData: Company): Promise<Result> => {
  try {
    const response = await fetch(API_CREATE_COMPANY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(companyData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("🚀 ~ createCompany ~ data:", data);
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
    });
    if (response.ok) {
      const data = await response.json();
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
