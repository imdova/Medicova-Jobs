import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import PaymentIcon from "@mui/icons-material/Payment";
import ReportIcon from "@mui/icons-material/Assessment";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import StarsIcon from "@mui/icons-material/Stars";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DescriptionIcon from "@mui/icons-material/Description";
import { LinkType } from "@/types/side-bar";

export const icons = {
  home: HomeOutlinedIcon,
  dashBoard: DashboardIcon,
  profile: BusinessIcon,
  job: WorkIcon,
  search: SearchIcon,
  wallet: PaymentIcon,
  report: ReportIcon,
  chat: ChatIcon,
  settings: SettingsIcon,
  help: HelpIcon,
  info: InfoIcon,
  school: SchoolIcon,
  star: StarsIcon,
  skill: PsychologyIcon,
  upload: CloudUploadIcon,
  work: WorkHistoryIcon,
  workOT: WorkOutlineIcon,
  manage: WorkHistoryIcon,
  PeopleIcon: PeopleIcon,
  AccountCircleIcon: AccountCircleIcon,
  ManageAccountsIcon: ManageAccountsIcon,
  CorporateFareIcon: CorporateFareIcon,
  DescriptionIcon: DescriptionIcon,
};

export const employerSideBarLinks: LinkType[] = [
  {
    title: "Dashboard",
    icon: "dashBoard",
    kind: "collapse",
    links: [
      {
        title: "OverView",
        url: "/employer/dashboard",
      },
      {
        title: "Analytics",
      },
      {
        title: "Report",
      },
    ],
  },
  {
    title: "Company Profile",
    url: "/employer/profile",
    icon: "profile",
  },
  {
    title: "My Jobs",
    icon: "job",
    kind: "collapse",
    links: [
      {
        title: "Manage Jobs",
        url: "/employer/job/manage-jobs",
      },
      {
        title: "Posted Jobs",
        url: "/employer/job/posted",
      },
      {
        title: "Applicants",
        url: "/employer/job/applicants",
      },
      {
        title: "Job Analytics",
      },
    ],
  },
  {
    title: "Search",
    icon: "search",
    kind: "collapse",
    links: [
      {
        title: "Search Candidates",
        url: "/employer/search/",
      },
      {
        title: "Saved Searches",
        url: "/employer/search/saved-search",
      },
    ],
  },
  {
    title: "Billing & Subscription",
    icon: "wallet",
    url: "/employer/subscription-plans",
  },
  {
    title: "Report",
    icon: "report",
  },
  {
    title: "Chat",
    icon: "chat",
  },
  {
    kind: "divider",
  },
  {
    kind: "title",
    title: "Settings",
  },
  {
    title: "Settings",
    icon: "settings",
    url: "/employer/setting",
  },
  {
    title: "Help Center",
    icon: "help",
  },
];

export const jobSeekerSideBarLinks: LinkType[] = [
  {
    title: "Home page",
    icon: "home",
    url: "/",
  },
  {
    title: "Profile ",
    icon: "AccountCircleIcon",
    kind: "collapse",
    links: [
      {
        title: "View Profile",
        url: "/job-seeker/general-info",
      },
      {
        title: "Personal Info",
        url: "/job-seeker/profile",
      },
    ],
  },
  {
    title: "Career References",
    icon: "ManageAccountsIcon",
    url: "/job-seeker/career-references",
  },
  {
    title: "Browse Companies",
    icon: "CorporateFareIcon",
    url: "/job-seeker/browse-companies",
  },
  {
    title: "My Applications",
    icon: "DescriptionIcon",
    url: "/job-seeker/my-applications",
  },
  {
    kind: "divider",
  },
  {
    kind: "title",
    title: "Settings",
  },
  {
    title: "Settings",
    icon: "settings",
    url: "/job-seeker/setting",
  },
  {
    title: "Help Center",
    icon: "help",
    url: "#",
  },
];

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
