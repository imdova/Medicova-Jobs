import { RoleState } from "./next-auth";

interface Country {
  name: string;
  code: string;
}

export interface UserState {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  //
  role?: RoleState;
  //
  roles: string[];
  active: boolean;
  photo?: string;
  birth: string | null;
  phone: string | null;
  companyId: string | null;
  created_at: string | null;
  deleted_at: string | null;
  updated_at: string | null;
}

export interface registerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface BaseHeaderProps {
  user?: UserState;
  pathname: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  timestamp: string;
}

export interface Experience {
  name: string;
  country: Country;
  startDate: string;
  endDate: string;
}

export interface Education {
  name: string;
  country: Country;
  specialty: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ContactInfo {
  whatsapp: string;
  phoneNumber: string;
  email: string;
}

export interface Doctor {
  id: string;
  image: string;
  name: string;
  location: string;
  specialty: string;
  yearsOfExperience: number;
  consultant: boolean;
  field: string;
  contactInfo: ContactInfo;
  experience: Experience[];
  education: Education[];
  available: boolean;
}
export interface Company {
  name: string;
  industry: string;
  website: string;
  contact: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  education: string;
  specialty: string;
  features: string[];
  timeStamps: Date;
  description: string;
  requirements: string[];
  additionalDetails: string;
  skills: string[];
  relatedSearch: string[];
  company: Company;
}

export interface FilterOption {
  label: string;
  count: number;
  value: string;
}

export interface FilterSectionType {
  key: string;
  title: string;
  options: FilterOption[];
}

export interface Folder {
  id: number;
  name: string;
  candidates: number;
  lastModified: Date;
}

export interface SortFolders {
  key: keyof Folder;
  direction: "asc" | "desc";
}

export interface Specialty {
  id: number | string;
  image: string;
  title: string;
  jobsNumber: number;
  link: string;
}

export interface CompanyItem {
  id: string | number;
  image: string;
  title: string;
  description: string;
  tag: string;
}

export interface NotificationItem {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: { status: "normal" | "warning" | "error" | "success"; text: string }[];
  timeStamp: Date;
  isRead: boolean;
  readTime: Date | null;
  category: string;
  image: string;
}

export interface HeaderLink {
  title: string;
  url: string;
}
export type CommonLinksType = "home";

export type RoleBasedLinks = {
  [key in RoleState]: HeaderLink[];
};
export type CommonLinks = {
  [key in CommonLinksType]: HeaderLink[];
};

export type NavItem = {
  id: number;
  icon?: React.ElementType;
  label?: string;
  path?: string;
  notifications?: number;
  section?: string; // Optional section header
  type?: "divider" | "text" | "collapse" | "supLink";
  links?: NavItem[];
};
