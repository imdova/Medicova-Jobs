import { roleBasedSideBarLinks } from "@/constants/side-bar";
import { RoleState } from "@/types/next-auth";

type SideBarType = "minimal" | "full" | "none";
type LinksType = "default" | "role";

interface RouteConfig {
  pattern: string;
  sideBarType: SideBarType;
  linksType?: LinksType;
}

export const routeConfigs: RouteConfig[] = [
  // default
  { pattern: "/me/[id]", sideBarType: "full", linksType: "role" },

  { pattern: "/chat", sideBarType: "full", linksType: "role" },
  { pattern: "/notifications", sideBarType: "full", linksType: "role" },

  { pattern: "/job/[slug]", sideBarType: "full", linksType: "role" },
  // auth
  //employer
  { pattern: "/employer/search", sideBarType: "none", linksType: "role" },
  {
    pattern: "/employer/job/applicants",
    sideBarType: "none",
    linksType: "role",
  },
  { pattern: "/employer/search/cv", sideBarType: "none", linksType: "role" },
  {
    pattern: "/employer/search/saved-search/[slug]",
    sideBarType: "none",
    linksType: "role",
  },
  { pattern: "/employer/*", sideBarType: "full", linksType: "role" },
  //job-seeker
  { pattern: "/job-seeker/*", sideBarType: "full", linksType: "role" },
];

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

export function getSideBarLinks(role?: RoleState, pathname?: string) {
  if (pathname) {
    const type = matchRoute(pathname)?.linksType;
    if (type === "role" && role) {
      return roleBasedSideBarLinks[role];
    }
  }
  return [];
}
