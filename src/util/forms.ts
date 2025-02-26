import { FieldConfig } from "@/types";
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

export const getDefaultValues = (
  fields: FieldConfig[],
  initialValues: Record<string, any>,
): Record<string, any> => ({
  ...fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.type === "checkbox" ? false : "",
    }),
    {},
  ),
  ...initialValues,
});

export function getNestedValue(
  formValues: Record<string, any>,
  path: string,
): any {
  const keys = path.split(".");
  const value = keys.reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, formValues);
  return value;
}
