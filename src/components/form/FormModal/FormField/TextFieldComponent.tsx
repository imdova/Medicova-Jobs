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
      : field.label?.replace("*", ""));
  return (
    <div>
      {field.label && (
        <label
          htmlFor={String(field.name)}
          className="text-lg font-semibold text-main"
        >
          {field.label}
        </label>
      )}
      <TextField
        {...controllerField}
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
