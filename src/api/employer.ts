import { API_URL } from ".";

export const API_EMPLOYER_BASE = API_URL + "/api/v1.0.0/employer";
// Companies
export const COMPANIES = API_EMPLOYER_BASE + "/companies";
// export const API_CREATE_COMPANY = COMPANIES; // POST
// export const API_GET_COMPANIES = COMPANIES; // GET
export const API_GET_COMPANY_BY_USER_NAME = COMPANIES + "/userName/"; // GET
export const API_GET_COMPANY_BY_ID = COMPANIES + "/"; // GET + [companyID]
export const API_UPDATE_COMPANY_USER_NAME = COMPANIES + "/userName"; // PATCH
export const API_UPDATE_COMPANY = COMPANIES + "/"; // PATCH + [companyID]
// export const API_DELETE_COMPANY = COMPANIES + "/"; // DELETE + [companyID]

// Employees
export const EMPLOYEES = API_EMPLOYER_BASE + "/employees";
export const API_CREATE_EMPLOYEE = EMPLOYEES; // POST
export const API_GET_EMPLOYEES = EMPLOYEES; // GET
export const API_GET_EMPLOYEE_BY_ID = EMPLOYEES + "/"; // GET + [employeeID]
export const API_UPDATE_EMPLOYEE = EMPLOYEES + "/"; // PATCH + [employeeID]
export const API_DELETE_EMPLOYEE = EMPLOYEES + "/"; // DELETE + [employeeID]

// Jobs
export const JOBS = API_EMPLOYER_BASE + "/jobs";
export const API_CREATE_JOB = JOBS; // POST
export const API_GET_JOBS = JOBS; // GET
export const API_GET_JOB_BY_ID = JOBS + "/"; // GET + [jobID]
export const API_UPDATE_JOB = JOBS + "/"; // PATCH + [jobID]
export const API_DELETE_JOB = JOBS + "/"; // DELETE + [jobID]

// Job Industries
export const JOB_INDUSTRIES = API_EMPLOYER_BASE + "/job-industries";
export const API_CREATE_JOB_INDUSTRY = JOB_INDUSTRIES; // POST
export const API_GET_JOB_INDUSTRIES = JOB_INDUSTRIES; // GET
export const API_GET_JOB_INDUSTRY_BY_ID = JOB_INDUSTRIES + "/"; // GET + [id]
export const API_UPDATE_JOB_INDUSTRY = JOB_INDUSTRIES + "/"; // PATCH + [id]
export const API_DELETE_JOB_INDUSTRY = JOB_INDUSTRIES + "/"; // DELETE + [id]

// Job Categories
export const JOB_CATEGORIES = API_EMPLOYER_BASE + "/job-categories";
export const API_CREATE_JOB_CATEGORY = JOB_CATEGORIES; // POST
export const API_GET_JOB_CATEGORIES = JOB_CATEGORIES; // GET
export const API_GET_JOB_CATEGORIES_BY_INDUSTRY =
  JOB_CATEGORIES + "/industries"; // GET
export const API_GET_JOB_CATEGORY_BY_ID = JOB_CATEGORIES + "/"; // GET + [id]
export const API_UPDATE_JOB_CATEGORY = JOB_CATEGORIES + "/"; // PATCH + [id]
export const API_DELETE_JOB_CATEGORY = JOB_CATEGORIES + "/"; // DELETE + [id]

// Job Specialities
export const JOB_SPECIALITIES = API_EMPLOYER_BASE + "/job-specialities";
export const API_CREATE_JOB_SPECIALITY = JOB_SPECIALITIES; // POST
export const API_GET_JOB_SPECIALITIES = JOB_SPECIALITIES; // GET
export const API_GET_JOB_SPECIALITY_BY_ID = JOB_SPECIALITIES + "/"; // GET + [id]
export const API_UPDATE_JOB_SPECIALITY = JOB_SPECIALITIES + "/"; // PATCH + [id]
export const API_DELETE_JOB_SPECIALITY = JOB_SPECIALITIES + "/"; // DELETE + [id]

// Job Career Levels
export const JOB_CAREER_LEVELS = API_EMPLOYER_BASE + "/job-career-levels";
export const API_CREATE_JOB_CAREER_LEVEL = JOB_CAREER_LEVELS; // POST
export const API_GET_JOB_CAREER_LEVELS = JOB_CAREER_LEVELS; // GET
export const API_GET_JOB_CAREER_LEVEL_BY_ID = JOB_CAREER_LEVELS + "/"; // GET + [id]
export const API_UPDATE_JOB_CAREER_LEVEL = JOB_CAREER_LEVELS + "/"; // PATCH + [id]
export const API_DELETE_JOB_CAREER_LEVEL = JOB_CAREER_LEVELS + "/"; // DELETE + [id]

// Job Employment Types
export const JOB_EMPLOYMENT_TYPES = API_EMPLOYER_BASE + "/job-employment-types";
export const API_CREATE_JOB_EMPLOYMENT_TYPE = JOB_EMPLOYMENT_TYPES; // POST
export const API_GET_JOB_EMPLOYMENT_TYPES = JOB_EMPLOYMENT_TYPES; // GET
export const API_GET_JOB_EMPLOYMENT_TYPE_BY_ID = JOB_EMPLOYMENT_TYPES + "/"; // GET + [id]
export const API_UPDATE_JOB_EMPLOYMENT_TYPE = JOB_EMPLOYMENT_TYPES + "/"; // PATCH + [id]
export const API_DELETE_JOB_EMPLOYMENT_TYPE = JOB_EMPLOYMENT_TYPES + "/"; // DELETE + [id]
