import { API_URL } from ".";

export const API_ADMIN_BASE = API_URL + "/api/v1.0.0/admin/sys-configurations";

// Company Sectors
export const COMPANY_SECTORS = API_ADMIN_BASE + "/company-sector";
export const API_CREATE_COMPANY_SECTOR = COMPANY_SECTORS; // POST
export const API_GET_COMPANY_SECTORS = COMPANY_SECTORS; // GET
export const API_GET_COMPANY_SECTOR_BY_ID = COMPANY_SECTORS + "/"; // GET + [id]
export const API_UPDATE_COMPANY_SECTOR = COMPANY_SECTORS; // PATCH
export const API_DELETE_COMPANY_SECTOR = COMPANY_SECTORS; // DELETE

// Company Types
export const COMPANY_TYPES = API_ADMIN_BASE + "/company-type";
export const API_CREATE_COMPANY_TYPE = COMPANY_TYPES; // POST
export const API_GET_COMPANY_TYPES = COMPANY_TYPES; // GET
export const API_GET_COMPANY_TYPES_BY_SECTOR = COMPANY_TYPES + "/sector?id="; // GET
export const API_GET_COMPANY_TYPE_BY_ID = COMPANY_TYPES + "/"; // GET + [id]
export const API_UPDATE_COMPANY_TYPE = COMPANY_TYPES; // PATCH
export const API_DELETE_COMPANY_TYPE = COMPANY_TYPES; // DELETE

// Career Levels
export const CAREER_LEVELS = API_ADMIN_BASE + "/career-level";
export const API_CREATE_CAREER_LEVEL = CAREER_LEVELS; // POST
export const API_GET_CAREER_LEVELS = CAREER_LEVELS + "?limit=200"; // GET
export const API_GET_CAREER_LEVELS_BY_CATEGORY = CAREER_LEVELS + "/categories"; // GET + ?ids=ID&ids=ID
export const API_GET_CAREER_LEVEL_BY_ID = CAREER_LEVELS + "/"; // GET + [id]
export const API_UPDATE_CAREER_LEVEL = CAREER_LEVELS; // PATCH
export const API_DELETE_CAREER_LEVEL = CAREER_LEVELS; // DELETE

// Categories
export const CATEGORIES = API_ADMIN_BASE + "/category";
export const API_CREATE_CATEGORY = CATEGORIES; // POST
export const API_GET_CATEGORIES = CATEGORIES + "?limit=200"; // GET
export const API_GET_CATEGORY_BY_ID = CATEGORIES + "/"; // GET + [id]
export const API_UPDATE_CATEGORY = CATEGORIES; // PATCH
export const API_DELETE_CATEGORY = CATEGORIES; // DELETE
export const API_GET_CATEGORIES_BY_INDUSTRY =
  CATEGORIES + "/industries?limit=200&ids="; // GET +

// Employment Typesid
export const EMPLOYMENT_TYPES = API_ADMIN_BASE + "/employment-type";
export const API_CREATE_EMPLOYMENT_TYPE = EMPLOYMENT_TYPES; // POST
export const API_GET_EMPLOYMENT_TYPES = EMPLOYMENT_TYPES; // GET
export const API_GET_EMPLOYMENT_TYPE_BY_ID = EMPLOYMENT_TYPES + "/"; // GET + [id]
export const API_UPDATE_EMPLOYMENT_TYPE = EMPLOYMENT_TYPES; // PATCH
export const API_DELETE_EMPLOYMENT_TYPE = EMPLOYMENT_TYPES; // DELETE

// Industries
export const INDUSTRIES = API_ADMIN_BASE + "/industry";
export const API_CREATE_INDUSTRY = INDUSTRIES; // POST
export const API_GET_INDUSTRIES = INDUSTRIES; // GET
export const API_GET_INDUSTRY_BY_ID = INDUSTRIES + "/"; // GET + [id]
export const API_UPDATE_INDUSTRY = INDUSTRIES; // PATCH
export const API_DELETE_INDUSTRY = INDUSTRIES; // DELETE
export const API_GET_INDUSTRIES_BY_IDS = INDUSTRIES + "/ids"; // GET

// Specialities
export const SPECIALITIES = API_ADMIN_BASE + "/speciality";
export const API_CREATE_SPECIALITY = SPECIALITIES; // POST
export const API_GET_SPECIALITIES = SPECIALITIES + "?limit=200"; // GET
export const API_GET_SPECIALITIES_BY_CATEGORY =
  SPECIALITIES + "/category?limit=200&id="; // GET + id
export const API_GET_SPECIALITY_BY_ID = SPECIALITIES + "/"; // GET + [id]
export const API_UPDATE_SPECIALITY = SPECIALITIES; // PATCH
export const API_DELETE_SPECIALITY = SPECIALITIES; // DELETE
