import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { FieldConfig } from "@/types";
import SearchableSelect from "@/components/UI/SearchableSelect";
import { getNestedValue } from "@/util/forms";

interface SelectFieldProps {
  field: FieldConfig;
  controllerField: any;
  error: any;
  resetValues: (fieldNames: (string | number)[]) => void;
  formValues: Record<string, any>;
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
    field.dependsOn && !getNestedValue(formValues, field.dependsOn)
      ? dependsOnField
      : null;
  const placeholder =
    "Select " +
    (field.textFieldProps?.label
      ? String(field.textFieldProps?.label).replace("*", "")
      : field.label?.replace("*", ""));
  return (
    <FormControl fullWidth error={!!error}>
      {field.textFieldProps?.label ? (
        <InputLabel className="bg-white px-1" id={String(field.name) + "Label"}>
          {field.textFieldProps.label}
        </InputLabel>
      ) : (
        <label className="mb-1 font-semibold">{field.label}</label>
      )}
      <Tooltip
        title={
          dependsOn
            ? `Please select ${
                dependsOn.textFieldProps?.label
                  ? String(dependsOn.textFieldProps?.label)?.replace("*", "")
                  : dependsOn.label?.replace("*", "")
              } first`
            : undefined
        }
        placement="bottom"
      >
        <SearchableSelect
          {...controllerField}
          displayEmpty
          options={options}
          disabled={dependsOn}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          onChange={(e) => {
            controllerField.onChange(e);
            field.onChange?.(e.target.value);
            if (field.resetFields) {
              resetValues(field.resetFields);
            }
          }}
          renderValue={(value) => {
            const selected = options.find((opt) => opt.value === value)?.label;
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
