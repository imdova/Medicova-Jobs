import { JobData, JobsTabs } from "@/types";
import {
  forgetPassword,
  googleLogin,
  googleRegister,
  register,
  serverSignIn,
} from "../access";
import { API_GET_CURRENT_USER } from "@/api/users";
import { getCookies, setCookies } from "../cookies";
import { User } from "next-auth";
import { divideName } from "@/util";

export async function authenticateUser(credentials: any) {
  if (!credentials?.email || !credentials?.password) return null;
  try {
    const response = await serverSignIn(credentials);
    return response.success ? response.data : null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
export async function changePasswordWithOTP(credentials: any) {
  if (!credentials?.email || !credentials?.otp) return null;
  try {
    const response = await forgetPassword({
      email: credentials.email,
      newPassword: credentials.password,
      otp: credentials.otp,
    });
    console.log("🚀 ~ changePasswordWithOTP ~ response:", response.data);
    return response.success ? response.data : null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
export async function authenticateRegister(credentials: any) {
  if (!credentials?.email || !credentials?.password) return null;
  try {
    const response = await register(credentials);
    return response.success ? response.data : null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
export async function authenticateToken(credentials: any) {
  const { token, callbackUrl } = credentials;
  const data = await fetch(API_GET_CURRENT_USER + token, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  if (!data.ok) {
    return null;
  }
  const session = await data.json();
  return session;
}

export async function handleSocialLogin(user: any, account: any) {
  try {
    const userType = (await getCookies("userType")) as User["type"];
    const { firstName, lastName } = divideName(user?.name);
    if (userType) {
      const response = await googleRegister({
        email: user.email,
        firstName: firstName || user.name,
        lastName: lastName || user.name,
        picture: user.image,
        accessToken: account?.access_token,
        userType: userType,
      });
      if (!response.success) return false;
      const userData = response.data;
      setCookies("user", JSON.stringify(userData));
      return true;
    }
    const response = await googleLogin({
      email: user.email,
      accessToken: account?.access_token,
    });
    if (!response.success) return false;
    const userData = response.data;
    setCookies("user", JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error("Social login error:", error);
    return false;
  }
}

export const filteredJobs = (jobs: JobData[], activeTab: JobsTabs) => {
  switch (activeTab) {
    case "all": // All
      return jobs;
    case "active": // Active
      return jobs.filter((job) => job.active && !job.draft);
    case "closed": // Closed
      return jobs.filter((job) => !job.active && !job.draft);
    case "expired": // Expired (based on validity date)
      return jobs.filter(
        (job) => job.validTo && new Date(job.validTo) < new Date(),
      );
    case "draft": // Draft
      return jobs.filter((job) => job.draft);
    default:
      return [];
  }
};

export function expandItems<T>(
  array: T[],
  initial: number,
  expand: boolean,
): T[] {
  return expand ? array : array.slice(0, initial);
}
