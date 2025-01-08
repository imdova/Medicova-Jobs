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
      title: "Profile",
      url: "/job-seeker/profile",
    },
    {
      title: "Applications",
      url: "/job-seeker/applications",
    },
    {
      title: "Saved Jobs",
      url: "/job-seeker/saved-jobs",
    },
    {
      title: "Settings",
      url: "/job-seeker/settings",
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
      title: "Boost",
      url: "#",
    },
    {
      title: "Prep",
      url: "#",
    },
    {
      title: "Learn",
      url: "#",
    },
    {
      title: "Career Advice",
      url: "#",
    },
  ],
};
