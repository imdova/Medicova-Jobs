"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { NextAuthProvider } from "@/NextAuthProvider";
import GoogleButton from "./googleButton";
import { useRouter } from "next/navigation";
import FacebookButton from "./facebookButton";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

type UserType = "jobSeeker" | "employer";

const user = {
  email: "admin@medicova.com",
  password: "123456",
};

interface LoginFormProps {
  userType: "jobSeeker" | "employer";
  setUserType: React.Dispatch<React.SetStateAction<"jobSeeker" | "employer">>;
}

const LoginForm: React.FC<LoginFormProps> = ({ userType, setUserType }) => {
  const router = useRouter();
  // const [userType, setUserType] = useState<UserType>("employer"); // default to jobSeeker
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const validateForm = (data: FormData) => {
    if (data.email === user.email) {
      if (data.password === user.password) {
        return true;
      }
    }
    setError("Email Address or Password is incorrect");
    return false;
  };
  const onSubmit = (data: FormData) => {
    if (validateForm(data)) {
      router.push("/profile");
    }
    console.log("Form Submitted:", data);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "500px",
        width: "100%",
        mx: "auto",
      }}
    >
      <div className="mb-3 flex justify-center gap-2">
        <Button
          onClick={() => setUserType("jobSeeker")}
          className={`${userType === "jobSeeker" ? "bg-primary-100 text-primary" : "text-secondary"} px-5 py-3 duration-200`}
          variant="text"
        >
          Job Seeker
        </Button>
        <Button
          onClick={() => setUserType("employer")}
          className={`${userType === "employer" ? "bg-primary-100 text-primary" : "text-secondary"} px-5 py-3 duration-200`}
          variant="text"
        >
          Employer
        </Button>
      </div>

      <h4 className="text-main my-2 text-3xl font-bold">
        Welcome Back, in{" "}
        <span className="text-light-primary my-2 text-3xl font-bold">
          Medicova
        </span>
      </h4>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <NextAuthProvider>
          <GoogleButton>Login with Google</GoogleButton>
        </NextAuthProvider>
        {userType === "jobSeeker" && (
          <NextAuthProvider>
            <FacebookButton>Login with Facebook</FacebookButton>
          </NextAuthProvider>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginY: 2,
        }}
      >
        <Divider sx={{ flex: 1 }} />
        <Typography
          sx={{
            marginX: 2,
            fontWeight: "medium",
            color: "gray",
          }}
        >
          Or login with email
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Field */}
        <Box sx={{ mb: 2 }}>
          <InputLabel
            sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
          >
            Email Address
          </InputLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Box>

        {/* Password Field */}
        <Box>
          <InputLabel
            sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
          >
            Password
          </InputLabel>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Box>

        {/* Remember Me Checkbox */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mb: 1,
          }}
        >
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    sx={{
                      "&.Mui-checked": {
                        color: "var(--primary)",
                      },
                    }}
                  />
                }
                label={<p className="text-secondary">Remember me</p>}
              />
            )}
          />
          <Link
            href="/forget"
            className="text-secondary font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </Box>
        <Typography className="my-1 text-red-500">{error}</Typography>

        {/* Submit Button */}
        <Button
          sx={{
            height: "50px",
            fontWeight: "700",
            fontSize: "16px",
            textTransform: "capitalize",
            mb: 1,
          }}
          type="submit"
          variant="contained"
          fullWidth
        >
          Login
        </Button>

        {/* Sign Up Link */}
        <p className="text-secondary mt-1">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary inline text-lg font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Box>
  );
};

export default LoginForm;
