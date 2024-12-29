"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
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

const ProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const [year, setYear] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | undefined>("");

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

    setYear(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value ?? checked,
    });
  };

  const validateForm = () => {
    const newErrors: any = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <h5 className="text-main mb-2 text-2xl font-semibold">
            Company Main Information
          </h5>
          <form onSubmit={handleSubmit} noValidate>
            {/* Company Sector and Company Type Selectors */}
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", md: "nowrap" },
                gap: 1,
                marginBottom: 2,
              }}
            >
              {/* Company Sector Selector */}
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Company Sector
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    sx={{
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      height: "40px",
                      width: { xs: "100%", md: "250px" },
                      fontSize: "14px",
                    }}
                    defaultValue="Healthcare"
                  >
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Company Type Selector */}
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Company Type
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    sx={{
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      height: "40px",
                      width: { xs: "100%", md: "250px" },
                      fontSize: "14px",
                    }}
                    defaultValue="Hospital"
                  >
                    <MenuItem value="Hospital">Hospital</MenuItem>
                    <MenuItem value="Clinic">Clinic</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Radio Group Section */}
            <Box sx={{ marginBottom: 2 }}>
              {/* Title for the Radio Group */}

              <h5 className="text-main mb-2 text-2xl font-semibold">
                Company Ownership Type
              </h5>

              <FormControl component="fieldset" fullWidth>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {/* First Radio Group */}
                  <RadioGroup row defaultValue="private">
                    <FormControlLabel
                      value="private"
                      sx={{ fontSize: "14px" }}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#2EAE7D" },
                            fontSize: "14px",
                          }}
                        />
                      }
                      label={<span style={{ fontWeight: "600" }}>Private</span>}
                    />
                    <FormControlLabel
                      value="governmental"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={
                        <span style={{ fontWeight: "600" }}>Governmental</span>
                      }
                    />
                  </RadioGroup>

                  {/* Typography with "&" */}
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    &
                  </Typography>

                  {/* Second Radio Group */}
                  <RadioGroup row defaultValue="profit">
                    <FormControlLabel
                      value="profit"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={
                        <span style={{ fontWeight: "600" }}>Profit Org</span>
                      }
                    />
                    <FormControlLabel
                      value="non-profit"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={
                        <span style={{ fontWeight: "600" }}>
                          Non-Profit Org
                        </span>
                      }
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </Box>

            {/* Additional Form Fields */}
            <Box sx={{ marginBottom: 2 }}>
              <InputLabel
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Country
              </InputLabel>
              <TextField
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
                fullWidth
                defaultValue="Egypt"
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <InputLabel
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                City
              </InputLabel>
              <TextField
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
                fullWidth
                defaultValue="Cairo"
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Company Size
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    sx={{
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      height: "40px",
                      fontSize: "14px",
                    }}
                    defaultValue="1-10"
                  >
                    <MenuItem value="1-10">1-10 employees</MenuItem>
                    <MenuItem value="11-50">11-50 employees</MenuItem>
                    <MenuItem value="51-200">51-200 employees</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <InputLabel
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Email
              </InputLabel>
              <TextField
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
                fullWidth
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <InputLabel
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Year Founded
              </InputLabel>
              <TextField
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
                fullWidth
                type="number"
                placeholder="Enter year"
                value={year}
                onChange={handleYearChange}
                InputProps={{
                  inputProps: {
                    min: 1990,
                    max: new Date().getFullYear(),
                  },
                }}
                error={!!error} // Shows red border if there's an error
                helperText={error} // Displays the error message below the text field
              />
            </Box>
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
                  height: "40px",
                  width: "100%",
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
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
                sx={{
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Phone Number
              </InputLabel>
              <PhoneInput
                defaultCountry="EG"
                value={phone}
                onChange={setPhone}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.phone}
                </Typography>
              )}
            </Box>

            {/* Centered Save Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 4,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "204.16px",
                  height: "46px",
                  borderRadius: "3px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
              >
                Save
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfileForm;
