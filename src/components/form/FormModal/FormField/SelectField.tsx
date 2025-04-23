import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { FieldConfig } from "@/types";
import { getNestedValue } from "@/util/forms";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";

interface SelectFieldProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error?: FieldError | null;
  resetValues?: (fieldNames: FieldConfig["name"][]) => void;
  formValues?: Record<string, any>;
  dependsOnField?: FieldConfig;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  field,
  controllerField,
  error,
  resetValues,
  formValues,
  dependsOnField,
}) => {
  const options = field.options || [];
  const dependsOn =
    field.dependsOn &&
    formValues &&
    !getNestedValue(formValues, field.dependsOn)
      ? dependsOnField
      : null;
  const placeholder =
    "Select " +
    (field.textFieldProps?.label
      ? String(field.textFieldProps?.label).replace("*", "")
      : field.label
        ? field.label.replace("*", "")
        : field.name);
  const className = field.textFieldProps?.className || "";
  return (
    <FormControl fullWidth error={!!error}>
      {field.textFieldProps?.label ? (
        <InputLabel className="bg-white px-1" id={String(field.name) + "Label"}>
          {field.textFieldProps.label}
        </InputLabel>
      ) : field.label ? (
        <label className="mb-1 font-semibold">{field.label}</label>
      ) : null}
      <Tooltip
        title={
          dependsOn
            ? `Please select ${
                dependsOn.textFieldProps?.label
                  ? String(dependsOn.textFieldProps?.label)?.replace("*", "")
                  : dependsOn.label?.replace("*", "") || dependsOn.name
              } first`
            : undefined
        }
        placement="bottom"
      >
        <Select
          className={`bg-white ${className}`}
          {...controllerField}
          labelId={String(field.name) + "Label"}
          id={String(field.name)}
          displayEmpty
          disabled={!!dependsOn}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          onChange={(e) => {
            controllerField?.onChange?.(e);
            field.onChange?.(e.target.value);
            if (field.resetFields) {
              resetValues?.(field.resetFields);
            }
          }}
          renderValue={(value) => {
            const selected = options.find((opt) => opt.value == value)?.label;
            return selected ? (
              selected
            ) : (
              <span className="text-neutral-400">
                {field.textFieldProps?.placeholder || placeholder || "Select"}
              </span>
            );
          }}
          {...field.selectProps}
        >
          <MenuItem value="" disabled>
            <em>
              {field.textFieldProps?.placeholder || placeholder || "Select"}
            </em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Tooltip>
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
};
