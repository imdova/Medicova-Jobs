import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { FieldConfig } from "@/types";
import { useFormDirty } from "@/hooks/useFormDirty";

interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  fields: FieldConfig[];
  title: string;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
}

const DynamicFormModal: React.FC<DynamicModalProps> = ({
  open,
  onClose,
  onSubmit,
  fields,
  title,
  initialValues = {},
  children,
}) => {
  const {
    isDirty: isFormDirty,
    handleNavigateAway,
    markAsDirty,
    markAsClean,
  } = useFormDirty();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, initialValues, reset]);

  const submitHandler: SubmitHandler<any> = (data) => {
    onSubmit(data);
    markAsClean();
    onClose();
    reset();
  };

  const handleClose = () => {
    // if (isFormDirty) {
    //   handleNavigateAway();
    // } else {
      onClose();
    // }
  };

  useEffect(() => {
    if (isDirty) {
      markAsDirty();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 py-4">
          {fields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              defaultValue={initialValues[field.name] || ""}
              rules={{
                required: field.required ? `${field.label} is required` : false,
                ...field.validation,
              }}
              render={({ field: controllerField, fieldState: { error } }) => (
                <TextField
                  {...controllerField}
                  fullWidth
                  type={field.type}
                  label={field.label}
                  variant="outlined"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          ))}
          {children && <div>{children}</div>}
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isFormDirty}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicFormModal;
