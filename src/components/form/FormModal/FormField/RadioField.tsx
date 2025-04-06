import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { FieldConfig } from "@/types";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";

interface RadioFieldProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error?: FieldError;
}

export const RadioFieldComponent: React.FC<RadioFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  const options = field.options || [];
  const isMultiple = field.multiple === true; // Read multiple from field config

  const { className, ...labelProps } =
    field.textFieldProps?.InputLabelProps || {};

  // Handle selection for multiple mode
  const handleSelectionChange = (optionValue: string) => {
    if (!controllerField?.onChange) return;

    if (isMultiple) {
      // If in multiple mode, handle array of values
      const currentValues = Array.isArray(controllerField.value)
        ? controllerField.value
        : controllerField.value
          ? [controllerField.value]
          : [];

      // Toggle selection: add if not present, remove if present
      if (currentValues.includes(optionValue)) {
        controllerField.onChange(
          currentValues.filter((value) => value !== optionValue),
        );
      } else {
        controllerField.onChange([...currentValues, optionValue]);
      }
    } else {
      // Single selection mode (original behavior)
      controllerField.onChange(optionValue);
    }
  };

  // Check if an option is selected
  const isSelected = (optionValue: string) => {
    if (!controllerField?.value) return false;

    if (isMultiple) {
      // For multiple mode, check if value is in the array
      const values = Array.isArray(controllerField.value)
        ? controllerField.value
        : [controllerField.value];
      return values.includes(optionValue);
    }

    // For single mode, compare directly
    return optionValue === controllerField.value;
  };

  return (
    <FormControl component="fieldset" error={!!error} fullWidth>
      <div className="mb-1">
        <label
          htmlFor={String(field.name)}
          className={`font-semibold ${className}`}
          {...labelProps}
        >
          {field.label}
        </label>
      </div>

      <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
        {options?.map((option) => (
          <div
            key={option.value}
            onClick={() => handleSelectionChange(option.value)}
            aria-selected={isSelected(option.value)}
            className={`flex-center group flex h-[42px] min-w-24 items-center gap-2 rounded-base border px-4 font-normal hover:cursor-pointer focus:outline-offset-2 focus:outline-light-primary ${error ? "border-red-500 !text-red-500" : "border-neutral-300"} text-neutral-500 hover:border-black hover:text-secondary ${isSelected(option.value) ? "bg-primary text-white" : ""}`}
          >
            {option.icon}
            {option.label}
          </div>
        ))}
      </div>

      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};
