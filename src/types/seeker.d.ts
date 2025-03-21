interface ApplicationsFilter {
  page?: number;
  limit?: number;
  jobId?: string;
  seekerId?: string;
  companyId?: string;
  startDate?: string;
}
enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
}
type LocationItem = {
  name: string;
  code: string;
};
type UserProfile = {
  id: string;
  userName: string;
  phone: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  birth: string | null;
  type: string;
  active: boolean;
  about: string | null;
  title: string | null;
  languages: LanguageProficiency[] | null;
  resume: string | null;
  socialLinks: Record<string, string> | null;
  whatsapp: string | null;
  nationality: string | null;
  maritalStatus: MaritalStatus | null;
  hasDrivingLicence: boolean | null;
  country: LocationItem | null;
  state: LocationItem | null;
  city: string | null;
  isPublic: boolean | null;
  categoryId: string | null;
  category: string | null;
  specialityId: string | null;
  speciality: string | null;
  careerLevelId: string | null;
  careerLevel: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;

  /// TODO: need to add
  isVerified: boolean;
};

type LanguageProficiency = {
  name: string;
  proficiency: string;
};

type JobApplicationData = {
  id: string;
  created_at: string;
  seekerId: string;
  status: string;
  answers: Record<string, string> | null;
  job: {
    id: string;
  };
};

type TapType = "all" | "locked" | "unlocked" | "shortListed";

// Represents the data structure for job applicants. This type is used to store and display
// information about individuals who have applied for a specific job posting.
type ApplicationsType = {
  id: string; // id of the application
  seekerId: string; // id for the job seeker who applied
  status: ApplicationStatus; // status of the application
  answers: Record<string, string> | null; // stores the applicant's responses to job-specific questions, if any
  job: {
    id: string; // id of the job
    company: {
      id: string; // id of the company offering the job
    };
  };
  applicant: {
    id: string; // id for the job seeker
    avatar: string; // URL to the applicant's avatar image
    userName: string; // username of the applicant
    firstName: string; // first name of the applicant
    lastName: string; // last name of the applicant
    title: string | null; // title of the applicant
    whatsApp: string | null; // WhatsApp contact of the applicant
    phone: string; // phone number of the applicant
    email: string; // email address of the applicant
    country: LocationItem | null; // country of the applicant
    state: LocationItem | null; // state of the applicant
    city: string | null; // city of the applicant
    category: string | null; // category of the applicant
    specialty: string | null; // specialty of the applicant
    careerLevel: string | null; // career level of the applicant
    isLocked: boolean; // whether the applicant is locked
    yearsOfExperience: {
      totalYears: string; // total years of experience of the applicant
    };
    lastEducation: EducationData | null; // last education of the applicant
    lastExperience: ExperienceData | null; // last experience of the applicant
    folders: {
      folderId: string; // id of the folder
      folderName: string; // name of the folder
      isFavorite: boolean; // whether the folder is marked as favorite
    }[];
  };
  created_at: string; // creation date of the application
  updated_at: string; // last update date of the application
  _version: number; // version of the application record
};

// Represents the data structure for potential candidates who can be invited to apply for a job.
// This type is used to store and display information about individuals who match the job criteria
// but have not yet applied.
type CandidateType = {
  id: string; // id for the candidate (job seeker).
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  userName: string;
  about: string | null;
  title: string | null;
  languages: string[] | null;
  resume: string | null;
  socialLinks: Record<string, string> | null;
  whatsapp: string | null;
  nationality: string | null;
  maritalStatus: MaritalStatus | null;
  hasDrivingLicence: boolean | null;
  country: LocationItem | null;
  state: LocationItem | null;
  city: string | null;
  isPublic: boolean | null;
  categoryId: string | null;
  category: string | null;
  specialityId: string | null;
  speciality: string | null;
  careerLevelId: string | null;
  careerLevel: string | null;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  birth: string | null;
  avatar: string | null;
  type: string;
  active: boolean;
  isLocked: boolean;
  isFavorite: boolean;
};

type ExperienceData = {
  id: string;
  name: string;
  title: string;
  country: LocationItem;
  state: LocationItem;
  city: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
};

type EducationData = {
  id: string;
  inistitute: string;
  degree: string;
  // country: LocationItem;
  countryCode: string;
  startYear: number;
  endYear: number;
  grade: string;
};
type CertificationData = {
  id: string;
  title: string;
  provider: string;
  speciality: string;
  issueDate: string;
  completionDate: string;
  description: string;
};

type ActivityData = {
  id: string;
  title: string;
  provider: string;
  issueDate: string;
  completionDate: string;
  description: string;
  isPresent: boolean;
};

type SkillData = {
  id: string;
  name: string;
};
