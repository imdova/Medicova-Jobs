import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useFormDirty } from "@/hooks/useFormDirty";
import { FieldConfig } from "@/types";

interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  fields: FieldConfig[];
  title: string;
  description?: string;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
}

const DynamicFormModal: React.FC<DynamicModalProps> = ({
  open,
  onClose,
  onSubmit,
  fields,
  description,
  title,
  initialValues = {},
  children,
}) => {
  const [hiddenFields, setHiddenFields] = useState<string[]>([]);

  // Create default values by combining field defaults with initialValues
  const getDefaultValues = () => {
    const defaults: Record<string, any> = {};
    fields.forEach((field) => {
      defaults[String(field.name)] = field.type === "checkbox" ? false : "";
    });
    return { ...defaults, ...initialValues };
  };

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
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (open) {
      const values = getDefaultValues();
      reset(values);
      setHiddenFields([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  // Update form when initialValues change
  useEffect(() => {
    if (open && Object.keys(initialValues).length > 0) {
      reset(getDefaultValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, open]);

  const submitHandler: SubmitHandler<any> = (data) => {
    onSubmit(data);
    markAsClean();
    onClose();
    reset(getDefaultValues());
  };

  const handleClose = () => {
    reset(getDefaultValues());
    onClose();
  };

  useEffect(() => {
    if (isDirty) {
      markAsDirty();
    }
  }, [isDirty, markAsDirty]);

  const handleCheckboxChange =
    (field: FieldConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (field.hideFieldNames && field.hideFieldNames.length > 0) {
        setHiddenFields((prev) => {
          if (event.target.checked) {
            const newHiddenFields = [...prev];
            field.hideFieldNames!.forEach((fieldName) => {
              if (!prev.includes(String(fieldName))) {
                newHiddenFields.push(String(fieldName));
              }
            });
            return newHiddenFields;
          } else {
            return prev.filter((name) => !field.hideFieldNames!.includes(name));
          }
        });
      }
    };

  const renderField = (field: FieldConfig) => {
    if (hiddenFields.includes(String(field.name))) {
      return null;
    }

    return (
      <Controller
        key={String(field.name)}
        name={String(field.name)}
        control={control}
        rules={{
          required: field.required ? `${field.label || String(field.name) } is required` : false,
          ...field.validation,
        }}
        render={({ field: controllerField, fieldState: { error } }) => {
          if (field.type === "checkbox") {
            return (
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...controllerField}
                      checked={!!controllerField.value}
                      onChange={(e) => {
                        controllerField.onChange(e);
                        handleCheckboxChange(field)(e);
                      }}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 24,
                        },
                      }}
                    />
                  }
                  label={field.label || ""}
                />
                {error && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </div>
            );
          }

          if (field.type === "select" && field.options) {
            return (
              <FormControl fullWidth error={!!error}>
                <label className="mb-1 font-semibold">{field.label}</label>
                <Select
                  {...controllerField}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      sx: { maxHeight: 300 },
                    },
                  }}
                  renderValue={(value) =>
                    value ? (
                      field.options?.find((option) => option.value === value)
                        ?.label
                    ) : (
                      <span className="text-neutral-500">
                        {field.textFieldProps?.placeholder || "Select"}
                      </span>
                    )
                  }
                >
                  <MenuItem value="" disabled>
                    <em>{field.textFieldProps?.placeholder || "Select"}</em>
                  </MenuItem>
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {error && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </FormControl>
            );
          }

          if (field.type === "textEditor" && field.component) {
            const CustomComponent = field.component;
            return (
              <div>
                <CustomComponent
                  {...controllerField}
                  {...field.componentProps}
                  error={!!error}
                  helperText={error?.message}
                />
                {error && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </div>
            );
          }

          return (
            <TextField
              {...controllerField}
              {...field.textFieldProps}
              fullWidth
              type={field.type}
              label={field.label}
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          );
        }}
      />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle className="text-lg font-bold">
        {title}
        {description && (
          <p className="mt-2 text-sm font-normal text-secondary">
            {description}
          </p>
        )}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <Grid container spacing={2}>
            {fields.map((field) => (
              <Grid
                item
                xs={field.gridProps?.xs ?? 12}
                sm={field.gridProps?.sm}
                md={field.gridProps?.md}
                key={String(field.name)}
              >
                {renderField(field)}
              </Grid>
            ))}
          </Grid>
          {children && <div className="mt-4">{children}</div>}
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
