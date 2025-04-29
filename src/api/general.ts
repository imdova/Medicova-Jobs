import { API_URL } from ".";

export const API_BASE = API_URL + "/api/v1.0.0";

// Location
export const LOCATION = API_BASE + "/location";
export const API_GET_COUNTRIES = LOCATION + "/countries"; // GET
export const API_GET_STATES = LOCATION + "/states"; // GET ?countryCode=AF (requires country code)
export const API_GET_CITIES = LOCATION + "/cities"; // GET ?countryCode=US&stateCode=CA (requires state and country code)

// File
export const FILE = API_BASE + "/files";
export const API_UPLOAD_FILE = FILE; // POST
export const API_GET_FILE = FILE + "/"; // GET
export const API_DELETE_FILE = FILE + "/"; // DELETE
