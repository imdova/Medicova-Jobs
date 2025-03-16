import axios, { AxiosRequestConfig, Method, AxiosError } from "axios";

// Define the options type
type UserType = "employer-user" | "job-seeker-user";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE;

export interface UseApiOptions {
  method?: Method;
  data?: any;
  config?: AxiosRequestConfig;
  userType: UserType;
}

const refreshToken = async (userType: UserType): Promise<void> => {
  try {
    await axios.get(`${BASE_URL}/users/${userType}/refresh-token`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

async function apiCall<T>(url: string, options: UseApiOptions): Promise<T> {
  const axiosConfig: AxiosRequestConfig = {
    method: options.method || "get",
    data: options.data,
    ...options.config,
  };

  try {
    const response = await axios(url, axiosConfig);
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response?.status === 401) {
      try {
        await refreshToken(options.userType);
        const retryResponse = await axios(url, axiosConfig);
        return retryResponse.data;
      } catch (retryError) {
        throw err;
      }
    }
    throw err;
  }
}

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export { apiCall };
