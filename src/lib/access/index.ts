"use server";

import {
  API_FORGET_PASSWORD,
  API_GET_ME,
  API_GET_ROLE_BY_ID,
  API_LOGIN,
  API_REGISTER_USER,
  API_SEND_OTP,
  API_VALIDATE_OTP,
} from "@/api/users";
import { registerData, Result, Role, UserState } from "@/types";
import { errorResult } from "@/util/general";
import { transformRegisterData, transLoginData } from "@/util/user";

interface UserResponse {
  user: UserState;
  roles: Role[];
}

export const sendOTP = async (email: string): Promise<Result> => {
  try {
    const response = await fetch(API_SEND_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
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
    const response = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) return errorResult("serverSignIn");
    const data = await response.json();
    const user = transLoginData(data);
    return {
      success: true,
      message: "OTP validated successfully",
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};
export const register = async (data: registerData): Promise<Result> => {
  try {
    const response = await fetch(API_REGISTER_USER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) return errorResult("register");
    const user: UserState = await response.json();
    return {
      success: true,
      message: "Registered successfully",
      data: transformRegisterData(user),
    };
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
    const response = await fetch(API_GET_ROLE_BY_ID + roleId, {
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

export const getMe = async (): Promise<Result> => {
  try {
    const response = await fetch(API_GET_ME, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    // console.log("🚀 ~ getMe ~ response:", response);
    if (response.ok) {
      const data = await response.json();
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
