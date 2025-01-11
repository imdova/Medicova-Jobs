"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import OTPInput from "@/components/UI/OTP";
import { useRouter } from "next/navigation";
import { sendOTP, validateOTP } from "@/lib/access";
import { useAppSelector } from "@/store/hooks";
import ResendEmailTimer from "./ResendEmailTimer";
import { signIn } from "next-auth/react";

const OTP_LENGTH = 6;

const ResetForm: React.FC = () => {
  const email = useAppSelector((state) => state.resetEmail.email);
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
      setLoading(true);
      try {
        const result = await signIn("OTP-Credentials", {
          email: email,
          otp: otp,
          redirect: false,
        });
        if (result?.error) {
          setError(
            result.error === "CredentialsSignin"
              ? "Invalid email or password"
              : "An error occurred during sign in",
          );
        } else {
          window.location.href = "/auth/set";
        }
      } catch (error) {
        setError("Failed to sign in");
      } finally {
        setLoading(false);
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
