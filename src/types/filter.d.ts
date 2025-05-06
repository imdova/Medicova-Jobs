type FilterItem = {
  label: string;
  count?: number;
  icon?: React.ReactNode;
  value: string;
};

type FilterParam = {
  sectionKey: string;
  value: string[];
};

type FilterType = {
  name: string;
  sectionKey: string;
  items: FilterItem[];
  multiple?: boolean;
  searchable?: boolean;
  resetSections?: string[];
  maxItems?: number;
};

type FilterProps = {
  className?: string;
  sections: FilterType[];
};

type FilterDrawerProps = FilterProps & { isOpen: boolean; onClose: () => void };

type Aggregations = {
  country: { code: string; count: number }[];
  state: { code: string; count: number }[];
  nationality: { name: string; count: number }[];
  speciality: { id: string; count: number }[];
  category: { id: string; count: number }[];
  careerLevel: { id: string; count: number }[];
  educationLevel: { name: string; count: number }[];
  gender: { name: string; count: number }[];
  experienceYears: { from: number; to: number; count: number }[];
  age: { from: number; to: number; count: number }[];
};
type JobsAggregations = {
  industry: { id: string; name?: string; count: number }[];
  speciality: { id: string; name?: string; count: number }[];
  category: { id: string; name?: string; count: number }[];
  careerLevel: { id: string; name?: string; count: number }[];
  employmentType: { id: string; name?: string; count: number }[];
  workPlace: { name: string; name?: string; count: number }[];
  gender: { name: string; count: number }[];
  educationLevel: { name: string; count: number }[];
  country: { code: string; name?: string; count: number }[];
  state: { code: string; count: number }[];
  ageRange: { from: number; to: number; count: number }[];
  salaryRange: { from: number; to: number; count: number }[];
};
