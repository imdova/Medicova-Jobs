// components/DynamicFormModal/FormContent.tsx
import React from "react";
import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { Grid } from "@mui/material";
import { FormActions } from "./FormActions";
import { FieldConfig } from "@/types";
import { FormField } from "./FormField/FormField";

interface FormContentProps {
    fields: FieldConfig[];
    onSubmit: SubmitHandler<any>;
    formMethods: UseFormReturn<Record<string, any>>;
    hiddenFields: string[];
    resetValues: (fieldNames: (string | number)[]) => void;
    onCheckboxChange: (field: FieldConfig) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    loading?: boolean;
    onCancel: () => void;
}

export const FormContent: React.FC<FormContentProps> = ({
    fields,
    onSubmit,
    formMethods,
    hiddenFields,
    onCheckboxChange,
    children,
    loading,
    resetValues,
    onCancel,
}) => {
    const { control, handleSubmit, formState: { isDirty }, getValues } = formMethods;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Grid container className="mt-1" spacing={2}>
                {fields.map((field) => (
                    <Grid
                        item
                        xs={field.gridProps?.xs ?? 12}
                        sm={field.gridProps?.sm}
                        md={field.gridProps?.md}
                        key={String(field.name)}
                    >
                        <FormField
                            field={field}
                            control={control}
                            hidden={hiddenFields.includes(String(field.name))}
                            onCheckboxChange={onCheckboxChange(field)}
                            formValues={getValues()}
                            resetValues={resetValues}
                        />
                    </Grid>
                ))}
            </Grid>
            {children && <div className="mt-4">{children}</div>}
            <FormActions onCancel={onCancel} isDirty={isDirty} loading={loading} />
        </form>
    );
};