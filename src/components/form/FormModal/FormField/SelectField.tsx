import React from "react";
import { FormControl, FormHelperText, MenuItem, Select, Tooltip } from "@mui/material";
import { FieldConfig } from "@/types";
import { getNestedValue } from "@/util/forms";

interface SelectFieldProps {
    field: FieldConfig;
    controllerField: any;
    error: any;
    resetValues: (fieldNames: (string | number)[]) => void;
    formValues: Record<string, any>;
}

export const SelectField: React.FC<SelectFieldProps> = ({
    field,
    controllerField,
    error,
    resetValues,
    formValues
}) => {
    const options = field.options || [];
    const dependsOn = field.dependsOn && !getNestedValue(formValues, field.dependsOn)

    return (
        <FormControl fullWidth error={!!error}>
            <label className="mb-1 font-semibold">{field.label}</label>
            <Tooltip
                title={
                    dependsOn
                        ? `Please select ${field.dependsOn} first`
                        : undefined
                }
                placement="bottom"
            >
                <Select
                    {...controllerField}
                    displayEmpty
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
                        const selected = options.find((opt) => opt.value === value)?.label
                        return selected ? selected : (
                            <span className="text-neutral-500">{field.textFieldProps?.placeholder || "Select"}</span>
                        )
                    }}
                >
                    <MenuItem value="" disabled>
                        <em>{field.textFieldProps?.placeholder || "Select"}</em>
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