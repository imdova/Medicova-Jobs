import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FieldConfig } from "@/types";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";

interface TextFieldProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error?: FieldError | null;
}

export const TextFieldComponent: React.FC<TextFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const placeholder =
    "Enter " +
    (field.textFieldProps?.label
      ? String(field.textFieldProps?.label).replace("*", "")
      : field.label
        ? field.label?.replace("*", "")
        : field.name);

  const { className, ...labelProps } =
    field.textFieldProps?.InputLabelProps || {};
  return (
    <div>
      {field.label && (
        <div className="mb-1">
          <label
            htmlFor={String(field.name)}
            className={`font-semibold ${className}`}
            {...labelProps}
          >
            {field.label}
          </label>
        </div>
      )}
      <TextField
        {...controllerField}
        {...field.textFieldProps}
        placeholder={field.textFieldProps?.placeholder || placeholder || ""}
        fullWidth
        type={
          field.type === "password"
            ? !showPassword
              ? "password"
              : "text"
            : field.type
        } // Conditional type
        variant="outlined"
        error={!!error}
        helperText={error?.message}
        InputProps={{
          className: "bg-white",
          endAdornment:
            field.type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : (
              ""
            ),
          ...field.textFieldProps?.InputProps,
        }}
      />
    </div>
  );
};
