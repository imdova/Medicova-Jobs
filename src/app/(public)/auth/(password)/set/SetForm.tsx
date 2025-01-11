"use client";

import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { UserState } from "@/types";
import { changePassword } from "@/lib/access";

const SetForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const { data: session , status} = useSession();
  const user = session?.user as UserState;

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

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (validateForm() && user?.email) {
      setLoading(true);
      const result = await changePassword({
        email: user.email,
        password: data.password,
      });
      if (result.success) {
        setLoading(false);
        router.push(`/`);
      } else {
        setLoading(false);
        setError(result.message);
      }
    }
  };

  useEffect(() => {
    if (!user?.id && status !== "loading") {
      router.push("/auth/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

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
