import { RoleState } from "@/types/next-auth";
import {
  BusinessOutlined,
  DescriptionOutlined,
  FolderOutlined,
  HelpOutline,
  HomeOutlined,
  InfoOutlined,
  MessageOutlined,
  NotificationsActiveOutlined,
  PaidOutlined,
  Person,
  PostAddOutlined,
  Search,
  SettingsOutlined,
  WorkOutline,
} from "@mui/icons-material";

type NavItem = {
  icon?: React.ElementType;
  label?: string;
  path?: string;
  notifications?: number;
  section?: string; // Optional section header
  type?: "divider" | "text" | "collapse";
  links?: NavItem[];
};

export type CommonLinksType = "home";

export type RoleBasedLinks = {
  [key in RoleState]: NavItem[];
};
export type CommonLinks = {
  [key in CommonLinksType]: NavItem[];
};

export const roleBasedSideBarLinks: RoleBasedLinks = {
  admin: [],
  employer: [
    {
      label: "Dashboard",
      icon: HomeOutlined,
      path: "/employer/dashboard",
    },
    {
      label: "Company Info",
      icon: BusinessOutlined,
      path: "/employer/company-info",
    },
    {
      label: "Manage Jobs",
      icon: WorkOutline,
      path: "/employer/job/manage-jobs",
    },
    {
      label: "Post New Job",
      icon: PostAddOutlined,
      path: "/employer/job/posted",
    },
    {
      label: "Applicants",
      icon: WorkOutline,
      path: "/employer/job/applicants",
    },
    {
      label: "Search",
      icon: Search,
      path: "/employer/search",
      links: [
        {
          label: "Saved Searches",
          path: "/employer/search/saved-search",
        },
      ],
    },
    {
      label: "My Folders",
      icon: FolderOutlined,
      path: "/employer/search/saved-search",
    },
    {
      label: "Billing & Subscription",
      icon: PaidOutlined,
      path: "/employer/subscription-plans",
    },
    {
      label: "Report",
      icon: DescriptionOutlined,
    },
    {
      label: "Chat",
      icon: MessageOutlined,
      path: "/chat",
    },
    {
      type: "divider",
    },
    {
      type: "text",
      section: "Settings",
    },
    {
      label: "Settings",
      icon: SettingsOutlined,
      path: "/employer/setting",
    },
    {
      label: "Help Center",
      icon: HelpOutline,
    },
  ],
  user: [
    {
      icon: HomeOutlined,
      label: "Home",
      path: "/",
    },
    {
      icon: InfoOutlined,
      label: "My Personal Information",
      path: "/job-seeker/general-info",
    },
    {
      icon: MessageOutlined,
      label: "Messages",
      path: "/chat",
      notifications: 3,
    },
    {
      icon: DescriptionOutlined,
      label: "My Applications",
      path: "/job-seeker/my-applications",
    },
    {
      icon: Search,
      label: "Find Jobs",
      path: "/search",
    },
    {
      icon: BusinessOutlined,
      label: "Browse Companies",
      path: "/job-seeker/browse-companies",
    },

    {
      icon: NotificationsActiveOutlined,
      label: "Notifications",
      path: "/notifications",
      notifications: 4,
    },
    {
      type: "divider",
    },
    {
      section: "Settings",
      type: "text",
    },
    {
      icon: SettingsOutlined,
      label: "Settings",
      path: "/job-seeker/setting",
    },
    {
      icon: HelpOutline,
      label: "Help Center",
      path: "#",
    },
  ],
};

export const applicantsFilters = {
  Residency: [
    { label: "All", count: 100, value: "all" },
    { label: "Egypt", count: 50, value: "egypt" },
    { label: "Qatar", count: 50, value: "qatar" },
  ],
  nationality: [
    { label: "All", count: 200, value: "all" },
    { label: "Egyptian", count: 120, value: "egyptian" },
    { label: "Saudi Arabian", count: 80, value: "saudi" },
  ],
  industry: [
    { label: "All", count: 300, value: "all" },
    { label: "Physicians", count: 150, value: "physicians" },
    { label: "Dentists", count: 50, value: "dentists" },
    { label: "Physical Therapists", count: 40, value: "physical_therapists" },
    { label: "Pharmacists", count: 30, value: "pharmacists" },
    { label: "Nurses", count: 30, value: "nurses" },
  ],
  category: [
    { label: "All", count: 200, value: "all" },
    { label: "Doctor", count: 100, value: "doctor" },
    { label: "Nurse", count: 50, value: "nurse" },
    { label: "Pharmaceutical", count: 30, value: "pharmaceutical" },
    { label: "Physicalists", count: 10, value: "physicalists" },
    { label: "Specialized", count: 10, value: "specialized" },
  ],
  educationLevel: [
    { label: "All", count: 250, value: "all" },
    { label: "Institute", count: 50, value: "institute" },
    { label: "Bachelor’s Degree", count: 100, value: "bachelor" },
    { label: "Doctorate Degree", count: 70, value: "doctorate" },
    { label: "Fellowship", count: 30, value: "fellowship" },
  ],
  yearsOfExperience: [
    { label: "All", count: 150, value: "all" },
    { label: "1-3", count: 50, value: "1-3" },
    { label: "3-5", count: 40, value: "3-5" },
    { label: "5-10", count: 30, value: "5-10" },
    { label: "+10", count: 30, value: "10+" },
  ],
  gender: [
    { label: "All", count: 300, value: "all" },
    { label: "Male", count: 200, value: "male" },
    { label: "Female", count: 100, value: "female" },
  ],
  age: [
    { label: "18-25", count: 40, value: "18-25" },
    { label: "26-35", count: 50, value: "26-35" },
    { label: "36-45", count: 30, value: "36-45" },
    { label: "46-60", count: 20, value: "46-60" },
    { label: "60+", count: 10, value: "60+" },
  ],
};
