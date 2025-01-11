import { CommonLinks, RoleBasedLinks } from "@/types";

export const roleBasedLinks: RoleBasedLinks = {
  employer: [
    {
      title: "Dashboard",
      url: "/employer/dashboard",
    },
    {
      title: "My Jobs",
      url: "/employer/job/manage-jobs",
    },
    {
      title: "CV Search",
      url: "/employer/search",
    },
    {
      title: "Report",
      url: "#",
    },
    {
      title: "Billing",
      url: "/employer/subscription-plans",
    },
  ],
  user: [
    {
      title: "Find Job",
      url: "/search",
    },
    {
      title: "Applications",
      url: "/job-seeker/my-applications",
    },
    {
      title: "Courses",
      url: "#",
    },
    {
      title: "Settings",
      url: "/job-seeker/setting",
    },
  ],
  admin: [
    {
      title: "Admin Dashboard",
      url: "/admin/dashboard",
    },
    {
      title: "User Management",
      url: "/admin/users",
    },
    {
      title: "Settings",
      url: "/admin/settings",
    },
  ],
};

export const commonLinks: CommonLinks = {
  home: [
    {
      title: "Jobs",
      url: "/search",
    },
    {
      title: "Post a Job",
      url: "/employer/job/posted",
    },
    {
      title: "Blog",
      url: "#",
    },
    {
      title: "Courses",
      url: "#",
    },
  ],
};
