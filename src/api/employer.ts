import { API_URL } from ".";

export const API_EMPLOYER_BASE = API_URL + "/employer/api/v1.0";
// Companies
export const COMPANIES = API_EMPLOYER_BASE + "/companies";
export const API_CREATE_COMPANY = COMPANIES; // POST
export const API_GET_COMPANIES = COMPANIES; // GET
export const API_GET_COMPANY_BY_ID = COMPANIES + "/"; // GET + [companyID]
export const API_UPDATE_COMPANY = COMPANIES + "/"; // PATCH + [companyID]
export const API_DELETE_COMPANY = COMPANIES + "/"; // DELETE + [companyID]

// Company Sectors
export const COMPANY_SECTORS = API_EMPLOYER_BASE + "/company-sector";
export const API_CREATE_COMPANY_SECTOR = COMPANY_SECTORS; // POST
export const API_GET_COMPANY_SECTORS = COMPANY_SECTORS; // GET
export const API_GET_COMPANY_SECTOR_BY_ID = COMPANY_SECTORS + "/"; // GET + [sectorID]
export const API_UPDATE_COMPANY_SECTOR = COMPANY_SECTORS + "/"; // PATCH + [sectorID]
export const API_DELETE_COMPANY_SECTOR = COMPANY_SECTORS + "/"; // DELETE + [sectorID]

// Company Types
export const COMPANY_TYPES = API_EMPLOYER_BASE + "/company-type";
export const API_CREATE_COMPANY_TYPE = COMPANY_TYPES; // POST
export const API_GET_COMPANY_TYPES = COMPANY_TYPES; // GET
export const API_GET_COMPANY_TYPE_BY_ID = COMPANY_TYPES + "/"; // GET + [typeID]
export const API_UPDATE_COMPANY_TYPE = COMPANY_TYPES + "/"; // PATCH + [typeID]
export const API_DELETE_COMPANY_TYPE = COMPANY_TYPES + "/"; // DELETE + [typeID]

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

// Location
export const LOCATION = API_EMPLOYER_BASE + "/location";
export const API_GET_COUNTRIES = LOCATION + "/countries"; // GET
export const API_GET_STATES = LOCATION + "/states"; // GET (requires country code)
export const API_GET_CITIES = LOCATION + "/cities"; // GET (requires state and country code)
