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
  const [activeLink, setActiveLink] = useState("employer");
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

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Button
          onClick={() => handleLinkClick("jobSeeker")}
          sx={{
            padding: "10px 20px",
            color: activeLink === "jobSeeker" ? "#6CC6A3" : "#000",
            backgroundColor:
              activeLink === "jobSeeker" ? "transparent" : "#E9EBFD",
            transition: "all 0.3s ease",
          }}
          variant="text"
        >
          Job Seeker
        </Button>
        <Button
          onClick={() => handleLinkClick("employer")}
          sx={{
            padding: "10px 20px",
            color: activeLink === "employer" ? "#6CC6A3" : "#000",
            backgroundColor:
              activeLink === "employer" ? "transparent" : "#E9EBFD",
            transition: "all 0.3s ease",
          }}
          variant="text"
        >
          Employer
        </Button>
      </Box>

      <Typography
        sx={{
          fontWeight: "bold",
          color: "#03353C",
          fontSize: "29px",
        }}
        gutterBottom
      >
        Signup as a {activeLink === "jobSeeker" ? "Job Seeker" : "Recruiter"} on{" "}
        <Typography
          component="span"
          sx={{
            display: "inline",
            fontWeight: "bold",
            background: "linear-gradient(180deg, #2EAE7D, #134834)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "inherit",
          }}
        >
          Medicova
        </Typography>
      </Typography>
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

        {activeLink === "employer" && (
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
            background: "linear-gradient(180deg, #2EAE7D, #185D43)",
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
        <Typography
          component="span"
          sx={{
            fontSize: "14px",
            color: "#202430",
            fontWeight: "400",
          }}
        >
          Aleardy on MEDICOVA ?{" "}
        </Typography>
        <Link href="/login" passHref>
          <Typography
            component="span"
            sx={{
              fontSize: "16px",
              color: "#2EAE7DBF",
              fontWeight: "600",
            }}
          >
            Login
          </Typography>
        </Link>
      </form>
    </Box>
  );
};

export default RegisterForm;
