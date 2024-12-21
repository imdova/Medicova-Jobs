interface Country {
  name: string;
  code: string;
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
