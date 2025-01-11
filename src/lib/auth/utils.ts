import { API_SIGNIN } from "@/lib/constants";
import { validateOTP } from "../access";

export async function authenticateUser(credentials: any) {
  if (!credentials?.email || !credentials?.password) return null;

  try {
    const response = await fetch(API_SIGNIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    const user = await response.json();
    return response.ok ? user : null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
export async function authenticateOTP(credentials: any) {
  if (!credentials?.email || !credentials?.otp) return null;
  try {
    const response = await validateOTP({
      otp: credentials?.otp,
      email: credentials?.email,
    });
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
