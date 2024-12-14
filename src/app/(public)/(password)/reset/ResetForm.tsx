"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import OTPInput from "@/components/UI/OTP";
import { useRouter } from "next/navigation";

const OTP_MATCH = "1234";
const OTP_LENGTH = 4;

const ResetForm: React.FC = () => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let error = "";
    if (!otp) {
      error = "Enter all digits";
    }
    if (otp !== OTP_MATCH) {
      error = "Invalid OTP";
    }
    setError(error);
    return !error;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", otp);
      router.push("/set");
    }
  };

  return (
    <Box>
      <form noValidate onSubmit={handleSubmit}>
        <Box className="w-full md:min-w-[400px]">
          <div className="flex space-x-2 justify-center w-full max-w-[400px] my-4 px-8">
            <OTPInput
              length={OTP_LENGTH}
              onChange={(otp) => setOtp(otp)}
              error={!!error}
            />
          </div>
          <Typography className="text-center text-red-500 my-1">
            {error}
          </Typography>

          {/* Send Button */}

          <Button
            variant="contained"
            disabled={otp.length !== OTP_LENGTH}
            fullWidth
            sx={{
              maxWidth: 400,
              paddingY: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
            }}
            type="submit"
          >
            Verify
          </Button>
        </Box>
      </form>
      <Typography className="text-center text-[#2EAE7D]  font-semibold mt-2">
        Don’t receive the email ?{" "}
        <button className="  text-[#134834] underline hover:no-underline ">
          Click here to send again
        </button>
      </Typography>
    </Box>
  );
};

export default ResetForm;
