import { RoleBasedLinks } from "@/types";
import { MessageOutlined } from "@mui/icons-material";

export const roleBasedLinks: RoleBasedLinks = {
  employer: [
    {
      id: 1,
      label: "Dashboard",
      path: "/employer/dashboard",
    },
    {
      id: 1,
      label: "My Jobs",
      path: "/employer/job/manage-jobs",
    },
    {
      id: 1,
      label: "CV Search",
      path: "/employer/search",
    },
    {
      id: 1,
      label: "Report",
      path: "#",
    },
    {
      id: 1,
      label: "Billing",
      path: "/employer/subscription-plans",
    },
  ],
  unEmployee: [
    {
      id: 1,
      label: "Dashboard",
      path: "/employer/dashboard",
    },
    {
      id: 1,
      label: "My Jobs",
      path: "/employer/job/manage-jobs",
    },
    {
      id: 1,
      label: "CV Search",
      path: "/employer/search",
    },
    {
      id: 1,
      label: "Report",
      path: "#",
    },
    {
      id: 1,
      label: "Billing",
      path: "/employer/subscription-plans",
    },
  ],
  seeker: [
    {
      id: 1,
      label: "Find Job",
      path: "/search",
    },
    {
      id: 1,
      label: "Applications",
      path: "/job-seeker/my-applications",
    },
    {
      id: 1,
      label: "Courses",
      path: "#",
    },
    {
      id: 1,
      label: "Settings",
      path: "/job-seeker/setting",
      pattern: "/job-seeker/setting/*",
    },
  ],
  admin: [
    {
      id: 1,
      label: "Admin Dashboard",
      path: "/admin",
    },
    {
      id: 1,
      label: "User Management",
      path: "/admin/users",
    },
    {
      id: 1,
      label: "Settings",
      path: "/admin/settings",
    },
  ],
  default: [
    {
      id: 1,
      label: "Jobs",
      path: "/search",
    },
    {
      id: 1,
      label: "Post a Job",
      path: "/employer/job/posted",
    },
    {
      id: 1,
      label: "Blog",
      path: "/blog",
    },
    {
      id: 1,
      label: "Courses",
      path: "https://courses.medicova.net/",
    },
  ],
  unverified: [
    {
      id: 0,
      label: "Verify Account",
      icon: MessageOutlined,
      notifications: 1,
      path: "/auth/verify",
      pattern: "/auth/verify",
    },
  ],
};
