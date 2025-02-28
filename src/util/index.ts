import { EducationLevel } from "@/constants/enums/education-level.enum";
import { educationOptions } from "@/constants/job";
import { JobData, Role } from "@/types";
import { Permission } from "@/types/permissions";
import { ReadonlyURLSearchParams } from "next/navigation";

export const formatDate = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

export function formatName(
  firstName: string | null,
  lastName?: string | null,
): string {
  if (!firstName || !lastName) return "";
  const lastNameInitial = lastName.charAt(0).toUpperCase();
  return `${firstName} .${lastNameInitial}`;
}
export function getLastEdit(date: Date): string {
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
  // Check if it's today
  if (diffDays === 0) {
    return "today";
  }

  // Check if it's within the last 15 days
  if (diffDays <= 15) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  return formatDate(date);
}
export function getFullLastEdit(date: Date | string | null): string {
  if (!date) return "";
  const currentDate = new Date();
  const lastDate = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffDays = Math.floor(diffMinutes / (60 * 24));

  // Check if it's today
  if (diffDays === 0) {
    if (diffMinutes === 0) {
      return "now";
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours === 0) {
      return `${diffMinutes} min`;
    }

    return `${diffHours} h`;
  }

  // Check if it's within the last 15 days
  if (diffDays <= 15) {
    return `${diffDays} d`;
  }

  return formatDate(lastDate);
}

export function getLastSegment(url?: string) {
  if (!url) return null; // Handle empty or undefined URLs
  const segments = url.split("/").filter((segment) => segment); // Split and remove empty segments
  if (segments.find((s) => s === "me")) return "me";
  return segments.length > 0 ? segments[segments.length - 1] : null; // Return the last segment
}

export const isCurrentPage = (
  pathname?: string,
  linkPath?: string,
): boolean => {
  if (!pathname || !linkPath) return false;

  const regexPattern = linkPath
    .replace(/\[.*?\]/g, "[^/]+")
    .replace(/\//g, "\\/");

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function divideName(fullName?: string) {
  // Split the full name into parts based on spaces
  if (!fullName) return {};
  const nameParts = fullName.trim().split(" ");
  // The first name is everything before the last part
  const firstName = nameParts.slice(0, nameParts.length - 1).join(" ");
  // The last name is the last part of the name
  const lastName = nameParts[nameParts.length - 1];
  return { firstName, lastName };
}

export function getPermissionNames(roles: Role[]): Permission[] {
  const permissionNames = roles
    .flatMap((role) => role.permissions)
    .map((permission) => permission.name);
  return Array.from(new Set(permissionNames));
}

export const hasDataChanged = <T>(originalData: T, currentData: T): boolean => {
  return JSON.stringify(originalData) !== JSON.stringify(currentData);
};

export const disableEnterKey = (event: React.KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
  }
};

export const formatEducationAndSpecialty = (job: JobData): string | null => {
  const education = educationOptions.find(
    (option) => option.id === job.educationLevel,
  );

  if (!education) {
    return null;
  }
  switch (education.id) {
    case EducationLevel.HIGH_SCHOOL:
      return `High School Diploma in ${job.jobSpeciality}`;
    case EducationLevel.BACHELORS:
      return `Bachelor's Degree in ${job.jobSpeciality}`;
    case EducationLevel.MASTERS:
      return `Master's Degree in ${job.jobSpeciality}`;
    case EducationLevel.PHD:
      return `PhD in ${job.jobSpeciality}`;
    default:
      return null;
  }
};

export function convertEmptyStringsToNull<T>(data: T): T {
  if (data === null || data === undefined) return data;

  if (typeof data === "string" && data.trim() === "") {
    return null as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => convertEmptyStringsToNull(item)) as T;
  }

  if (typeof data === "object") {
    const convertedEntries = Object.entries(data).map(([key, value]) => [
      key,
      convertEmptyStringsToNull(value),
    ]);

    const convertedObject = Object.fromEntries(convertedEntries);

    // Check if all values are null
    if (Object.values(convertedObject).every((value) => value === null)) {
      return null as T;
    }

    return convertedObject as T;
  }

  return data;
}
