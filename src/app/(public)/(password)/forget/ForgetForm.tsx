"use client";
import React, { useState } from "react";
import { Box, TextField, Button, InputLabel } from "@mui/material";
import { useRouter } from "next/navigation";

const ForgetForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,4}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      router.push("/reset");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full justify-center items-center flex flex-col py-5"
    >
      <Box className="w-full md:w-[400px]">
        <Box sx={{ mb: !!errors.email ? 1 : 2 }}>
          <InputLabel
            sx={{ color: "#515B6F", fontWeight: "600", fontSize: "16px" }}
          >
            Email Address
          </InputLabel>
          <TextField
            placeholder="Enter email address"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
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
          Send
        </Button>
      </Box>
    </form>
  );
};

export default ForgetForm;
