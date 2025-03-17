import { roleBasedSideBarLinks } from "@/constants/side-bar";
import { UserState } from "@/types";
import { RoleState } from "@/types/next-auth";

type SideBarType = "minimal" | "full" | "none";
type LinksType = "default" | "userType";

interface RouteConfig {
  pattern: string;
  sideBarType: SideBarType;
  linksType?: LinksType;
}

export const routeConfigs: RouteConfig[] = [
  // default
  { pattern: "/me/[id]", sideBarType: "full", linksType: "userType" },
  { pattern: "/co/[id]", sideBarType: "full", linksType: "userType" },

  { pattern: "/chat", sideBarType: "full", linksType: "userType" },
  { pattern: "/notifications", sideBarType: "full", linksType: "userType" },

  { pattern: "/job/[slug]", sideBarType: "full", linksType: "userType" },
  // auth
  //employer
  {
    pattern: "/employer/search",
    sideBarType: "minimal",
    linksType: "userType",
  },
  {
    pattern: "/employer/subscription-plans",
    sideBarType: "minimal",
    linksType: "userType",
  },
  {
    pattern: "/employer/job/manage-jobs/[id]", 
    sideBarType: "minimal",
    linksType: "userType",
  },
  {
    pattern: "/employer/search/saved-search/[slug]",
    sideBarType: "minimal",
    linksType: "userType",
  },
  { pattern: "/employer/*", sideBarType: "full", linksType: "userType" },
  //job-seeker
  { pattern: "/job-seeker/*", sideBarType: "full", linksType: "userType" },
];

export const matchRoute = (pathname: string): RouteConfig | undefined => {
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

export function getSideBarLinks(user?: UserState, pathname?: string) {
  const userType = user?.type as RoleState;
  if (pathname) {
    const type = matchRoute(pathname)?.linksType;
    if (type === "userType" && userType) {
      if (userType === "seeker") {
        return roleBasedSideBarLinks.seeker;
      } else if (userType === "employer") {
        if (user?.companyName) {
          return roleBasedSideBarLinks.employer;
        } else {
          return roleBasedSideBarLinks.unEmployee;
        }
      } else if (userType === "admin") {
        return roleBasedSideBarLinks.admin;
      }
    }
  }
  return [];
}
