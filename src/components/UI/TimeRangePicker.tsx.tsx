"use client";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface TimeRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface TimeRangePickerProps {
  onChange?: (range: TimeRange) => void;
  initialRange?: TimeRange;
  labelStart?: string;
  labelEnd?: string;
}

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  onChange,
  initialRange = { startDate: null, endDate: dayjs() },
  labelStart = "Start Date",
  labelEnd = "End Date",
}) => {
  const [range, setRange] = useState<TimeRange>({
    startDate: initialRange.startDate,
    endDate: initialRange.endDate || dayjs(),
  });

  const handleStartDateChange = (newValue: Dayjs | null) => {
    const newRange = {
      ...range,
      startDate: newValue,
      endDate:
        newValue && range.endDate && range.endDate.isBefore(newValue)
          ? null
          : range.endDate,
    };
    setRange(newRange);
    onChange?.(newRange);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    const newRange = { ...range, endDate: newValue };
    setRange(newRange);
    onChange?.(newRange);
  };

  // Custom format function for MM/DD if same year as today
  const formatDate = (date: Dayjs | null) => {
    if (!date) return "";
    const currentYear = dayjs().year();
    return date.year() === currentYear ? date.format("MM/DD") : date.format("MM/DD/YYYY");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex w-full gap-2">
        <DatePicker
          label={labelStart}
          value={range.startDate}
          onChange={handleStartDateChange}
          maxDate={range.endDate || dayjs()}
          format="MM/DD/YYYY" // Full format for picker, but input will use custom formatting
          slotProps={{
            textField: {
              size: "medium",
              variant: "outlined",
              InputProps: {
                // Display MM/DD if same year
                value: formatDate(range.startDate),
              },
              sx: {
                width: 120, // Even smaller width
                // "& .MuiInputBase-root": {
                //   height: 32, // Smaller height
                //   fontSize: "0.75rem", // Smaller font (12px)
                // },
                "& .MuiInputLabel-root": {
                  fontSize: "0.75rem", // Smaller label font
                  top: -4, // Adjust label position for smaller height
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.87)",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                },
              },
            },
          }}
        />
        <DatePicker
          label={labelEnd}
          value={range.endDate}
          onChange={handleEndDateChange}
          minDate={range.startDate || undefined}
          maxDate={dayjs()}
          format="MM/DD/YYYY" // Full format for picker, but input will use custom formatting
          slotProps={{
            textField: {
              size: "medium",
              variant: "outlined",
              InputProps: {
                // Display MM/DD if same year
                value: formatDate(range.endDate),
              },
              sx: {
                width: 120, // Even smaller width
                // "& .MuiInputBase-root": {
                //   height: 32, // Smaller height
                //   fontSize: "0.75rem", // Smaller font (12px)
                // },
                "& .MuiInputLabel-root": {
                  fontSize: "0.75rem", // Smaller label font
                  top: -4, // Adjust label position for smaller height
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.87)",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                },
              },
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};