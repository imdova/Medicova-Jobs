import { JobWorkPlace } from "@/constants/enums/work-place.enum";
import { RoleState } from "./next-auth";
import { Permission } from "./permissions";
import { Gender } from "@/constants/enums/gender.enum";
import { EducationLevel } from "@/constants/enums/education-level.enum";
import { StartDateType } from "@/constants/enums/start-type.enum";
import { SalaryCurrency } from "@/constants/enums/currency.enum";
import { CompanyStatus } from "@/constants/enums/company-status.enum";
import { CompanySize } from "@/constants/enums/company-size.enum";
import { AlertColor, TextFieldProps } from "@mui/material";

export type Country = {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  currency: string;
  latitude: string;
  longitude: string;
};
export type CountryMin = {
  name: string;
  code: string;
};

export type NotificationType = {
  message: string;
  severity: AlertColor;
};
export type State = {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
};
export type City = {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
};

export interface Result<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface UserState {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  type: RoleState;
  photo: string | null;
  phone: string | null;
  companyId: string | null;
  companyName: string | null;
  companyUserName: string | null;
  companyEmail: string | null;
  companyPhoto: string | null;
  permissions: Permission[];
}

export interface UserProfile extends UserState {
  about: string | null;
  title: string | null;
  age: number | null;
  languages: string[] | null;
  resume: string | null;
  socialLinks: { [key: string]: string } | null;
  whatsapp: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  hasDrivingLicence: boolean | null;
  country: CountryMin | null;
  state: State | null;
  city: City | null;
  isPublic: boolean | null;
  category: string | null;
  speciality: string | null;
  careerLevel: string | null;
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
  country: CountryMin;
  startDate: string;
  endDate: string;
}

export interface Education {
  name: string;
  country: CountryMin;
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

type CountryInData = {
  name: string;
  code: string;
};
export interface Company {
  id: string;
  name: string;
  username: string;
  title?: string | null;
  about?: string;
  completencePercent?: number;
  isPrivate?: boolean;
  isProfitable?: boolean;
  status?: CompanyStatus | null;
  country?: CountryInData | null;
  state?: CountryInData | null;
  city?: string;
  size?: CompanySize | null;
  phone?: string;
  cover?: string;
  email?: string;
  yearFounded?: number | string;
  avatar?: string;
  socialLinks?: string;
  visible?: boolean;
  profileUrl?: string;
  companyTypeId?: string | null;
  companySectorId?: string | null;
  type?: string | null;
  sector?: string | null;
  banner1?: string | null;
  banner2?: string | null;
  banner3?: string | null;
}
export interface MiniCompany {
  name: string;
  industry: string;
  website: string;
  contact: string;
}

export type Sector = {
  id: string;
  name: string;
};
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
  company: MiniCompany;
}

export type SpecialtyItem = {
  id: string;
  name: string;
};
export type CareerLevels = {
  id: string;
  name: string;
};
export interface JobCategory {
  id: string;
  name: string;
  // specialities: SpecialtyItem[];
  // careerLevels: CareerLevels[];
}
export interface EmploymentType {
  id: string;
  name: string;
}

export interface Industry {
  id: string;
  name: string;
}
export type JobsTabs = "all" | "active" | "closed" | "expired" | "draft";

export interface JobData {
  id?: string;
  companyId: string | null;
  company?: Company;
  title: string;
  jobIndustryId: string | null;
  jobSpecialityId: string | null;
  jobCategoryId: string | null;
  jobCareerLevelId: string | null;
  jobEmploymentTypeId: string | null;
  jobWorkPlace: JobWorkPlace | null | "";
  gender: Gender | null;
  minAge: number | null;
  maxAge: number | null;
  educationLevel: EducationLevel | null | "";
  country: CountryInData | null;
  state: CountryInData | null;
  city: string | null;
  maxExpYears: number | null;
  minExpYears: number | null;
  hideSalary: boolean | null;
  salaryRangeStart: number | null;
  salaryRangeEnd: number | null;
  salaryCurrency: SalaryCurrency | null | "";
  availableVacancies: number | null;
  description: string | null;
  requirements: string | null;
  salaryDetails: string | null;
  keywords: string[] | null;
  skills: string[] | null;
  questions: string[] | null;
  showCompany: boolean | null;
  recieveEmails: boolean | null;
  jobEmail: string | null;
  draft: boolean | null;
  active: boolean | null;
  closed: boolean | null;
  validTo: string | null; // ISO date string

  applications?: number | null; // Not in NewJobData

  startDateType: StartDateType | null | "";
  created_at?: string | null; // ISO date string 
  updatedAt?: string | null; // ISO date string 
  jobIndustry?: string | null;
  jobSpeciality?: string | null;
  jobCategory?: string | null;
  jobCareerLevel?: string | null;
  jobEmploymentType?: string | null;
}

export type JobStringData = Omit<
  JobData,
  "country" | "keywords" | "skills" | "questions"
> & {
  country: string;
  keywords: string;
  skills: string;
  questions: string;
};

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
  pattern?: string;
  notifications?: number;
  section?: string; // Optional section header
  type?: "divider" | "text" | "collapse" | "supLink" | "profile";
  links?: NavItem[];
};

export type Role = {
  permissions: { name: Permission }[];
};

export type ModalActionType = "STAY" | "LEAVE" | "CUSTOM";

export interface ModalButton {
  label: string;
  actionType: ModalActionType;
  variant?: "primary" | "secondary";
}

export interface ModalState {
  isOpen: boolean;
  message: string;
  buttons: ModalButton[];
  navigationUrl?: string;
}

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "textEditor"
  | "select"
  | "search-select"
  | "checkbox";

export interface Option {
  value: string | number;
  label: string;
}

// Updated FieldConfig to support multiple hidden fields
export interface FieldConfig<T = any> {
  name: keyof T;
  label?: string;
  type: FieldType;
  required?: boolean;
  dependsOn?: string; // Field this depends on
  validation?: any;
  gridProps?: {
    xs?: number;
    sm?: number;
    md?: number;
  };
  resetFields?: (string | number)[]; // New property for fields to reset
  textFieldProps?: Partial<TextFieldProps>;
  component?: React.ComponentType<any>;
  componentProps?: Record<string, any>;
  // options?: { label: string; value: string | number }[];
  options?: Option[] // Updated to support dynamic options
  hideFieldNames?: (keyof T)[];
  onChange?: (value: any) => void; // Updated to include formMethods
}
export interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  fields: FieldConfig[];
  title: string;
  description?: string;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
  loading?: boolean;
  error?: string;
}
