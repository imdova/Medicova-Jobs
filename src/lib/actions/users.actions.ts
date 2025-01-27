"use server";

import { API_CREATE_JOB_APPLICATION } from "@/api/seeker";
import { API_GET_USER_BY_ID } from "@/api/users";
import { Result, UserState } from "@/types";
import { ApplicationType } from "@/types/seeker";

export const getUser = async (id: string): Promise<Result<UserState>> => {
  // console.log("🚀 ~ getUser ~ id:", id);
  try {
    const response = await fetch(API_GET_USER_BY_ID + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    // console.log("🚀 ~ getMe ~ response:", response);
    if (response.ok) {
      const data: UserState = await response.json();
      return {
        success: true,
        message: "User fetched successfully",
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


export const createJobApplication = async (
  applicationData: ApplicationType,
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
    console.log("🚀 ~ response:", response)

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
