"use client";
import React, { useState, useRef } from "react";
import { Box, TextField } from "@mui/material";

const OTPInput = ({
  length = 6,
  onChange,
  error,
}: {
  length?: number;
  onChange?: (otp: string) => void;
  error?: boolean;
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (onChange) onChange(newOtp.join(""));

    // Move to the next input field if the current one is filled
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, length);
      setOtp(newOtp);
      if (onChange) onChange(newOtp.join(""));
      newOtp.forEach((char, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i].value = char;
        }
      });
    }
    e.preventDefault();
  };

  return (
    <Box display="flex" gap={1} justifyContent="center">
      {otp.map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputsRef.current[index] = el!)}
          value={otp[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          error={error}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              width: "40px",
              height: "40px",
            },
          }}
          autoFocus={index === 0}
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default OTPInput;
