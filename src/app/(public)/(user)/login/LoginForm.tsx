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

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>("jobSeeker"); // default to jobSeeker
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Button
          onClick={() => setUserType("jobSeeker")}
          sx={{
            padding: "10px 20px",
            color: userType === "jobSeeker" ? "#000" : "#6CC6A3",
            backgroundColor:
              userType === "jobSeeker" ? "#E9EBFD" : "transparent",
            transition: "all 0.3s ease",
          }}
          variant="text"
        >
          Job Seeker
        </Button>
        <Button
          onClick={() => setUserType("employer")}
          sx={{
            padding: "10px 20px",
            color: userType === "employer" ? "#000" : "#6CC6A3",
            backgroundColor:
              userType === "employer" ? "#E9EBFD" : "transparent",
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
        }}
        variant="h4"
        gutterBottom
      >
        Welcome Back, in{" "}
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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <NextAuthProvider>
          <GoogleButton>Login with Google</GoogleButton>
        </NextAuthProvider>
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
                        color: "#2EAE7D",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "#515B6F", fontWeight: "400" }}>
                    Remember me
                  </Typography>
                }
              />
            )}
          />
          <Link href="/forget" passHref>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#515B6F",
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </Typography>
          </Link>
        </Box>
        <Typography className=" text-red-500 my-1">{error}</Typography>

        {/* Submit Button */}
        <Button
          sx={{
            background: "linear-gradient(180deg, #2EAE7D, #185D43)",
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
        <Typography
          component="span"
          sx={{
            fontSize: "14px",
            color: "#202430",
            fontWeight: "400",
          }}
        >
          Don’t have an account?{" "}
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: "14px", color: "#515B6F" }}
        >
          {error}{" "}
        </Typography>
        <Link href="/register" passHref>
          <Typography
            component="span"
            sx={{
              fontSize: "16px",
              color: "#2EAE7DBF",
              fontWeight: "600",
            }}
          >
            Sign Up
          </Typography>
        </Link>
      </form>
    </Box>
  );
};

export default LoginForm;
