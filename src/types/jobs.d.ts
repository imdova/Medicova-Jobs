export interface SearchBreakdown {
  industry: Record<string, number>;
  speciality: Record<string, number>;
  category: Record<string, number>;
  careerLevel: Record<string, number>;
  employmentType: Record<string, number>;
  workPlace: Record<string, number>;
  gender: Record<string, number>;
  education: Record<string, number>;
  country: Record<string, number>;
  state: Record<string, number>;
  ageRange: Record<string, number>;
  salaryRange: Record<string, number>;
}

export interface SearchResult {
  data: JobData[];
  total: number;
  page: number;
  limit: number;
  breakdown: SearchBreakdown;
}
export interface JobSearchFilter {
  q?: string;
  industryId?: string[];
  specialityId?: string[];
  categoryId?: string[];
  careerLevelId?: string[];
  employmentTypeId?: string[];
  workPlace?: JobWorkPlace[];
  gender?: Gender[];
  educationLevel?: EducationLevel[];
  countryCode?: string[];
  stateCode?: string[];
  salaryFrom?: number;
  salaryTo?: number;
  ageFrom?: number;
  ageTo?: number;
  page?: number;
  limit?: number;
  // minExpYears?: number;
  // maxExpYears?: number;
}
