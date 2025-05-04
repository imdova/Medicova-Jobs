import React from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { FieldConfig } from "@/types";
import SearchableSelect from "@/components/UI/SearchableSelect";
import { getDependsOnLabel, getNestedValue } from "@/util/forms";
import { X } from "lucide-react";

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
  const isMultiple = field.multiple === true; // Read multiple from field config
  const currentValues: string[] = Array.isArray(controllerField?.value)
    ? controllerField?.value
    : controllerField?.value
      ? [controllerField?.value]
      : [];
  const options = isMultiple
    ? field.options?.filter((x) => !currentValues.includes(x.value)) || []
    : field.options || [];

  const dependsOn =
    field.dependsOn &&
    formValues &&
    !getNestedValue(formValues, field.dependsOn)
      ? { name: field.dependsOn, ...dependsOnField }
      : null;
  const placeholder = field.textFieldProps?.label
    ? String(field.textFieldProps?.label).replace("*", "")
    : field.label
      ? "Select " + field.label.replace("*", "")
      : "Select " + field.name;
  const className = field.textFieldProps?.className || "";
  const handleSelectionChange = (optionValue: any) => {
    if (!controllerField?.onChange) return;

    if (isMultiple) {
      if (!currentValues.includes(optionValue)) {
        controllerField.onChange([...currentValues, optionValue]);
      }
    } else {
      // Single selection mode (original behavior)
      controllerField.onChange(optionValue);
    }
  };

  const removeItem = (item: string) => {
    if (!controllerField?.onChange) return;
    controllerField.onChange(currentValues.filter((value) => value !== item));
  };

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
      {isMultiple && (
        <div className="mb-2 flex flex-wrap gap-2">
          {controllerField?.value.map((item: string, index: number) => (
            <div
              key={index}
              className="space-x-2 rounded-base border bg-primary-100 py-1 pl-2 pr-1 text-main duration-100"
            >
              <span className="text-xs">
                {field?.options?.find((x) => x.value === item)?.label}
              </span>
              <IconButton
                className="p-1 hover:bg-red-100 hover:text-red-500"
                onClick={() => removeItem(item)}
              >
                <X className="h-4 w-4" />
              </IconButton>
            </div>
          ))}
        </div>
      )}
      <Tooltip
        title={
          dependsOn
            ? `Please select ${
                String(dependsOn.textFieldProps?.label).replace("*", "") ||
                dependsOn.label?.replace("*", "") ||
                dependsOn.name
              } first`
            : undefined
        }
        placement="bottom"
      >
        <SearchableSelect
          className={`bg-white ${className}`}
          {...controllerField}
          displayEmpty
          options={options}
          value={isMultiple ? "" : controllerField?.value}
          disabled={dependsOn}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          onChange={(e) => {
            // controllerField.onChange(e);
            field.onChange?.(e.target.value);
            handleSelectionChange(e.target.value);
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
