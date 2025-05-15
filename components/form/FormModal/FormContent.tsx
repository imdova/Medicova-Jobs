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
  onDelete?: (data: any) => void;
  resetValues: (fieldNames: (string | number)[]) => void;
  onCheckboxChange: (
    field: FieldConfig,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  loading?: boolean;
  deleteLoading?: boolean;
  onCancel: () => void;
  submitButtonText?: string;
  deleteButtonText?: string;
  cancelButtonText?: string;
  removeField?: (fieldName: string) => void;

}

export const FormContent: React.FC<FormContentProps> = ({
  fields,
  onSubmit,
  formMethods, 
  hiddenFields,
  onCheckboxChange,
  children,
  loading,
  deleteLoading,
  resetValues,
  onDelete,
  onCancel,
  submitButtonText,
  deleteButtonText,
  cancelButtonText,
  removeField
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    getValues,
    reset,
  } = formMethods;

  const submitHandler = async (data: any) => {
    try {
      if (isDirty) {
        await onSubmit(data);
        reset(data);
      } else {
        onCancel();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = () => {
    const data = getValues();
    onDelete?.(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="scroll-bar-minimal max-h-[calc(100dvh-300px)] overflow-y-auto bg-background p-4">
        <Grid container spacing={1}>
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
                dependsOnField={fields.find((f) => f.name === field.dependsOn)}
                removeField={removeField}
                formValues={getValues()}
                resetValues={resetValues}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      {children && children}
      <FormActions
        onDelete={onDelete && handleDelete}
        onCancel={onCancel}
        loading={loading}
        deleteLoading={deleteLoading}
        submitButtonText={submitButtonText}
        deleteButtonText={deleteButtonText}
        cancelButtonText={cancelButtonText}
      />
    </form>
  );
};
