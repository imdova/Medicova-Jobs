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
export const API_REGISTER_USER = USERS + "/register"; // POST

export const API_CREATE_COMPANY_USER = USERS + "/register/company-user"; // POST
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


// users/access/roles

export const ROLES = API_USERS_BASE + "/users/access/roles";
export const API_CREATE_ROLE = ROLES; // POST
export const API_UPDATE_ROLE = ROLES; // PATCH
export const API_GET_ROLES_BY_USER_TYPE = ROLES + "/user/type"; // GET
export const API_GET_ROLES_BY_COMPANY = ROLES + "/company/"; // GET + [companyId] + pagination
export const API_GET_ROLE_BY_ID = ROLES + "/"; // GET + [roleId]

// Permissions
export const PERMISSIONS = API_USERS_BASE + "/users/access/permissions";
export const API_GET_PERMISSION_BY_ID = PERMISSIONS + "/"; // GET + [permissionID]
export const API_UPDATE_PERMISSION = PERMISSIONS + "/"; // PATCH + [permissionID]
export const API_DELETE_PERMISSION = PERMISSIONS + "/"; // DELETE + [permissionID]
export const API_GET_PERMISSIONS_BY_USER_TYPE = PERMISSIONS + "/user?type="; // GET + [userType]
