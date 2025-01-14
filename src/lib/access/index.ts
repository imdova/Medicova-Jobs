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

import { RoleState } from "@/types/next-auth";
import { getEmployerWithID } from "../actions/employer.actions";
import { getPermissionNames } from "@/util";

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
    if (response.ok) {
      const { user, roles }: UserResponse = await response.json();
      const permissions = getPermissionNames(roles);
      if (user && user.id) {
        if (user.type === "employer") {
          const response = await getEmployerWithID(user.id);
          if (response.success) {
            const companyId = response.data.id;
            return {
              success: true,
              message: user.type + " Registered successfully",
              data: { ...user, permissions, companyId },
            };
          }
          return {
            success: true,
            message: user.type + " Registered successfully",
            data: { ...user, permissions },
          };
        }
        return {
          success: true,
          message: user.type + " Registered successfully",
          data: user,
        };
      }
      return {
        success: false,
        message: "User not found",
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
    const response = await fetch(API_REGISTER_USER + userType, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data: UserState = await response.json();
      return {
        success: true,
        message: "Registered successfully",
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
    console.log("🚀 ~ response:", response);
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
