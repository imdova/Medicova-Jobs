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
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
};

const user: UserProfile = {
  id: "aaeb9e66-ef4e-4a46-8bdd-fe687edd5794",
  userName: "abdelrahman-ahmed",
  about: "I'm Abd El-Rahman Ahmed, a Full Stack Developer and UI/UX Designer with expertise in creating user-focused digital solutions. I specialize in Next.js, Tailwind CSS, TypeScript, and MongoDB, developing high-performing, accessible, and visually stunning web applications. I have a strong foundation in both frontend and backend development, as well as mobile app development with React Native. My focus is on blending creative design with",
  title: "Senior Software Engineer",
  languages: ["English", "Spanish"],
  resume: "https://abdelrahman501.github.io/abdelrahman/resume/abdelrahman.pdf",
  socialLinks: {
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
  whatsapp: "1234567890",
  nationality: "American",
  maritalStatus: MaritalStatus.Single,
  hasDrivingLicence: true,
  country: { code: "EG", name: "Egypt" },
  state: { code: "C", name: "Cairo" },
  city: "Naser City",
  isPublic: true,
  categoryId: "9669773b-f883-4946-95ed-9da81caf6e0b",
  category: "Doctors",
  specialityId: "8daaf757-0e3f-4d4f-81d8-c3febad21617",
  speciality: "Cardiology",
  careerLevelId: "88fd0a64-ba36-463e-9713-905ce2be62ef",
  careerLevel: "Consultant",
  phone: "+201015753327",
  firstName: "abdelrahman",
  lastName: "ahmed",
  email: "abdelrahman.27@gmail.com",
  birth: "1990-06-15",
  avatar: "https://avatars.githubusercontent.com/u/104017661?v=4",
  type: "seeker",
  active: true,
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
  country: LocationItem;
  startYear: number;
  endYear: number;
  grade: string;
};
