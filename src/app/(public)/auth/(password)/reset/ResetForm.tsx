"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import OTPInput from "@/components/UI/OTP";
import { useRouter } from "next/navigation";
import { API_VALIDATE_OTP } from "@/lib/constants";

const OTP_LENGTH = 4;

const ResetForm: React.FC<{ email: string }> = ({ email }) => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const validateForm = () => {
    let error = "";
    if (!otp) {
      error = "Enter all digits";
    }
    if (otp.length !== OTP_LENGTH) {
      error = "Invalid OTP";
    }
    setError(error);
    return !error;
  };

  const validateOTP = async ({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch(API_VALIDATE_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });
      if (response.ok) {
        router.push("/auth/reset");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", otp);
      // validateOTP({ email, otp });
      router.push("/auth/set");
    }
  };

  return (
    <Box>
      <form noValidate onSubmit={handleSubmit}>
        <Box className="w-full md:min-w-[400px]">
          <div className="my-4 flex w-full max-w-[400px] justify-center space-x-2 px-8">
            <OTPInput
              length={OTP_LENGTH}
              onChange={(otp) => setOtp(otp)}
              error={!!error}
            />
          </div>
          <Typography className="my-1 text-center text-red-500">
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
      <p className="mt-2 text-center font-semibold text-secondary">
        Don&apos;t receive the email ?{" "}
        <button className="text-light-primary underline hover:no-underline">
          Click here to send again
        </button>
      </p>
    </Box>
  );
};

export default ResetForm;
