"use server";

import { registerData, UserState } from "@/types";
import {
  API_FORGET_PASSWORD,
  API_GET_ROLE_ID,
  API_SEND_OTP,
  API_SIGNIN,
  API_SIGNUP,
  API_VALIDATE_OTP,
} from "../constants";
import { RoleState } from "@/types/next-auth";

export interface Result<T = void> {
  success: boolean;
  message: string;
  data?: any;
}
export const sendOTP = async (email: string): Promise<Result> => {
  try {
    const response = await fetch(API_SEND_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
    });
    if (response.ok) {
      return {
        success: true,
        message: "OTP sent successfully",
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

export const validateOTP = async ({
  otp,
  email,
}: {
  otp: string;
  email: string;
}): Promise<Result> => {
  try {
    const response = await fetch(API_VALIDATE_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
      credentials: "include",
    });
    if (response.ok) {
      return {
        success: true,
        message: "OTP validated successfully",
        data: await response.json(),
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

export const serverSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Result> => {
  try {
    const response = await fetch(API_SIGNIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (response.ok) {
      const data: UserState = await response.json();
      const roleData = await getRole(data.roles[0]);
      return {
        success: true,
        message: "Registered successfully",
        data: { ...data, role: roleData.data },
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
export const register = async (
  data: registerData,
  userType: RoleState,
): Promise<Result> => {
  try {
    const response = await fetch(API_SIGNUP + userType, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (response.ok) {
      const data: UserState = await response.json();
      const roleData = await getRole(data.roles[0]);
      return {
        success: true,
        message: "Registered successfully",
        data: { ...data, role: roleData.data },
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
export const forgetPassword = async (data: {
  email: string;
  newPassword: string;
  otp: string | null;
}): Promise<Result> => {
  try {
    const response = await fetch(API_FORGET_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (response.ok) {
      return {
        success: true,
        message: "Password changed successfully",
        data: await response.json(),
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

export const getRole = async (roleId: string): Promise<Result> => {
  try {
    const response = await fetch(API_GET_ROLE_ID + roleId, {
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
        data: data.forUserType,
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
