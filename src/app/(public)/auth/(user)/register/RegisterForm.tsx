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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { NextAuthProvider } from "@/NextAuthProvider";
import { useForm, Controller } from "react-hook-form";
import GoogleButton from "@/components/auth/googleButton";
import FacebookButton from "@/components/auth/facebookButton";
import {
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { register } from "@/lib/access";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"jobSeeker" | "employer">(
    "employer",
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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

  const validateForm = () => {
    const { firstName, lastName, email, password, companyName, phone } =
      watch();
    let error = "";
    if (!firstName) {
      error = "First name is required";
    }
    if (!lastName) {
      error = "Last name is required";
    }
    if (!email) {
      error = "Email is required";
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      error = "Enter a valid email address";
    }
    if (!password) {
      error = "Password is required";
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordPattern.test(password)) {
      error =
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol";
    }
    if (!phone) {
      error = "Phone number is required";
    }
    setError(error);
    return !error;
  };

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName: string;
    phone: string;
  }) => {
    if (validateForm()) {
      setLoading(true);
      const result = await register(data);
      if (result.success) {
        setLoading(false);
        router.replace(`/`);
      } else {
        setLoading(false);
        setError(result.message);
      }
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

      <h4 className="my-2 text-[30px] font-bold text-main">
        Signup as a {userType === "jobSeeker" ? "Job Seeker" : "Recruiter"} on{" "}
        <span className="my-2 text-[30px] font-bold text-light-primary">
          Medicova
        </span>
      </h4>
      <div className="flex w-full justify-center gap-2">
        <NextAuthProvider>
          <GoogleButton>SignUp with Google</GoogleButton>
          {userType === "jobSeeker" && (
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
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  ),
                }}
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

        <Box
          sx={{
            mb: 1,
            "& .PhoneInput": {
              display: "flex",
              border: "1px solid #ccc",
              borderRadius: "10px",
            },
            "& .PhoneInputInput": {
              padding: "15px",
              fontSize: "14px",
              width: "100%",
              borderRadius: "0 10px 10px 0",
              border: "1px solid transparent",
              "&::placeholder": {
                color: "#000", // Set placeholder color to black
                opacity: 0.7, // Ensure full opacity
              },
              "&:hover": {
                border: "1px solid black",
              },
              "&:focus": {
                border: "1px solid transparent",
                outline: "2px solid var(--light-primary)",
              },
            },
            "& .PhoneInputCountry": {
              borderRadius: "10px 0 0 10px",
              border: "1px solid transparent",
              display: "flex",
              gap: "5px",
              px: 1,
              m: 0,
            },
            "& .PhoneInputCountry:hover": {
              border: "1px solid black",
            },
          }}
        >
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="EG"
                value={field.value ?? ""}
                labels={{ phone: "Enter Phone Number" }}
                id=""
                placeholder="Enter phone number"
                onChange={(value) => setValue("phone", value ?? "")}
              />
            )}
            rules={{
              required: "Phone number is required",
            }}
          />
          {errors.phone && (
            <Typography sx={{ color: "red", fontSize: "12px" }}>
              {errors.phone.message}
            </Typography>
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
