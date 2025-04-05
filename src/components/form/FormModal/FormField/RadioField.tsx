import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@mui/material";
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

  const { className, ...labelProps } =
    field.textFieldProps?.InputLabelProps || {};
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
            onClick={() => {
              controllerField?.onChange?.(option.value);
            }}
            aria-selected={option.value === controllerField?.value}
            className={`flex-center group flex h-[42px] min-w-24 items-center gap-2 rounded-base border px-4 font-normal hover:cursor-pointer focus:outline-offset-2 focus:outline-light-primary ${error ? "border-red-500 !text-red-500" : "border-neutral-300"} text-neutral-500 hover:border-black hover:text-secondary aria-selected:bg-primary aria-selected:text-white`}
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
