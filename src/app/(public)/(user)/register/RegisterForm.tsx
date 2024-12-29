"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  InputLabel,
} from "@mui/material";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { NextAuthProvider } from "@/NextAuthProvider";
import GoogleButton from "../login/googleButton";
import { useForm, Controller } from "react-hook-form";

const RegisterForm: React.FC = () => {
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

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
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
        minWidth: "350px",
        padding: 2,
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

      <h4 className="text-main my-2 text-[30px] font-bold">
        Signup as a {userType === "jobSeeker" ? "Job Seeker" : "Recruiter"} on{" "}
        <span className="text-light-primary my-2 text-[30px] font-bold">
          Medicova
        </span>
      </h4>
      <NextAuthProvider>
        <GoogleButton>SignUp with Google</GoogleButton>
      </NextAuthProvider>
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
            gap: 2,
            mb: 2,
          }}
        >
          {/* First Name */}
          <Box sx={{ flex: 1 }}>
            <InputLabel
              sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
            >
              First Name
            </InputLabel>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter first name"
                  fullWidth
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
            <InputLabel
              sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
            >
              Last Name
            </InputLabel>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter last name"
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

        <Box sx={{ mb: 2 }}>
          <InputLabel
            sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
          >
            Email Address
          </InputLabel>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter email address"
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

        <Box sx={{ mb: 2 }}>
          <InputLabel
            sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
          >
            Password
          </InputLabel>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter password"
                type="password"
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
            }}
          />
        </Box>

        {userType === "employer" && (
          <Box sx={{ mb: 2 }}>
            <InputLabel
              sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
            >
              Company Name
            </InputLabel>
            <Controller
              control={control}
              name="companyName"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter company name"
                  fullWidth
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
              )}
              rules={{
                required: "Company Name is required",
                minLength: {
                  value: 3,
                  message: "Company Name must be at least 3 characters",
                },
              }}
            />
          </Box>
        )}

        <Box
          sx={{
            mb: 2,
            "& .PhoneInput": {
              display: "flex",
              paddingY: "10px",
              gap: "5px",
            },
            "& .PhoneInputInput": {
              border: "1px solid #ccc",
              padding: "15px",
              fontSize: "14px",
              width: "100%",
              "&::placeholder": {
                color: "#000", // Set placeholder color to black
                opacity: 0.7, // Ensure full opacity
              },
            },
            "& .PhoneInputCountrySelect": {
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "5px",
              fontSize: "14px",
              height: "35px",
              backgroundColor: "#f9f9f9",
            },
            "& .PhoneInputCountrySelect:hover": {
              backgroundColor: "#eaeaea",
            },
            "& .PhoneInputCountrySelect:focus": {
              outline: "none",
              borderColor: "#2EAE7D",
            },
            "& .PhoneInputCountrySelectDropdown": {
              maxHeight: "150px",
              overflowY: "auto",
            },
            "& .PhoneInputCountrySelectDropdownItem": {
              padding: "6px 10px",
            },
          }}
        >
          <InputLabel
            sx={{ fontSize: "16px", fontWeight: 600, color: "#515B6F" }}
          >
            Phone Number
          </InputLabel>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="EG"
                value={field.value ?? ""}
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
          Sign Up
        </Button>
        <p className="text-secondary mt-1">
          Aleardy on MEDICOVA ?{" "}
          <Link
            href="/login"
            className="text-primary inline text-lg font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </Box>
  );
};

export default RegisterForm;
