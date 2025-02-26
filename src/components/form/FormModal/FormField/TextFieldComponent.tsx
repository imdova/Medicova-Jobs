import React from "react";
import { TextField } from "@mui/material";
import { FieldConfig } from "@/types";

interface TextFieldProps {
    field: FieldConfig;
    controllerField: any;
    error: any;
}

export const TextFieldComponent: React.FC<TextFieldProps> = ({
    field,
    controllerField,
    error,
}) => (
    <div>
        {field.label && <label htmlFor={String(field.name)} className="text-lg font-semibold text-main">{field.label}</label>}
        <TextField
            {...controllerField}
            {...field.textFieldProps}
            fullWidth
            type={field.type}
            variant="outlined"
            error={!!error}
            helperText={error?.message}
        />
    </div>
);