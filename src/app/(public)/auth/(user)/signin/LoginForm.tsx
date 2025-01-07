"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { NextAuthProvider } from "@/NextAuthProvider";
import { apiCall, UseApiOptions } from "@/hooks/APIUse";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import { UserState } from "@/types";
import { useRouter } from "next/navigation";
import GoogleButton from "@/components/auth/googleButton";
import FacebookButton from "@/components/auth/facebookButton";
import { signIn } from "next-auth/react";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // async function login(data: FormData) {
  //   const url = "/users/api/v1.0/employer-users/login";
  //   const options: UseApiOptions = {
  //     method: "POST",
  //     data: data,
  //     config: {
  //       withCredentials: true,
  //     },
  //     userType: "employer-user",
  //   };
  //   setLoading(true);
  //   try {
  //     const response: UserState = await apiCall(url, options);
  //     dispatch(setUser(response));
  //     router.replace(`/me/${response.firstName}`);
  //   } catch (error: any) {
  //     if (error.status == "401") {
  //       setError("Email Address or Password is incorrect");
  //     } else {
  //       console.error("🚀 ~ login ~ error:", error);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const onSubmit = async (data: FormData) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/employer/dashboard",
    });
  };

  // const onSubmit = async (data: any) => {
  //   await signIn("credentials", {
  //     email: data.email,
  //     password: data.password,
  //     callbackUrl: "/dashboard",
  //   });
  // };

  useEffect(() => {
    if (user.id) {
      router.replace(`/me/${user.firstName}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
      <h4 className="my-2 text-3xl font-bold text-main">
        Welcome Back, in{" "}
        <span className="my-2 text-3xl font-bold text-light-primary">
          Medicova
        </span>
      </h4>
      <div className="flex w-full justify-center gap-2">
        <NextAuthProvider>
          <GoogleButton>Login with Google</GoogleButton>

          <FacebookButton>Login with Facebook</FacebookButton>
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
          Or login with email
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Field */}
        <Box sx={{ mb: 2 }}>
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
                label="Email Address"
                variant="outlined"
                id="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Box>

        {/* Password Field */}
        <Box>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                fullWidth
                label="Password"
                variant="outlined"
                id="password"
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
            className="font-semibold text-secondary hover:underline"
          >
            Forgot Password?
          </Link>
        </Box>
        <p className="my-1 text-red-500">{error}</p>

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
          {loading ? "loading..." : "Login"}
        </Button>

        {/* Sign Up Link */}
        <p className="mt-1 text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="inline text-lg font-semibold text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Box>
  );
};

export default LoginForm;
