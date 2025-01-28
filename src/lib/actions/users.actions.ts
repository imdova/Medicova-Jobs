"use server";

import { TAGS } from "@/api";
import {
  API_CREATE_JOB_APPLICATION,
  API_GET_SEEKER_BY_IDENTIFIER,
} from "@/api/seeker";
import { API_GET_USER_BY_ID } from "@/api/users";
import { Result, UserProfile, UserState } from "@/types";
import { ApplicationType } from "@/types/seeker";

export const getUser = async (
  identifier: string,
): Promise<Result<UserProfile>> => {
  try {
    const response = await fetch(API_GET_SEEKER_BY_IDENTIFIER + identifier, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      next: { tags: [TAGS.profile] },
    });
    if (response.ok) {
      const data: UserProfile = await response.json();
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
    console.log("🚀 ~ response:", response);

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
