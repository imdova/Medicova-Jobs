"use server";

import { TAGS } from "@/api";
import {
  API_GET_SEEKER_BY_IDENTIFIER,
} from "@/api/seeker";
import { Result, UserProfile, UserState } from "@/types";

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