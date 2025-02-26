import { FieldConfig } from "@/types";
import React from "react";

interface TextEditorFieldProps {
    field: FieldConfig;
    controllerField: any;
    error: any;
}

export const TextEditorField: React.FC<TextEditorFieldProps> = ({
    field,
    controllerField,
    error,
}) => {
    const CustomComponent = field.component!;
    return (
        <CustomComponent
            {...controllerField}
            {...field.componentProps}
            error={!!error}
            helperText={error?.message}
        />
    );
};