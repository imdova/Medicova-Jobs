"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DynamicRadioGroup from "@/components/form/DynamicRadioGroup";

interface Company {
  name: string;
  about?: string;
  isPrivate?: boolean;
  isProfitable?: boolean;
  status?: "active" | "inactive";
  countryCode?: string;
  stateCode?: string;
  city?: string;
  size?: "small" | "medium" | "large";
  phone?: string;
  email?: string;
  yearFounded?: number;
  photo?: string;
  socialLinks?: {
    linkedin?: string;
  };
  visible?: boolean;
  profileUrl?: string;
}
const initialCompany: Company = {
  name: "Tech Cosrp",
  about: "A compansy specializing in tech solutions.",
  isPrivate: true,
  isProfitable: true,
  status: "active",
  countryCode: "US",
  stateCode: "CA",
  city: "Los Angeles",
  size: "small",
  phone: "+201041528563",
  email: "contact1@company.com",
  yearFounded: 2000,
};

const CompanyInfoForm: React.FC = () => {
  const [data, setData] = useState<Company>(initialCompany);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = parseInt(e.target.value, 10);
    const currentYear = new Date().getFullYear();
    if (inputYear < 1970) {
      setError("Year must be 1970 or later.");
    } else if (inputYear > currentYear) {
      setError(`Year cannot exceed ${currentYear}.`);
    } else {
      setError(null);
    }
    setData({ ...data, yearFounded: inputYear });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value ?? checked,
    // });
  };

  const validateForm = () => {
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", data);
    }
  };

  return (
    <form
      className="rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5"
      onSubmit={handleSubmit}
      noValidate
    >
      <h5 className="my-4 text-2xl font-semibold text-main">
        Company Main Information
      </h5>
      {/* Company Sector and Company Type Selectors */}
      <SectorSelection data={data} setData={setData} />
      <h5 className="mb-2 text-2xl font-semibold text-main">
        Company Ownership Type
      </h5>
      <FormControl className="mb-4" component="fieldset" fullWidth>
        <div className="flex flex-wrap items-center gap-2">
          <DynamicRadioGroup
            options={[
              { value: "private", label: "Private" },
              { value: "governmental", label: "Governmental" },
            ]}
            defaultValue="private"
            row
            onChange={(value) =>
              setData({
                ...data,
                isPrivate: value === "private" ? true : false,
              })
            }
          />
          <span>&</span>
          <DynamicRadioGroup
            options={[
              { value: "nonProfit", label: "Non-Profit Org" },
              { value: "profit", label: "Profit Org" },
            ]}
            defaultValue="profit"
            row
            onChange={(value) =>
              setData({
                ...data,
                isProfitable: value === "profit" ? true : false,
              })
            }
          />
        </div>
      </FormControl>

      {/* Additional Form Fields */}
      <div className="mb-4 flex gap-5">
        <div className="flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Country
          </InputLabel>
          <TextField className="w-full" defaultValue="Egypt" />
        </div>
        <div className="flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            City
          </InputLabel>
          <TextField className="w-full" defaultValue="Cairo" />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-5">
        <div className="flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Company Size
          </InputLabel>
          <Select
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: { maxHeight: 300 },
              },
            }}
            className="w-full"
            defaultValue="1-10"
          >
            <MenuItem value="1-10">1-10 employees</MenuItem>
            <MenuItem value="11-50">11-50 employees</MenuItem>
            <MenuItem value="51-200">51-200 employees</MenuItem>
          </Select>
        </div>
        <div className="flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Year Founded
          </InputLabel>
          <Select
            className="w-full"
            value={data.yearFounded}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: { maxHeight: 300 },
              },
            }}
            // onChange={handleYearChange}
          >
            {Array.from({
              length: new Date().getFullYear() - 1800 + 1,
            }).map((_, i) => (
              <MenuItem key={i + 1800} value={i + 1800}>
                {i + 1800}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-5">
        <div className="min-w-[250px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Email
          </InputLabel>
          <TextField
            name="email"
            placeholder="Enter your email"
            className="w-full"
            value={data.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>

        <div className="min-w-[250px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Phone Number
          </InputLabel>
          <Box
            className="w-full"
            sx={{
              mb: 1,
              "& .PhoneInput": {
                display: "flex",
                border: "1px solid #ccc",
                height: "50px",
                borderRadius: "10px",
              },
              "& .PhoneInputInput": {
                padding: "15px",
                fontSize: "14px",
                width: "100%",
                borderRadius: "0 10px 10px 0",
                border: "1px solid transparent",
                backgroundColor: "transparent",
                height: "50px",

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
            <PhoneInput
              defaultCountry="EG"
              value={data.phone ?? ""}
              labels={{ phone: "Enter Phone Number" }}
              id=""
              placeholder="Enter phone number"
              onChange={(value) => setData({ ...data, phone: value ?? "" })}
            />
          </Box>
        </div>
      </div>

      {/* Centered Save Button */}
      <div className="flex justify-center">
        <Button variant="contained" className="text-xl">
          Create Company
        </Button>
      </div>
    </form>
  );
};

export default CompanyInfoForm;

interface SectorSelectionProps {
  data: Company;
  setData: React.Dispatch<React.SetStateAction<Company>>;
}

const SectorSelection = ({ data, setData }: SectorSelectionProps) => {
  return (
    <div className="mb-8 flex flex-wrap gap-5 md:flex-nowrap">
      {/* Company Sector Selector */}
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Company Sector
        </InputLabel>
        <FormControl fullWidth>
          <Select
            className="w-full"
            defaultValue="Healthcare"
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: { maxHeight: 300 },
              },
            }}
          >
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Company Type Selector */}
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          Company Type
        </InputLabel>
        <FormControl fullWidth>
          <Select
            className="w-full"
            defaultValue="Hospital"
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                sx: { maxHeight: 300 },
              },
            }}
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="Clinic">Clinic</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
