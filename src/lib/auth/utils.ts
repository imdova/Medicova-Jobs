import { JobData, JobsTabs } from "@/types";
import { forgetPassword, register, serverSignIn } from "../access";

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
    console.log("🚀 ~ changePasswordWithOTP ~ response:", response.data)
    return response.success ? response.data : null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
export async function authenticateRegister(credentials: any) {
  if (!credentials?.email || !credentials?.password) return null;
  try {
    const response = await register(credentials, credentials.type);
    return response.success ? response.data : null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

export async function handleSocialLogin(user: any, account: any) {
  try {
    // const response = await fetch(`${API_URL}/api/user/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: user.email,
    //     provider: account.provider,
    //     providerAccountId: account.providerAccountId,
    //   }),
    // });

    // return response.ok;
    return true; // Do different verification for other providers that don't have `email_verified`
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
      return jobs.filter((job) => job.active && !job.closed && !job.draft);
    case "closed": // Closed
      return jobs.filter((job) => job.closed);
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
