import React from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
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
import { cn } from "@/util";
import { X } from "lucide-react";

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
                dependsOn.textFieldProps?.label
                  ? String(dependsOn.textFieldProps?.label)?.replace("*", "")
                  : dependsOn.label?.replace("*", "") || dependsOn.name
              } first`
            : undefined
        }
        placement="bottom"
      >
        <Select
          className={cn("bg-white", className)}
          sx={field.textFieldProps?.sx}
          {...controllerField}
          labelId={String(field.name) + "Label"}
          id={String(field.name)}
          value={isMultiple ? "" : controllerField?.value}
          displayEmpty
          disabled={!!dependsOn}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          onChange={(e) => {
            // controllerField?.onChange?.(e);
            field.onChange?.(e.target.value);
            handleSelectionChange(e.target.value);
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
