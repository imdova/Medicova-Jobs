import { API_URL } from ".";

export const API_EMPLOYER_BASE =
  API_URL + "/api/v1.0.0/admin/sys-configurations";

// Company Sectors
export const COMPANY_SECTORS = API_EMPLOYER_BASE + "/company-sector";
export const API_CREATE_COMPANY_SECTOR = COMPANY_SECTORS; // POST
export const API_GET_COMPANY_SECTORS = COMPANY_SECTORS; // GET
export const API_GET_COMPANY_SECTOR_BY_ID = COMPANY_SECTORS + "/"; // GET + [id]
export const API_UPDATE_COMPANY_SECTOR = COMPANY_SECTORS; // PATCH
export const API_DELETE_COMPANY_SECTOR = COMPANY_SECTORS; // DELETE

// Company Types
export const COMPANY_TYPES = API_EMPLOYER_BASE + "/company-type";
export const API_CREATE_COMPANY_TYPE = COMPANY_TYPES; // POST
export const API_GET_COMPANY_TYPES = COMPANY_TYPES; // GET
export const API_GET_COMPANY_TYPES_BY_SECTOR = COMPANY_TYPES + "/sector?id="; // GET
export const API_GET_COMPANY_TYPE_BY_ID = COMPANY_TYPES + "/"; // GET + [id]
export const API_UPDATE_COMPANY_TYPE = COMPANY_TYPES; // PATCH
export const API_DELETE_COMPANY_TYPE = COMPANY_TYPES; // DELETE
