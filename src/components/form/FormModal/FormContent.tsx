// components/DynamicFormModal/FormContent.tsx
import React from "react";
import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { FormActions } from "./FormActions";
import { FieldConfig } from "@/types";
import { FormField } from "./FormField/FormField";
import { cn } from "@/util";

interface FormContentProps {
  fields: FieldConfig[];
  onSubmit?: SubmitHandler<any>;
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
  onChange?: (fieldName: string, value: string) => void;
  removeField?: (fieldName: string) => void;
  dialog?: boolean;
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
  onChange,
  dialog
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
        await onSubmit?.(data);
        // TODO : RESET ON CONDION
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
      <div className={cn("scroll-bar-minimal  overflow-y-auto bg-background", dialog ? "max-h-[calc(100dvh-354px)]" : "max-h-[calc(100dvh-254px)]")}>
        <div className={cn("mt-1 grid grid-cols-12 gap-4", dialog ? "p-0" : "p-4")}>
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
            const hidden = hiddenFields.includes(String(field.name))
            if (hidden) return null
            return (
              <div className={classNames} key={String(field.name)}>
                <FormField
                  field={field}
                  control={control}
                  onCheckboxChange={onCheckboxChange(field)}
                  dependsOnField={fields.find(
                    (f) => f.name === field.dependsOn,
                  )}
                  onChange={onChange}
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
      {onSubmit && <FormActions
        onDelete={onDelete && handleDelete}
        onCancel={onCancel}
        loading={loading}
        deleteLoading={deleteLoading}
        submitButtonText={submitButtonText}
        deleteButtonText={deleteButtonText}
        cancelButtonText={cancelButtonText}
      />}
    </form>
  );
};
