import { FieldConfig } from "@/types";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { Path } from "react-hook-form";

export const isValidEgyptianPhoneNumber = (phone: string): boolean => {
  const egyptianPhoneRegex = /^(?:\+20|0020)?(10|11|12|15)\d{8}$/;
  return egyptianPhoneRegex.test(phone);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber || "");
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

// function getDefaultValues<T>(array: Path<T>[], initialValues?: T) {
//   return {
//     ...array.reduce(
//       (acc, name) => ({
//         ...acc,
//         [name]: initialValues ? getNestedValue(initialValues, name) : "",
//       }),
//       {},
//     ),
//   };
// }

export function getNestedValue<T>(formValues: T, path: Path<T>): any {
  const keys = path.split(".") as (keyof T)[];
  const value = keys.reduce((current: any, key: keyof T) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, formValues);
  return value;
}

export function getDependsOnLabel(
  dependsOn: FieldConfig | null | undefined,
): string | undefined {
  if (!dependsOn) {
    return undefined;
  }

  if (dependsOn.textFieldProps?.label) {
    return typeof dependsOn.textFieldProps.label === "string"
      ? dependsOn.textFieldProps.label.replace("*", "")
      : undefined;
  }

  if (dependsOn.label) {
    return dependsOn.label.replace("*", "");
  }

  return undefined;
}
