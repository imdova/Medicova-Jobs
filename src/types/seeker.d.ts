interface ApplicationsFilter {
  page?: number;
  limit?: number;
  jobId?: string;
  seekerId?: string;
  companyId?: string;
  startDate?: string;
}

type LocationItem = {
  name: string;
  code: string;
};
type UserProfile = {
  id: string;
  userName: string;

  phone: string | null; // not in response
  email: string | null; // not in response
  firstName: string | null; // not in response
  lastName: string | null; // not in response
  avatar: string | null; // not in response
  birthday: string | null; // not in response
  country: LocationItem | null; // not in response
  state: LocationItem | null; // not in response
  city: string | null; // not in response
  isAvailable: boolean | null; // not in response --> this for "Open For Opportunities"
  isMarried: boolean | null; // not in response

  categoryId: string | null; // not in response
  category?: string | null; // not in response

  specialityId: string | null; // not in response
  speciality?: string | null; // not in response

  careerLevelId: string | null; // not in response
  careerLevel?: string | null; // not in response

  about: string | null;
  title: string | null;
  languages: string[] | null;
  resume: string | null;
  socialLinks: Record<string, string> | null;
  whatsapp: string | null;
  nationality: string | null;
  maritalStatus: string | null;
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

  ///
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
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
type Applicants = {
  id: string; // id of the application
  seekerId: string; // id for the job seeker who applied.
  status: ApplicationStatus; // status of the application
  answers: Record<string, string> | null; // stores the applicant's responses to job-specific questions, if any.
  jobId: string; // id of the job
  avatar: string;
  userName: string;
  firstName: string;
  lastName: string;
  applyDate: string;
  title: string;
  whatsApp: string;
  phone: string;
  email: string;
  country: LocationItem;
  state: LocationItem;
  city: string;
  yearsOfExperience: number;
  category: string;
  specialty: string;
  careerLevel: string;
  isShortlisted: boolean;
  isLocked: boolean;
  isAvailable: boolean;
  lastExperience: ExperienceData | null;
  lastEducation: EducationData | null;
  folders: string[]; // An array of folder IDs where the applicant's profile is organized or sto
};

// Represents the data structure for potential candidates who can be invited to apply for a job.
// This type is used to store and display information about individuals who match the job criteria
// but have not yet applied.
type CandidateType = {
  id: string; // id for the candidate (job seeker).
  avatar: string;
  userName: string;
  firstName: string;
  lastName: string;
  applyDate: string;
  title: string;
  whatsApp: string;
  phone: string;
  email: string;
  country: LocationItem;
  state: LocationItem;
  city: string;
  yearsOfExperience: number;
  category: string;
  specialty: string;
  careerLevel: string;
  isShortlisted: boolean;
  isUnlocked: boolean;
  // isLocked: boolean;
  isAvailable: boolean;
  lastExperience: ExperienceData | null;
  lastEducation: EducationData | null;
  folders: string[]; // An array of folder IDs where the candidate's profile is organized or stored.
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
  country: LocationItem;
  startYear: number;
  endYear: number;
  grade: string;
};
