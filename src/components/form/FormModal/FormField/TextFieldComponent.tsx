import React from "react";
import { TextField } from "@mui/material";
import { FieldConfig } from "@/types";

interface TextFieldProps {
  field: FieldConfig;
  controllerField: any;
  error: any;
}

export const TextFieldComponent: React.FC<TextFieldProps> = ({
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
        <label htmlFor={String(field.name)} className="mb-1 font-semibold">
          {field.label}
        </label>
      )}
      <TextField
        {...controllerField}
        // label={
        //   !field.textFieldProps?.label && !field.label ? field.name : undefined
        // }
        {...field.textFieldProps}
        placeholder={field.textFieldProps?.placeholder || placeholder || ""}
        fullWidth
        type={field.type}
        variant="outlined"
        error={!!error}
        helperText={error?.message}
      />
    </div>
  );
};
