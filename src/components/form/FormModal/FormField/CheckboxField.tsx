import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FieldConfig } from "@/types";

interface CheckboxFieldProps {
  field: any;
  controllerField: Partial<ControllerRenderProps<FieldValues, string>>;
  onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetValues?: (fieldNames: FieldConfig<UserProfile>["name"][]) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  field,
  controllerField,
  onCheckboxChange,
  resetValues,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        {...controllerField}
        checked={!!controllerField.value}
        onChange={(e) => {
          controllerField.onChange?.(e);
          onCheckboxChange?.(e);
          if (field.resetFields && resetValues) {
            resetValues(field.resetFields);
          }
        }}
        sx={{
          "& .MuiSvgIcon-root": { fontSize: 24, backgroundColor: "white" },
        }}
      />
    }
    label={field.label || ""}
  />
);
