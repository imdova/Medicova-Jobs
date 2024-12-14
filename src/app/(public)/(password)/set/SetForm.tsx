"use client";

import React, { useState } from "react";
import { Box, TextField, Button, InputLabel } from "@mui/material";
import { useRouter } from "next/navigation";

const SetForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password does not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      router.push("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full justify-center items-center flex flex-col py-5"
    >
      <Box className="w-full md:w-[400px]">
        <Box sx={{ mb: 2 }}>
          <InputLabel
            sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
          >
            Password
          </InputLabel>
          <TextField
            placeholder="Enter password"
            type="password"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <InputLabel
            sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
          >
            Confirme Password
          </InputLabel>
          <TextField
            placeholder="Enter Confirm password"
            type="password"
            fullWidth
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </Box>

        {/* Send Button */}
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
        >
          Set
        </Button>
      </Box>
    </form>
  );
};

export default SetForm;
