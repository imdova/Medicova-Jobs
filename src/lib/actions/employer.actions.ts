import { API_GET_EMPLOYEE_BY_ID } from "@/api/employer";
import { Result } from "@/types";

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
