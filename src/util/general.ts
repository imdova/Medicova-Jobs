import { Result } from "@/types";

export const errorResult = (type: string): Result => {
  return {
    success: false,
    message: `an error occurred at ${type}`,
  };
};
