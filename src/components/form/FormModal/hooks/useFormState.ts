// hooks/useFormState.ts
import { FieldConfig } from "@/types";
import { getDefaultValues } from "@/util/forms";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

export const useFormState = (
  open: boolean,
  fields: FieldConfig[],
  initialValues: Record<string, any>,
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined,
): UseFormReturn<any> => {
  const formMethods = useForm({
    mode,
    defaultValues: getDefaultValues(fields, initialValues),
  });

  const { reset } = formMethods;

  useEffect(() => {
    if (open) {
      const defaultValues = getDefaultValues(fields, initialValues);
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return formMethods;
};
