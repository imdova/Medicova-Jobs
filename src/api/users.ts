import { API_URL } from ".";

export const API_USERS_BASE = API_URL + "/api/v1.0.0";

// Users
export const USERS = API_USERS_BASE + "/users";
export const API_LOGIN = USERS + "/login"; // POST
export const API_SEND_OTP = USERS + "/send-otp"; // POST
export const API_VALIDATE_OTP = USERS + "/validate-otp"; // POST
export const API_GET_ME = USERS + "/me"; // GET
export const API_GET_USER_BY_ID = USERS + "/"; // GET + [userID]
export const API_DELETE_USER = USERS + "/"; // DELETE + [userID]
export const API_UPDATE_USER = USERS + "/"; // PATCH + [userID]
export const API_GET_USERS = USERS; // GET (Retrieve multiple users by IDs)
export const API_FORGET_PASSWORD = USERS + "/forget-password"; // POST
export const API_CHANGE_PASSWORD = USERS + "/change-password"; // POST
export const API_UPDATE_PROFILE = USERS + "/my-profile"; // PATCH
export const API_ACTIVATE_USER = USERS + "/"; // POST + [userID] + "/activate"
export const API_DEACTIVATE_USER = USERS + "/"; // POST + [userID] + "/deactivate"
export const API_REFRESH_TOKEN = USERS + "/refresh-token"; // POST
export const API_LOGOUT = USERS + "/logout"; // POST
export const API_REGISTER_USER = USERS + "/"; // POST + [userType]

// new
export const API_REGISTER_USER_WITH_EMAIL_AND_PASSWORD = USERS + "/register"; // POST
export const API_REGISTER_COMPANY_USER_WITH_EMAIL_AND_PASSWORD = USERS + "/register/company-user"; // POST
export const API_LOGIN_WITH_EMAIL_AND_PASSWORD = USERS + "/login"; // POST
export const API_GOOGLE_REGISTER = USERS + "/google/register"; // POST
export const API_GOOGLE_LOGIN = USERS + "/google/login"; // POST
// export const API_CHANGE_PASSWORD = USERS + "/change-password"; // POST
export const API_RESET_PASSWORD = USERS + "/reset-password"; // POST
export const API_SEND_TOKEN_BY_EMAIL = USERS + "/send-token/"; // POST + [email]
export const API_REQUEST_CHANGE_EMAIL = USERS + "/request-change-mail"; // POST
export const API_CHANGE_EMAIL = USERS + "/change-mail"; // POST
export const API_VERIFY_EMAIL = USERS + "/verify"; // GET
export const API_GET_CURRENT_USER = USERS + "/me"; // GET
export const API_DELETE_USER_BY_EMAIL = USERS + "/"; // DELETE + [email]


// Roles
export const ROLES = API_USERS_BASE + "/roles";
export const API_CREATE_ROLE = ROLES + "/userType/"; // POST + [userType]
export const API_GET_ROLES = ROLES + "/userType/"; // GET + [userType]
export const API_GET_ROLE_BY_ID = ROLES + "/"; // GET + [roleID]
export const API_UPDATE_ROLE = ROLES + "/"; // PATCH + [roleID]
export const API_DELETE_ROLE = ROLES + "/"; // DELETE + [roleID]

// Permissions
export const PERMISSIONS = API_USERS_BASE + "/permissions";
export const API_CREATE_PERMISSION = PERMISSIONS + "/userType/"; // POST + [userType]
export const API_GET_PERMISSIONS_BY_TYPE = PERMISSIONS + "/userType/"; // GET + [userType]
export const API_GET_PERMISSION_BY_ID = PERMISSIONS + "/"; // GET + [permissionID]
export const API_UPDATE_PERMISSION = PERMISSIONS + "/"; // PATCH + [permissionID]
export const API_DELETE_PERMISSION = PERMISSIONS + "/"; // DELETE + [permissionID]
