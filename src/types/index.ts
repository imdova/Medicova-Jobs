import { JobWorkPlace } from "@/constants/enums/work-place.enum";
import { RoleState } from "./next-auth";
import { Permission } from "./permissions";
import { Gender } from "@/constants/enums/gender.enum";
import { EducationLevel } from "@/constants/enums/education-level.enum";
import { StartDateType } from "@/constants/enums/start-type.enum";
import { SalaryCurrency } from "@/constants/enums/currency.enum";
import { CompanyStatus } from "@/constants/enums/company-status.enum";
import { CompanySize } from "@/constants/enums/company-size.enum";
import { AlertColor, SelectProps, TextFieldProps } from "@mui/material";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { User } from "next-auth";
import { DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

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

export interface registerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface BaseHeaderProps {
  user?: User;
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
  socialLinks?: Record<string, string>;
  visible?: boolean;
  profileUrl?: string;
  companyTypeId?: string | null;
  companySectorId?: string | null;
  companySectorName?: string | null;
  companyTypeName?: string | null;
  banner1?: string | null;
  banner2?: string | null;
  banner3?: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string

  // TODO: add open jobs
  openJobs?: number | null;

  // only for admins
  revenue?: number | null;
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
  company?: Pick<
    Company,
    | "id"
    | "name"
    | "username"
    | "about"
    | "banner1"
    | "banner2"
    | "banner3"
    | "avatar"
  >;
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

  applicationCount?: number | null; // Not in NewJobData

  startDateType: StartDateType | null | "";

  jobIndustry?: string | null;
  jobSpeciality?: string | null;
  jobCategory?: string | null;
  jobCareerLevel?: string | null;
  jobEmploymentType?: string | null;

  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export type CareerPreference = {
  id?: string;
  seekerId: string | null;
  jobEmploymentTypesIds: string[];
  industriesIds: string[];
  availableForHiringDate: string | null;
  relocation: boolean;
  jobWorkPlace: JobWorkPlace | null;
  country: LocationItem | null;
  state: LocationItem | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
};

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
  id: string;
  name: string;
  companyId: string;
  seekersCount: number;
  _version: number;
  created_at: string;
  updated_at: string;
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
  [key in RoleState | "unEmployee" | "default"]: NavItem[];
};

export type CommonLinks = {
  [key in CommonLinksType]: NavItem[];
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
export interface ActiveLinkResult {
  activeIndex: number;
  parentId: number | null;
}
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
  | "phone"
  | "password"
  | "date"
  | "textEditor"
  | "select"
  | "search-select"
  | "checkbox"
  | "component"
  | "radio"
  | "file";

export interface Option<T = Record<string, any>> {
  value: keyof T;
  label: string;
  icon?: React.ReactNode;
}

// Updated FieldConfig to support multiple hidden fields
export interface FieldConfig<T = any> {
  name: Path<T>;
  label?: string;
  type?: FieldType;
  required?: boolean;
  dependsOn?: Path<T>; // Field this depends on
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  gridProps?: {
    xs?: number;
    sm?: number;
    md?: number;
  };
  multiple?: boolean;
  resetFields?: FieldConfig<T>["name"][]; // New property for fields to reset
  textFieldProps?: Partial<TextFieldProps>;
  dateFieldProps?: Partial<DatePickerProps<Dayjs, boolean>>;
  selectProps?: Partial<SelectProps>;
  component?: React.ComponentType<any>;
  componentProps?: Record<string, any>;
  // options?: { label: string; value: string | number }[];
  options?: Option[]; // Updated to support dynamic options
  hideFieldNames?: FieldConfig<T>["name"][];
  onChange?: (value: any) => void; // Updated to include formMethods
}
export interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete?: (data: any) => void;
  fields: FieldConfig[];
  title?: string;
  description?: string;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
  loading?: boolean;
  deleteLoading?: boolean;
  error?: string;
  removeField?: (fieldName: string) => void;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;
  ///
  submitButtonText?: string;
  deleteButtonText?: string;
  cancelButtonText?: string;
}

export interface ColumnConfig<T> {
  key?: Path<T>; // Field to display
  header?: string; // Column header text
  sortable?: boolean; // Enable sorting
  render?: (item: T) => React.ReactNode; // Custom render function
  width?: string | number; // Optional column width
}

export interface SortConfig<T> {
  key: Path<T>;
  direction: "asc" | "desc";
}
