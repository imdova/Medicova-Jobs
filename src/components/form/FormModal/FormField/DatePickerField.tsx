import { FieldConfig } from "@/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { formatDate } from "@/util";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DatePickerFieldProps {
  field: FieldConfig;
  controllerField: any;
  error: any;
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        {field.label && (
          <label htmlFor={String(field.name)} className="mb-1 font-semibold">
            {field.label}
          </label>
        )}
        <DatePicker
          label="Start Date"
          value={controllerField.value}
          onChange={(date) => controllerField.onChange(date)}
          maxDate={dayjs()} // Set max date to today
          format="MM/DD/YYYY"
          slotProps={{
            textField: {
              ...field.textFieldProps,
              size: "medium",
              variant: "outlined",
              placeholder:
                field.textFieldProps?.placeholder || placeholder || "",
              error: !!error,
              helperText: error?.message,
              InputProps: {
                value: formatDate(controllerField.value),
                placeholder: placeholder,
              },
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatePickerField;
