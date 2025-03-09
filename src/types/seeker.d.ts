type JobApplicationData = {
  id: string;
  seekerId: string;
  jobId: string;
  answers?: { [key: string]: string };
};

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
