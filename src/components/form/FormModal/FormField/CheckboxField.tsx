import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

interface CheckboxFieldProps {
  field: any;
  controllerField: any;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetValues: (fieldNames: (string | number)[]) => void;
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
          controllerField.onChange(e);
          onCheckboxChange(e);
          if (field.resetFields) {
            resetValues(field.resetFields);
          }
        }}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 24,backgroundColor: "white" } }}
      />
    }
    label={field.label || ""}
  />
);
