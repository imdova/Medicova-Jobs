import { JobData, JobsTabs } from "@/types";
import {
  forgetPassword,
  googleLogin,
  googleRegister,
  register,
  serverSignIn,
} from "../access";
import { API_VERIFY_EMAIL } from "@/api/users";
import { getCookies, setCookies } from "../cookies";
import { User } from "next-auth";
import { divideName } from "@/util";
import { toQueryString } from "@/util/general";

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
export async function addSession(credentials: any) {
  if (!credentials?.email) return null;
  return {
    id: credentials.email, // or any unique ID
    email: credentials.email,
    type: credentials.type,
    isVerified: credentials.isVerified,
  } as User;
}

export async function changePasswordWithOTP(credentials: any) {
  if (!credentials?.email || !credentials?.otp) return null;
  try {
    const response = await forgetPassword({
      email: credentials.email,
      newPassword: credentials.password,
      otp: credentials.otp,
    });
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
  const { token, email } = credentials;
  const queryParams = toQueryString({ token, email });
  const response = await fetch(API_VERIFY_EMAIL + queryParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  if (!response.ok) {
    return null;
  }
  const session = await response.json();
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
      setCookies("user-error", JSON.stringify(response.message));
      if (!response.success) return false;
      const userData = response.data;
      setCookies("user", JSON.stringify(userData));
      return true;
    }
    const response = await googleLogin({
      email: user.email,
      accessToken: account?.access_token,
    });
    setCookies("user-error", JSON.stringify(response.message));
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
