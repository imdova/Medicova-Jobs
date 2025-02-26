import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

interface CheckboxFieldProps {
    field: any;
    controllerField: any;
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
    field,
    controllerField,
    onCheckboxChange,
}) => (
    <FormControlLabel
        control={
            <Checkbox
                {...controllerField}
                checked={!!controllerField.value}
                onChange={(e) => {
                    controllerField.onChange(e);
                    onCheckboxChange(e);
                }}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
            />
        }
        label={field.label || ""}
    />
);