import { User } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  const path = req.nextUrl.pathname;

  // Redirect to login page if there is no accessible token
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  let userType = token.type as User["type"] | "unEmployee";

  if (userType === "employer" && !token.companyName) userType = "unEmployee";
  if (path == "/me") {
    if (userType === "seeker") {
      return NextResponse.redirect(new URL(`/me/${token.userName}`, req.url));
    } else if (userType === "unverified") {
      return NextResponse.redirect(new URL(`/auth/verify`, req.url));
    } else if (userType === "employer") {
      return NextResponse.redirect(
        new URL(`/co/${token.companyUserName}`, req.url),
      );
    } else if (userType === "unEmployee") {
      return NextResponse.redirect(new URL(`/employer/company-info`, req.url));
    } else if (userType === "admin") {
      return NextResponse.redirect(new URL(`/admin`, req.url));
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
    "/admin/:path*",
    "/me",
  ],
};

const roleAccessMap: Record<string, string[]> = {
  employer: ["/employer/*"],
  unEmployee: ["/employer/company-info"],
  seeker: ["/job-seeker/*"],
  admin: ["/*"],
};

function doesRoleHaveAccessToURL(userType: string, url: string): boolean {
  const accessibleRoutes = roleAccessMap[userType] || [];
  return accessibleRoutes.some((route) => {
    // Create a regex from the route by replacing dynamic segments
    const regexPattern = route
      .replace(/\[.*?\]/g, "[^/]+")
      .replace(/\*\*?/g, ".*")
      .replace("/", "\\/");
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(url);
  });
}
