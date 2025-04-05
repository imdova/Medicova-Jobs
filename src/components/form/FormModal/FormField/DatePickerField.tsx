import { FieldConfig } from "@/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";

interface DatePickerFieldProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error?: FieldError;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  const placeholder =
    "Enter " +
    (field.textFieldProps?.label
      ? String(field.textFieldProps?.label).replace("*", "")
      : field.label
        ? field.label?.replace("*", "")
        : field.name);

  return (
    <div className="flex flex-col">
      {field.label && (
        <label htmlFor={String(field.name)} className="mb-1 font-semibold">
          {field.label}
        </label>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...field.dateFieldProps}
          value={controllerField?.value}
          onChange={(date) => controllerField?.onChange?.(date)}

          // maxDate={dayjs()} // Set max date to today
          // format="MM/DD/YYYY"
          // slotProps={{
          //   textField: {
          //     ...field.textFieldProps,
          //     size: "medium",
          //     variant: "outlined",
          //     placeholder:
          //       field.textFieldProps?.placeholder || placeholder || "",
          //     error: !!error,
          //     helperText: error?.message,
          //     InputProps: {
          //       value: formatDate(controllerField.value),
          //       placeholder: placeholder,
          //     },
          //   },
          // }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerField;
