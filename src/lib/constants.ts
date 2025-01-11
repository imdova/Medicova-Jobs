export const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE;
export const API_SIGNIN = API_URL + "/users/api/v1.0/employer-users/login";
export const API_SIGNUP = API_URL + "/users/api/v1.0/employer-users";
export const API_ME = API_URL + "/users/api/v1.0/employer-users/me";
export const API_SEND_OTP = API_URL + "/users/api/v1.0/employer-users/send-otp";
export const API_VALIDATE_OTP =
  API_URL + "/users/api/v1.0/employer-users/validate-otp";
export const API_CHANGE_PASSWORD =
  API_URL + "/users/api/v1.0/employer-users/change-password";
