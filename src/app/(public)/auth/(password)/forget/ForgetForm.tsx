"use client";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { API_SEND_OTP } from "@/lib/constants";
import { Controller, useForm } from "react-hook-form";

const ForgetForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const validateForm = () => {
    // Custom email validation can be added here if needed.
    if (!getValues("email")) {
      setError("Email is required");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(getValues("email"))) {
      setError("Enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const sendOTP = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(API_SEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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

  const onSubmit = async (data: { email: string }) => {
    if (validateForm()) {
      router.push(`/auth/reset?em=${data.email}`);
      // await sendOTP(data.email);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col items-center justify-center"
    >
      <div className="w-full md:w-[400px]">
        <div className="mb-2">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter email address"
                label="Email Address"
                variant="outlined"
                id="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            }}
          />
          {error && <p className="my-1 text-red-500">{error}</p>}
        </div>
        <Button
          variant="contained"
          className="h-[45px] w-full max-w-[400px] py-2 font-bold"
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default ForgetForm;
