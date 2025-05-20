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
  removeField,
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
  
  // col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="scroll-bar-minimal max-h-[calc(100dvh-254px)] overflow-y-auto bg-background">
        <div className="mt-1 grid grid-cols-12 gap-4 p-4">
          {fields.map((field) => {
            const gridProps = field.gridProps ?? {};
            const xs = gridProps.xs ?? 12;
            const sm = gridProps.sm ?? xs;
            const md = gridProps.md ?? sm;
            const classNames = [
              `col-span-${xs}`,
              sm !== xs ? `sm:col-span-${sm}` : "",
              md !== sm ? `md:col-span-${md}` : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div className={classNames} key={String(field.name)}>
                <FormField
                  field={field}
                  control={control}
                  hidden={hiddenFields.includes(String(field.name))}
                  onCheckboxChange={onCheckboxChange(field)}
                  dependsOnField={fields.find(
                    (f) => f.name === field.dependsOn,
                  )}
                  removeField={removeField}
                  formValues={getValues()}
                  resetValues={resetValues}
                />
              </div>
            );
          })}
        </div>
        {children && children}
      </div>
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
