import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { RoleState } from "./types/next-auth";
import { UserState } from "./types";

export default withAuth(function middleware(req) {
  const token = req.nextauth.token as UserState | null;
  const path = req.nextUrl.pathname;

  // Redirect to login page if there is no accessible token
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  const userType = token.type as RoleState;
  if (path == "/me") {
    if(userType === "seeker"){
      return NextResponse.redirect(new URL(`/me/${token.id}`, req.url));
    }else{
      return NextResponse.redirect(new URL(`/employer/dashboard`, req.url));
    }
  }
  let haveAccess = doesRoleHaveAccessToURL(userType, path);
  if (!haveAccess) {
    // Redirect to login page if user has no access to that particular page
    return NextResponse.rewrite(new URL("/403", req.url));
  }
  // Allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/job-seeker/:path*",
    "/employer/:path*",
    "/dashboard/:path*",
    "/me",
  ],
};

const roleAccessMap: Record<string, string[]> = {
  employer: [
    "/employer/company-info",
    "/employer/dashboard",
    "/employer/job/applicants",
    "/employer/job/manage-jobs",
    "/employer/job/posted",
    "/employer/profile",
    "/employer/search",
    "/employer/search/saved-search",
    "/employer/setting",
    "/employer/subscription-plans",
    "/employer/search/saved-search/[id]",
  ],
};

function doesRoleHaveAccessToURL(userType: string, url: string): boolean {
  const accessibleRoutes = roleAccessMap[userType] || [];
  // return accessibleRoutes.some((route) => {
  //   // Create a regex from the route by replacing dynamic segments
  //   const regexPattern = route.replace(/\[.*?\]/g, "[^/]+").replace("/", "\\/");
  //   const regex = new RegExp(`^${regexPattern}$`);
  //   return regex.test(url);
  // });
  return true;
}
