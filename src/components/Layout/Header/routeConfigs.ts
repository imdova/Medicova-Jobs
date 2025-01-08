import { commonLinks, roleBasedLinks } from "@/constants/header";
import { RoleState } from "@/types/next-auth";

type HeaderType = "minimal" | "full" | "centered" | "transparent" | "dark";
type LinksType = "default" | "role";

interface RouteConfig {
  pattern: string;
  headerType: HeaderType;
  linksType?: LinksType;
}

export const routeConfigs: RouteConfig[] = [
  // default
  { pattern: "/", headerType: "transparent", linksType: "default" },
  { pattern: "/search", headerType: "transparent", linksType: "role" },
  { pattern: "/me/[id]", headerType: "full", linksType: "role" },

  { pattern: "/chat", headerType: "full", linksType: "role" },
  { pattern: "/notifications", headerType: "full", linksType: "role" },

  // auth
  { pattern: "/auth/*", headerType: "minimal", linksType: "role" },
  //employer
  { pattern: "/employer/*", headerType: "full", linksType: "role" },
  { pattern: "/employer/search", headerType: "transparent", linksType: "role" },
  //job-seeker
  { pattern: "/job-seeker/*", headerType: "full", linksType: "role" },
];

// DynamicHeader.tsx
export const matchRoute = (pathname: string) => {
  // First, prioritize exact matches (including dynamic segments)
  const exactMatch = routeConfigs.find((route) => {
    // Handle dynamic segments (e.g., "/user/[id]")
    const regexPattern = route.pattern
      .replace(/\[.*?\]/g, "[^/]+")
      .replace(/\//g, "\\/");
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  });

  if (exactMatch) return exactMatch;

  // If no exact match, check for wildcard patterns
  const wildcardMatch = routeConfigs.find((route) => {
    if (route.pattern.includes("*")) {
      // Convert wildcard pattern into a base path regex
      const wildcardPattern = route.pattern.replace(/\*/g, ".*");
      const regex = new RegExp(`^${wildcardPattern}`);
      return regex.test(pathname);
    }
    return false;
  });

  return wildcardMatch;
};

export function getNavLinks(role?: RoleState, pathname?: string) {
  if (pathname) {
    const type = matchRoute(pathname)?.linksType;
    if (type === "role" && role) {
      return roleBasedLinks[role];
    }
  }
  return commonLinks.home;
}
