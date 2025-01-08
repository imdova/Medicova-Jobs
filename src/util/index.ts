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

export function formatName(fullName: string): string {
  const nameParts = fullName.trim().split(" ");
  if (nameParts.length < 2) {
    return fullName;
  }
  const firstName = nameParts[0];
  const lastNameInitial = nameParts[nameParts.length - 1]
    .charAt(0)
    .toUpperCase();
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
export function getFullLastEdit(date: Date): string {
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffDays = Math.floor(diffMinutes / (60 * 24));

  // Check if it's today
  if (diffDays === 0) {
    if (diffMinutes === 0) {
      return "now";
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours === 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    }

    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  // Check if it's within the last 15 days
  if (diffDays <= 15) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  return formatDate(date);
}

export function getLastSegment(url?: string) {
  if (!url) return null; // Handle empty or undefined URLs
  const segments = url.split("/").filter((segment) => segment); // Split and remove empty segments
  if (segments.find((s) => s === "me")) return "me";
  return segments.length > 0 ? segments[segments.length - 1] : null; // Return the last segment
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};
