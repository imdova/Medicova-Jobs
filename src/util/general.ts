import { Result } from "@/types";

export const errorResult = (type: string): Result => {
  return {
    success: false,
    message: `an error occurred at ${type}`,
  };
};

export function itemsPerDays<T extends { created_at?: string | null }>(
  data: T[],
  days: number,
): number {
  const now = new Date();
  let result = 0;
  data.forEach((item) => {
    if (!item.created_at) return;
    const createdDate = new Date(item.created_at);
    const timeDiff = now.getTime() - createdDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    if (daysDiff <= days) {
      result++;
    }
  });
  return result;
}
