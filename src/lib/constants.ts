export const API_URL = process.env.NEXT_SERVER_BASE;
export const API_SIGNIN = API_URL + "/users/api/v1.0/users/login";
export const API_SIGNUP = API_URL + "/users/api/v1.0/users/"; // + /seeker | /admin | /employer
export const API_ME = API_URL + "/users/api/v1.0/users/me";
export const API_SEND_OTP = API_URL + "/users/api/v1.0/users/send-otp";
export const API_VALIDATE_OTP = API_URL + "/users/api/v1.0/users/validate-otp";
export const API_CHANGE_PASSWORD =
  API_URL + "/users/api/v1.0/users/change-password";
export const API_FORGET_PASSWORD =
  API_URL + "/users/api/v1.0/users/forget-password";

//// roles

export const API_GET_ROLE_ID = API_URL + "/users/api/v1.0/roles/";
