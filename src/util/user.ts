interface Company {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  name: string | null;
  title: string | null;
  username: string | null;
  isPrivate: boolean | null;
  about: string | null;
  isProfitable: boolean | null;
  status: string;
  country: string | null;
  state: string | null;
  city: string | null;
  size: string;
  phone: string;
  email: string;
  yearFounded: number | null;
  banner1: string | null;
  banner2: string | null;
  banner3: string | null;
  avatar: string | null;
  cover: string | null;
  socialLinks: string[] | null;
  completencePercent: number;
  visible: boolean | null;
  profileUrl: string | null;
  companyTypeId: string | null;
  companySectorId: string | null;
}

interface User {
  permissions: string[];
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string | null;
  avatar: string | null;
  type: string;
  userName: string | null;
  active: boolean;
}

interface InputData {
  company: Company;
  user: User;
}

interface TransformedData {
  // Base data
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string | null;
  photo: string | null;
  phone: string;
  type: string;
  permissions: string[];
  // Employer-specific fields
  companyId: string | null;
  companyUserName: string | null;
  companyName: string | null;
  companyPhoto: string | null;
  companyEmail: string | null;
}

export function transLoginData(input: InputData): TransformedData {
  const { user, company } = input;

  // Base data from user
  const baseData = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    photo: user.avatar,
    phone: user.phone,
    type: user.type,
    permissions: user.permissions,
  };

  // If user is an employer, add company-related fields
  const employerData =
    user.type === "employer"
      ? {
          companyId: company.id,
          companyUserName: company.username,
          companyName: company.name,
          companyPhoto: company.avatar,
          companyEmail: company.email,
        }
      : {
          companyId: null,
          companyUserName: null,
          companyName: null,
          companyPhoto: null,
          companyEmail: null,
        };

  return {
    ...baseData,
    ...employerData,
  };
}

export function transformRegisterData(input: any): TransformedData {
  const {
    id,
    email,
    firstName,
    lastName,
    phone,
    avatar,
    type,
    permissions,
    companyId,
    userName,
  } = input;

  // Base data from input
  const baseData = {
    id,
    email,
    firstName,
    lastName,
    userName: userName || null, // No username field in input data
    photo: avatar,
    phone,
    type,
    permissions,
  };

  // If user is an employer, add company-related fields
  const employerData =
    type === "employer"
      ? {
          companyId,
          companyUserName: null, // Not provided in input
          companyName: null, // Not provided in input
          companyPhoto: null, // Not provided in input
          companyEmail: null, // Not provided in input
        }
      : {
          companyId: null,
          companyUserName: null,
          companyName: null,
          companyPhoto: null,
          companyEmail: null,
        };

  return {
    ...baseData,
    ...employerData,
  };
}
