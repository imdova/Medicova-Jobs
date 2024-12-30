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

  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setSelectedButton(label);
  };

  const focusStyle = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgba(46, 174, 125, 1)",
      },
    },
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <p className="mb-2 font-semibold text-main">
            Specify your job preference setting accurately to help reach the
            right opportunity
          </p>
          <form onSubmit={handleSubmit} noValidate>
            {/* personal info */}
            <Box
              sx={{ width: { xs: "100%", sm: "80%", md: "50%" }, marginY: 3 }}
            >
              <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                Industry *
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: { xs: "wrap", md: "nowrap" },
                  gap: 2,
                }}
              >
                {["Healthcare", "Pharmaceutical", "Education"].map((label) => (
                  <Button
                    key={label}
                    variant="outlined"
                    onClick={() => handleClick(label)}
                    sx={{
                      textTransform: "capitalize",
                      flex: 1,
                      borderColor:
                        selectedButton === label
                          ? "var(--primary)" // Active button border color
                          : "var(--text-secondary)", // Inactive button border color
                      backgroundColor:
                        selectedButton === label
                          ? "var(--primary)" // Active button text color
                          : "rgba(214, 221, 235, 0.18)", // Inactive button text color
                      color:
                        selectedButton === label
                          ? "var(--primary-foreground)" // Active button text color
                          : "inherit", // Default text color
                      "&:hover": {
                        borderColor: "var(--primary)", // Maintain hover border color
                      },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* personal info */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Sector *
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    sx={{
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      height: "40px",
                      fontSize: "14px",
                      ...focusStyle, // Apply focus styles
                    }}
                  >
                    <MenuItem value="Healthcare professionals">
                      Healthcare professionals
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Category *
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    sx={{
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      height: "40px",
                      fontSize: "14px",
                    }}
                  >
                    <MenuItem value="Doctors">Doctors</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Speciality *
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    sx={{
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      height: "40px",
                      fontSize: "14px",
                    }}
                  >
                    <MenuItem value="Cardiology">Cardiology</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  sx={{
                    marginBottom: 1,
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Career Level *
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    sx={{
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      height: "40px",
                      fontSize: "14px",
                    }}
                  >
                    <MenuItem value="Consultant">Consultant</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Type of Employment */}
            <Box sx={{ width: "100%", marginY: 3 }}>
              <Typography sx={{ marginBottom: 3, fontWeight: "bold" }}>
                What is your preferred workplace settings?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: { xs: "wrap", md: "nowrap" },
                  gap: 3,
                }}
              >
                {/* Existing Buttons Box */}
                <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                  <Typography sx={{ marginY: 1, fontWeight: "bold" }}>
                    Type of Employment *
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {["Full Time", "Part Time", "Freelance", "Volunteer"].map(
                      (label) => (
                        <Button
                          key={label}
                          variant="outlined"
                          onClick={() => handleClick(label)}
                          sx={{
                            textTransform: "capitalize",
                            flex: 1,
                            borderColor:
                              selectedButton === label
                                ? "rgba(46, 174, 125, 1)" // Active button border color
                                : "rgba(214, 221, 235, 1)", // Inactive button border color
                            backgroundColor:
                              selectedButton === label
                                ? "#fff" // Active button background color
                                : "rgba(214, 221, 235, 0.18)", // Inactive button background color
                            color:
                              selectedButton === label
                                ? "rgba(46, 174, 125, 1)" // Active button text color
                                : "inherit", // Default text color
                            "&:hover": {
                              borderColor: "rgba(46, 174, 125, 1)", // Maintain hover border color
                            },
                            whiteSpace: "nowrap",
                          }}
                        >
                          {label}
                        </Button>
                      ),
                    )}
                  </Box>
                </Box>

                {/* New Buttons Box */}
                <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                  <Typography sx={{ marginY: 1, fontWeight: "bold" }}>
                    Work Place *
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {["On-Site", "Remote", "Hybrid"].map((label) => (
                      <Button
                        key={label}
                        variant="outlined"
                        onClick={() => handleClick(label)}
                        sx={{
                          textTransform: "capitalize",
                          flex: 1,
                          borderColor:
                            selectedButton === label
                              ? "rgba(46, 174, 125, 1)" // Active button border color
                              : "rgba(214, 221, 235, 1)", // Inactive button border color
                          backgroundColor:
                            selectedButton === label
                              ? "#fff" // Active button background color
                              : "rgba(214, 221, 235, 0.18)", // Inactive button background color
                          color:
                            selectedButton === label
                              ? "rgba(46, 174, 125, 1)" // Active button text color
                              : "inherit", // Default text color
                          "&:hover": {
                            borderColor: "rgba(46, 174, 125, 1)", // Maintain hover border color
                          },
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Location */}
            <Box sx={{ width: "100%", marginY: 3 }}>
              <InputLabel
                sx={{
                  marginBottom: 3,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Where would you like to work?
              </InputLabel>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {/* Country Select */}
                <Box sx={{ flex: 1, minWidth: "150px" }}>
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
                  <FormControl fullWidth>
                    <Select
                      sx={{
                        backgroundColor: "rgba(214, 221, 235, 0.18)",
                        height: "40px",
                        fontSize: "14px",
                      }}
                      defaultValue="egypt"
                    >
                      <MenuItem value="egypt">Egypt</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* City Select */}
                <Box sx={{ flex: 1, minWidth: "150px" }}>
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
                  <FormControl fullWidth>
                    <Select
                      sx={{
                        backgroundColor: "rgba(214, 221, 235, 0.18)",
                        height: "40px",
                        fontSize: "14px",
                      }}
                      defaultValue="cairo"
                    >
                      <MenuItem value="cairo">Cairo</MenuItem>
                      <MenuItem value="alexandria">Alexandria</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
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
                  maxWidth: "50%",
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
            {/* Nationality  */}

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
                Save Changes
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfileForm;
