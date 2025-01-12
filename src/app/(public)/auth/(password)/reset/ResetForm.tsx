"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import OTPInput from "@/components/UI/OTP";
import { useRouter } from "next/navigation";
import { sendOTP, validateOTP } from "@/lib/access";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ResendEmailTimer from "./ResendEmailTimer";
import { setEmail } from "@/store/slices/resetSlice";

const OTP_LENGTH = 6;

const ResetForm: React.FC = () => {
  const email = useAppSelector((state) => state.resetEmail.email);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const validateForm = () => {
    let error = "";
    if (!email) {
      error = "Email is required";
    }
    if (!otp) {
      error = "Enter all digits";
    }
    if (otp.length !== OTP_LENGTH) {
      error = "Invalid OTP";
    }
    setError(error);
    return !error;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && email) {
      const result = await validateOTP({ otp, email });
      if (result.success) {
        setLoading(false);
        dispatch(setEmail({ email, otp }));
        router.push("/auth/set");
      } else {
        setLoading(false);
        setError(result.message);
      }
    }
  };

  const resendEmail = async () => {
    if (email) {
      await sendOTP(email);
    }
  };

  if (!email) {
    router.replace(`/auth/forget`);
  }
  return (
    <div>
      <p className="mb-4 text-center text-secondary">
        We send a Code to <span className="text-light-primary">{email}</span>
      </p>
      <form noValidate onSubmit={onSubmit}>
        <div className="flex w-full flex-col items-center justify-center md:min-w-[400px]">
          <div className="my-4 flex w-full max-w-[400px] justify-center space-x-2 px-8">
            <OTPInput
              length={OTP_LENGTH}
              onChange={(otp) => setOtp(otp)}
              error={!!error}
            />
          </div>
          <p className="my-1 text-center text-red-500">{error}</p>

          {/* Send Button */}

          <Button
            variant="contained"
            disabled={otp.length !== OTP_LENGTH || loading}
            fullWidth
            sx={{
              paddingY: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
            }}
            type="submit"
          >
            {loading ? "Loading..." : "Verify"}
          </Button>
        </div>
      </form>
      <ResendEmailTimer initialTime={30} onResend={resendEmail} />
    </div>
  );
};

export default ResetForm;
