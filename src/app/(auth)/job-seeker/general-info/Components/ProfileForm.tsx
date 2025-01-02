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
import "react-phone-number-input/style.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

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

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography
            sx={{
              marginBottom: 2,
              color: "rgba(24, 93, 67, 1)",
              fontWeight: "500",
              fontSize: { xs: "20px", md: "20px" },
            }}
          >
            Your Personal Info
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            {/* personal info */}
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", md: "nowrap" },
                gap: 4,
                marginY: 2,
              }}
            >
              {/* First Name */}
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  First Name *
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
                  placeholder="Enter your First Name"
                />
              </Box>

              {/* Last Name */}
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Last Name *
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
                  placeholder="Enter your Last Name"
                />
              </Box>
            </Box>

            {/* contact info */}
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", md: "nowrap" },
                gap: 4,
                marginY: 2,
              }}
            >
              {/* Phone Number */}
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Phone Number *
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
                  placeholder="Enter your Phone Number"
                  type="tel"
                />
              </Box>

              {/* Whatsapp nymber */}
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  WhatsApp Number *
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
                  placeholder="Enter your WhatsApp Number"
                  type="tel"
                />
              </Box>
            </Box>

            {/* personal info */}
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", md: "nowrap" },
                marginY: 2,
              }}
            >
              <Box sx={{ width: "50%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Birthdate *
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slots={{
                      textField: TextField,
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          height: "40px",
                          "& .MuiInputBase-root": {
                            height: "40px",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            {/* Radio Group Section */}
            <Box sx={{ marginY: 2 }}>
              {/* Title for the Radio Group */}
              <Typography
                variant="h6"
                sx={{
                  marginTop: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Gender *
              </Typography>

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
                  <RadioGroup row defaultValue="male">
                    <FormControlLabel
                      value="male"
                      sx={{ fontSize: "14px" }}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#2EAE7D" },
                            fontSize: "14px",
                          }}
                        />
                      }
                      label={<span style={{ fontWeight: "600" }}>Male</span>}
                    />
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={<span style={{ fontWeight: "600" }}>Female</span>}
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </Box>
            {/* Nationality  */}
            <Box sx={{ marginY: 2 }}>
              <Box sx={{ width: "50%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Nationality *
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    sx={{
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      height: "40px",
                      fontSize: "14px",
                    }}
                    defaultValue="egyptian"
                  >
                    <MenuItem value="egyptian">Egyptian</MenuItem>
                    <MenuItem value="egyptian">Egyptian</MenuItem>
                    <MenuItem value="egyptian">Egyptian</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {/* Marital Status */}
            <Box sx={{ marginY: 2 }}>
              {/* Title for the Radio Group */}
              <Typography
                variant="h6"
                sx={{
                  marginTop: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Marital Status
              </Typography>

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
                  <RadioGroup row defaultValue="single">
                    <FormControlLabel
                      value="single"
                      sx={{ fontSize: "14px" }}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#2EAE7D" },
                            fontSize: "14px",
                          }}
                        />
                      }
                      label={<span style={{ fontWeight: "600" }}>Single</span>}
                    />
                    <FormControlLabel
                      value="married"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={<span style={{ fontWeight: "600" }}>Married</span>}
                    />
                    <FormControlLabel
                      value="widow"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={<span style={{ fontWeight: "600" }}>Widow</span>}
                    />
                    <FormControlLabel
                      value="divorced"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={
                        <span style={{ fontWeight: "600" }}>Divorced</span>
                      }
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </Box>
            {/* Driver License */}
            <Box sx={{ marginY: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  marginTop: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Do you have a driving license?
              </Typography>

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
                  <RadioGroup row defaultValue="yes">
                    <FormControlLabel
                      value="yes"
                      sx={{ fontSize: "14px" }}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#2EAE7D" },
                            fontSize: "14px",
                          }}
                        />
                      }
                      label={<span style={{ fontWeight: "600" }}>Yes</span>}
                    />
                    <FormControlLabel
                      value="no"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={<span style={{ fontWeight: "600" }}>No</span>}
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </Box>
            {/* Location */}
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", md: "nowrap" },
                gap: 4,
                marginY: 2,
              }}
            >
              {/* First Name */}
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Country *
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

              {/* Last Name */}
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  City *
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
            </Box>
            {/* Driver License */}
            <Box sx={{ marginY: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  marginTop: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Would you be willing to relocate to another city or country if
                you find the right opportunity?
              </Typography>

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
                  <RadioGroup row defaultValue="yes">
                    <FormControlLabel
                      value="yes"
                      sx={{ fontSize: "14px" }}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#2EAE7D" },
                            fontSize: "14px",
                          }}
                        />
                      }
                      label={<span style={{ fontWeight: "600" }}>Yes</span>}
                    />
                    <FormControlLabel
                      value="no"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#2EAE7D" } }} />
                      }
                      label={<span style={{ fontWeight: "600" }}>No</span>}
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
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
