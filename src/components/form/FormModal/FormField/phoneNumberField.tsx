import PhoneNumberInput from "@/components/UI/phoneNumber";
import { FieldConfig } from "@/types";
import React from "react";

interface PhoneFieldProps {
  field: FieldConfig;
  controllerField: any;
  error: any;
}

export const PhoneNumberField: React.FC<PhoneFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  const placeholder =
    "Enter " +
    (field.textFieldProps?.label
      ? String(field.textFieldProps?.label).replace("*", "")
      : field.label
        ? field.label?.replace("*", "")
        : field.name);
  return (
    <div>
      {field.label && (
        <div className="mb-1">
          <label htmlFor={String(field.name)} className="font-semibold">
            {field.label}
          </label>
        </div>
      )}
      <PhoneNumberInput
        {...controllerField}
        {...field.componentProps}
        error={!!error}
        helperText={error?.message}
        placeholder={field.textFieldProps?.placeholder || placeholder || ""}
        fullWidth
        variant="outlined"
      />
    </div>
  );
};
