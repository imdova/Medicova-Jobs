"use client";

import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { API_CHANGE_PASSWORD } from "@/lib/constants";

const SetForm: React.FC<{ email: string }> = ({ email }) => {
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
      password: "",
      confirmPassword: "",
    },
  });

  const validateForm = () => {
    // Custom validation logic
    const { password, confirmPassword } = getValues();
    if (!password || !confirmPassword) {
      setError("Both fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords must match");
      return false;
    }
    setError("");
    return true;
  };

  const changePassword = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch(API_CHANGE_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (validateForm()) {
      console.log("Form submitted:", data);
      changePassword({ email, password: data.password });
      router.push("/auth/signin");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col items-center justify-center p-4"
    >
      <Box className="w-full md:w-[400px]">
        {/* Password Field */}
        <Box sx={{ mb: 2 }}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                message:
                  "Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol",
              },
            }}
          />
        </Box>

        {/* Confirm Password Field */}
        <Box sx={{ mb: 2 }}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter confirm password"
                type="password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords must match",
            }}
          />
        </Box>

        {/* Error message */}
        {error && <p className="my-1 text-red-500">{error}</p>}

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            maxWidth: 400,
            paddingY: 1.5,
            fontSize: "16px",
            fontWeight: "bold",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Set"}
        </Button>
      </Box>
    </form>
  );
};

export default SetForm;
