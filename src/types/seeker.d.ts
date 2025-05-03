interface ApplicationsFilter {
  page?: number;
  limit?: number;
  jobId?: string | null;
  seekerId?: string | null;
  companyId?: string | null;
  startDate?: string | null;
  status?: ApplicationStatus;
}
type ProfileTabs = "personal-info" | "professional" | "career-preference";
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
type NotificationSettings = {
  reciveApplications: boolean;
  reciveJobs: boolean;
  reciveRecommendations: boolean;
};
interface SocialMediaLinks {
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  snapchat?: string;
  pinterest?: string;
  reddit?: string;
  discord?: string;
  telegram?: string;
  whatsapp?: string;
}

type UserProfile = {
  id: string;
  userName: string;
  phone: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  birthDate: string | null;
  type: string;
  active: boolean;
  about: string | null;
  title: string | null;
  languages: LanguageProficiency[] | null;
  resume: string | null;
  socialLinks: SocialMediaLinks | null;
  whatsapp: string | null;
  nationality: string | null;
  maritalStatus: MaritalStatus | null;
  hasDrivingLicence: boolean | null;
  country: LocationItem | null;
  state: LocationItem | null;
  city: string | null;
  isPublic: boolean;
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
  // isVerified: boolean;

  // isEmailVerified: boolean;

  // isImmediate: boolean;
  isLocked: boolean;

  gender: string; // male | female
};

enum LanguageName {
  Arabic = "Arabic",
  English = "English",
  French = "French",
  German = "German",
}

enum LanguageProficiencyLevel {
  Native = "Native",
  Fluent = "Fluent",
  Intermediate = "Intermediate",
  Beginner = "Beginner",
}

type LanguageProficiency = {
  name: LanguageName;
  proficiency: LanguageProficiencyLevel;
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
interface ApplicationsType {
  id: string;
  seekerId: string;
  status: ApplicationStatus;
  answers: Record<string, string> | null;
  job: {
    id: string;
    title: string;
    // jobSpeciality?: string | null; // add this please
    // jobCategory?: string | null; // add this please
    // jobCareerLevel?: string | null; // add this please
    // jobEmploymentType?: string | null; // add this please
    company: {
      id: string;
      // name: string; // add this please
      // username: string; // add this please
      // avatar: string; // add this please
    };
  };
  applicant: {
    id: string;
    avatar: string;
    userName: string;
    firstName: string;
    lastName: string;
    title: string | null;
    whatsApp: string | null;
    phone: string;
    email: string;
    country: LocationItem | null;
    state: LocationItem | null;
    city: string | null;
    category: string | null;
    specialty: string | null;
    careerLevel: string | null;
    isLocked: boolean;
    yearsOfExperience: {
      totalYears: string;
    };
    lastEducation: EducationData | null;
    lastExperience: ExperienceData | null;
    folders: {
      folderId: string;
      folderName: string;
      isFavorite: boolean;
    }[];
  };
  created_at: string;
  updated_at: string;
  _version: number;
}

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
  birthDate: string | null;
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
  program: string;
  country: LocationItem;
  startYear: number;
  endYear: number;
  grade: string;
};
type CertificationData = {
  id: string;
  title: string;
  provider: string;
  issueDate: string;
  description: string;
};

type ActivityData = {
  id: string;
  title: string;
  provider: string;
  date: string;
};

type SkillData = {
  id: string;
  name: string;
};
