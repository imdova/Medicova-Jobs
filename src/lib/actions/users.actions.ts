"use server";

import { TAGS } from "@/api";
import {
  API_GET_SEEKER_BY_USERNAME,
  API_GET_SEEKER_EXPERIENCE,
} from "@/api/seeker";
import { API_GET_USERS } from "@/api/users";
import { Result } from "@/types";
import { errorResult } from "@/util/general";

export const getUser = async (
  username: string,
): Promise<Result<UserProfile>> => {
  try {
    const response = await fetch(API_GET_SEEKER_BY_USERNAME + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      next: { tags: [TAGS.profile] },
    });
    if (!response.ok) return errorResult("fetching company data by user name");
    const data: UserProfile = await response.json();
    return {
      success: true,
      message: "User fetched successfully",
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};
export const getUsersWithIds = async (
  ids: string[],
): Promise<Result<UserProfile[]>> => {
  try {
    const response = await fetch(`${API_GET_USERS}?ids=${ids.join(",")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      next: { tags: [TAGS.profile] },
    });

    if (response.ok) {
      const data: UserProfile[] = await response.json();
      return {
        success: true,
        message: "Users fetched successfully",
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

export const getExperience = async (
  id: string,
): Promise<Result<ExperienceData[]>> => {
  try {
    const response = await fetch(API_GET_SEEKER_EXPERIENCE + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      next: { tags: [TAGS.experience] },
    });
    if (!response.ok) return errorResult("error fetching experience");
    const data: ExperienceData[] = await response.json();
    return {
      success: true,
      message: "Experience fetched successfully",
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};
