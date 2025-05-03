import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { FieldConfig } from "@/types";
import SearchableSelect from "@/components/UI/SearchableSelect";
import { getDependsOnLabel, getNestedValue } from "@/util/forms";

interface SelectFieldProps {
  field: FieldConfig;
  controllerField: any;
  error: any;
  resetValues?: (fieldNames: FieldConfig["name"][]) => void;
  formValues?: Record<string, any>;
  dependsOnField?: FieldConfig;
}

export const SearchableSelectField: React.FC<SelectFieldProps> = ({
  field,
  controllerField,
  error,
  formValues,
  resetValues,
  dependsOnField,
}) => {
  const options = field.options || [];
  const dependsOn =
    field.dependsOn &&
    formValues &&
    !getNestedValue(formValues, field.dependsOn)
      ? dependsOnField
      : null;
  const dependsOnValue = getDependsOnLabel(dependsOn);
  const placeholder =
    "Select " +
    (field.textFieldProps?.label
      ? String(field.textFieldProps?.label).replace("*", "")
      : field.label?.replace("*", ""));
  const className = field.textFieldProps?.className || "";
  return (
    <FormControl
      fullWidth
      error={!!error}
      className={`${field.textFieldProps?.label ? "mt-2" : ""}`}
    >
      {field.textFieldProps?.label ? (
        <InputLabel className="bg-white px-1" id={String(field.name) + "Label"}>
          {field.textFieldProps.label}
        </InputLabel>
      ) : field.label ? (
        <label className="mb-1 font-semibold">
          {field.label?.replace("*", "")}
          {field.required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <Tooltip
        title={
          dependsOnValue ? `Please select ${dependsOnValue} first` : undefined
        }
        placement="bottom"
      >
        <SearchableSelect
          className={`bg-white ${className}`}
          {...controllerField}
          displayEmpty
          options={options}
          disabled={dependsOn}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          onChange={(e) => {
            controllerField.onChange(e);
            field.onChange?.(e.target.value);
            if (field.resetFields && resetValues) {
              resetValues(field.resetFields);
            }
          }}
          renderValue={(value) => {
            const selected = options.find((opt) => opt.value == value)?.label;
            return selected ? (
              selected
            ) : (
              <span className="text-neutral-500">
                {field.textFieldProps?.placeholder || placeholder || "Select"}
              </span>
            );
          }}
        />
      </Tooltip>
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
};
