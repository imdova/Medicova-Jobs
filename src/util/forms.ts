import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

export const isValidEgyptianPhoneNumber = (phone: string): boolean => {
  const egyptianPhoneRegex = /^(?:\+20|0020)?(10|11|12|15)\d{8}$/;
  return egyptianPhoneRegex.test(phone);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
  if (!phoneNumberObj || !phoneNumberObj.isValid()) {
    return false;
  }
  if (phoneNumberObj.country === "EG") {
    return isValidEgyptianPhoneNumber(phoneNumberObj.number);
  }
  return true;
};
