import { ActiveLinkResult, NavItem, Result } from "@/types";
import { isCurrentPage } from ".";

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
export function itemsInLastDays<T extends { created_at?: string | null }>(
  data: T[],
  days: number,
): T[] {
  const now = new Date();
  const result: T[] = [];
  data.forEach((item) => {
    if (!item.created_at) return;
    const createdDate = new Date(item.created_at);
    const timeDiff = now.getTime() - createdDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    if (daysDiff <= days) {
      result.push(item);
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

export function formatLocation(location: LocationType): string | null {
  const parts: string[] = [];

  if (location.country?.name) {
    parts.push(location.country.name);
  }
  if (location.state?.name) {
    parts.push(location.state.name);
  }
  if (location.city) {
    parts.push(location.city);
  }

  return parts.join(", ") || null;
}

export function toggleId(ids: string[], id: string): string[] {
  if (ids.includes(id)) {
    return ids.filter((existingId) => existingId !== id);
  } else {
    return [...ids, id];
  }
}

export function formatTimeDuration(days: number): string {
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""}`;

  const weeks = Math.floor(days / 7);
  if (days < 30) return `${weeks} week${weeks !== 1 ? "s" : ""}`;

  const months = Math.floor(days / 30); // Ensuring 30 days count as 1 month
  if (days < 365) return `${months || 1} month${months !== 1 ? "s" : ""}`;

  const years = Math.floor(days / 365.25); // Accounts for leap years
  return `${years} year${years !== 1 ? "s" : ""}`;
}

export function filterItemsByDate<T extends { created_at: string }>(
  items: T[],
  startDate?: string | null,
  endDate?: string | null,
): T[] {
  const firstDate =
    [...items].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )[0]?.created_at || 0;
  const start = startDate ? new Date(startDate) : new Date(firstDate);
  const end = endDate ? new Date(endDate) : new Date();
  end.setDate(end.getDate() + 1);

  return items.filter((item) => {
    const itemDate = new Date(item.created_at);
    return itemDate >= start && itemDate <= end;
  });
}

export const findActiveLinkIndex = (
  links: NavItem[],
  pathname: string,
  isCollapsed: number | null,
): ActiveLinkResult => {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    // Check if the current link is active
    const path = link.pattern || link.path;
    if (path && isCurrentPage(pathname, path)) {
      const collapsedLinkIndex = links.findIndex(
        (link) => link.id === isCollapsed,
      );
      const collapsedLink = links.find((link) => link.id === isCollapsed);
      const additionalItems = isCollapsed
        ? i > collapsedLinkIndex
          ? collapsedLink?.links?.length || 0
          : 0
        : 0;
      return { activeIndex: i + additionalItems, parentId: null };
    }

    // If the link has sublinks, recursively check them
    if (link.links && link.links.length > 0) {
      const subLinkResult = findActiveLinkIndex(
        link.links,
        pathname,
        isCollapsed,
      );
      if (subLinkResult.activeIndex !== -1) {
        const collapsedLinkIndex = links.findIndex(
          (link) => link.id === isCollapsed,
        );
        const collapsedLink = links.find((link) => link.id === isCollapsed);

        const additionalItems =
          isCollapsed === link.id
            ? subLinkResult.activeIndex + 1
            : i > collapsedLinkIndex
              ? collapsedLink?.links?.length || 0
              : 0;
        return {
          activeIndex: i + additionalItems,
          parentId: link.id,
        };
      }
    }
  }

  // If no active link is found, return -1
  return { activeIndex: -1, parentId: null };
};

export const whatsAppLink = (phone: string, message?: string) => {
  const cleanedNumber = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message || "");
  return `https://api.whatsapp.com/send?phone=${cleanedNumber}&text=${encodedMessage}`;
};
export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return "var(--primary)";
  if (progress >= 50) return "var(--warning)";
  return "var(--error)";
};

export function updateSearchParams(
  searchKey: string,
  value: string,
  searchParams?: { [key: string]: string | string[] | undefined },
): string {
  const params = new URLSearchParams();

  // Add existing params
  if (searchParams) {
    Object.entries(searchParams).forEach(([paramKey, paramValue]) => {
      if (Array.isArray(paramValue)) {
        paramValue.forEach((val) => params.append(paramKey, val));
      } else if (paramValue !== undefined) {
        params.set(paramKey, paramValue);
      }
    });
  }

  // Update or add the new key-value pair
  params.set(searchKey, value);

  return `?${params.toString()}`;
}

export function formatPrice(value?: number): string | null {
  if (!value) return null;
  const suffixes = [
    { threshold: 1_000_000_000, suffix: "b" },
    { threshold: 1_000_000, suffix: "m" },
    { threshold: 1_000, suffix: "k" },
  ];

  for (const { threshold, suffix } of suffixes) {
    if (value >= threshold) {
      return `${(value / threshold).toFixed(1).replace(/\.0$/, "")}${suffix}`;
    }
  }

  return value.toString();
}


export function toQueryString(filters: Record<string, string | number | (string | number)[] | undefined>): string {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v.toString()));
      } else {
        queryParams.append(key, value.toString());
      }
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}