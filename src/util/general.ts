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

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

export function formatLocation(location: LocationType): string {
  const parts: string[] = [];

  if (location.city) {
    parts.push(location.city);
  }
  if (location.state?.name) {
    parts.push(location.state.name);
  }
  if (location.country?.name) {
    parts.push(location.country.name);
  }

  return parts.join(", ") || "Unknown Location";
}

export function toggleId(ids: string[], id: string): string[] {
  if (ids.includes(id)) {
    return ids.filter((existingId) => existingId !== id);
  } else {
    return [...ids, id];
  }
}
