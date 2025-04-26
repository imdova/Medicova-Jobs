"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { NextAuthProvider } from "@/NextAuthProvider";
import { useForm, Controller } from "react-hook-form";
import GoogleButton from "@/components/auth/googleButton";
import FacebookButton from "@/components/auth/facebookButton";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { registerData } from "@/types";
import { RoleState } from "@/types/next-auth";
import { signIn } from "next-auth/react";
import PhoneNumberInput from "@/components/UI/phoneNumber";
import { isValidPhoneNumber } from "@/util/forms";
import { passwordRules } from "@/constants";

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<RoleState>("seeker");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      phone: "",
    },
  });

  const onSubmit = async (data: registerData) => {
    setLoading(true);
    setError("");
    try {
      const result = await signIn("register", {
        ...data,
        type: userType,
        redirect: false,
      });
      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or phone Number"
            : "An error occurred during sign in",
        );
      } else {
        if (window?.location) window.location.href = "/me";
      }
    } catch (error) {
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
        padding: 2,
      }}
    >
      <div className="flex justify-center gap-2">
        <Button
          onClick={() => setUserType("seeker")}
          className={`${userType === "seeker" ? "bg-primary-100 text-primary" : "text-gray-300"} px-5 py-3 duration-200`}
          variant="text"
        >
          Job Seeker
        </Button>
        <Button
          onClick={() => setUserType("employer")}
          className={`${userType === "employer" ? "bg-primary-100 text-primary" : "text-gray-300"} px-5 py-3 duration-200`}
          variant="text"
        >
          Employer
        </Button>
      </div>

      <h4 className="my-2 text-[30px] font-bold text-main">
        Signup as a {userType === "seeker" ? "Job Seeker" : "Recruiter"} on{" "}
        <span className="my-2 text-[30px] font-bold text-light-primary">
          Medicova
        </span>
      </h4>
      <div className="flex w-full justify-center gap-2">
        <NextAuthProvider>
          <GoogleButton userType={userType}>SignUp with Google</GoogleButton>
          {userType === "seeker" && (
            <FacebookButton>Sign Up with Facebook</FacebookButton>
          )}
        </NextAuthProvider>
      </div>
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
          Or Registration with email
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 1,
          }}
        >
          {/* First Name */}
          <Box sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter first name"
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  id="firstName"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  onChange={(e) => field.onChange(e.target.value.trim())}
                />
              )}
              rules={{
                required: "First name is required",
                minLength: {
                  value: 3,
                  message: "First name must be at least 3 characters",
                },
              }}
            />
          </Box>

          {/* Last Name */}
          <Box sx={{ flex: 1 }}>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter last name"
                  label="Last Name"
                  variant="outlined"
                  id="last-name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  onChange={(e) => field.onChange(e.target.value.trim())}
                />
              )}
              rules={{
                required: "Last name is required",
                minLength: {
                  value: 3,
                  message: "Last name must be at least 3 characters",
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 1 }}>
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
        </Box>

        <Box sx={{ mb: 1, position: "relative" }}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                fullWidth
                label="Password"
                variant="outlined"
                id="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? (
                        <VisibilityOffOutlined
                          sx={{ color: errors.password ? "red" : "gray" }}
                        />
                      ) : (
                        <VisibilityOutlined
                          sx={{ color: errors.password ? "red" : "gray" }}
                        />
                      )}
                    </IconButton>
                  ),
                }}
              />
            )}
            rules={passwordRules}
          />
        </Box>
        <Box sx={{ mb: 1, position: "relative" }}>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: "Phone Number is required",
              validate: (value) =>
                isValidPhoneNumber(value || "") ||
                "Please enter a valid phone number",
            }}
            render={({ field }) => (
              <PhoneNumberInput
                {...field}
                placeholder="Enter Phone Number"
                fullWidth
                variant="outlined"
                id="phone"
                error={!!errors.phone}
              />
            )}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </Box>

        <p className="my-1 text-red-500">{error}</p>
        <Button
          sx={{
            height: "50px",
            fontWeight: "700",
            fontSize: "16px",
            textTransform: "capitalize",
          }}
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <p className="mt-1 text-secondary">
          Aleardy on MEDICOVA ?{" "}
          <Link
            href="/auth/signin"
            className="inline text-lg font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </Box>
  );
};

export default RegisterForm;
