"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputLabel,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const SettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Page Header */}
      {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Settings
        </Typography>
        <Button variant="outlined">Back to homepage</Button>
      </Box> */}
      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          mb: 4,
          borderBottom: "1px solid #ddd",
          "& .MuiTabs-indicator": {
            backgroundColor: "rgba(24, 93, 67, 1)",
            height: "4px",
            borderRadius: "5px",
          },
        }}
      >
        <Tab
          sx={{
            color: "rgba(124, 132, 147, 1)", // Inactive tab text color
            fontWeight: "600",
            fontSize: "14px",
            "&.Mui-selected": {
              color: "rgba(37, 50, 75, 1)", // Active tab text color
            },
          }}
          label="Login Details"
        />
        <Tab
          sx={{
            color: "rgba(124, 132, 147, 1)", // Inactive tab text color
            fontWeight: "600",
            fontSize: "14px",
            "&.Mui-selected": {
              color: "rgba(37, 50, 75, 1)", // Active tab text color
            },
          }}
          label="Notifications"
        />
      </Tabs>
      {/* Tab Panels */}
      {tabValue === 0 && (
        <Box>
          {/* Update Email Section */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                Basic Information
              </Typography>
              <Typography sx={{ color: "rgba(81, 91, 111, 1)" }}>
                This is login information that you can update anytime.
              </Typography>
            </CardContent>
            <Divider sx={{ my: 2, width: "90%", mx: "auto" }} />{" "}
            {/* Centered Divider */}
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "start",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                {/* Left Section */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      color: "rgba(37, 50, 75, 1)",
                    }}
                  >
                    Update Email
                  </Typography>
                  <Typography sx={{ mb: 2, color: "rgba(81, 91, 111, 1)" }}>
                    Update your email address to make sure it is safe
                  </Typography>
                </Box>

                {/* Right Section */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "250px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      color: "rgba(37, 50, 75, 1)",
                    }}
                  >
                    jakegyll@email.com
                  </Typography>
                  <Typography sx={{ mb: 2, color: "rgba(124, 132, 147, 1)" }}>
                    Your email address is verified.
                  </Typography>
                  <InputLabel
                    sx={{
                      marginBottom: 1,
                      fontWeight: 600,
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    Update Email
                  </InputLabel>
                  <TextField
                    sx={{
                      maxWidth: "340px",
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        fontSize: "14px",
                      },
                    }}
                    fullWidth
                    name="email"
                    placeholder="Enter your new email"
                  />
                  <Button
                    sx={{
                      width: "155px",
                      marginTop: 2,
                      height: "46px",
                      background: "linear-gradient(180deg, #2EAE7D, #134834)",
                      color: "#fff",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    Update Email
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* New Password Section */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "start",
                  alignItems: "flex-start",
                  gap: 9,
                }}
              >
                {/* Left Section */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      color: "rgba(37, 50, 75, 1)",
                    }}
                  >
                    New Password
                  </Typography>
                  <Typography sx={{ mb: 2, color: "rgba(81, 91, 111, 1)" }}>
                    Manage your password to make sure it is safe
                  </Typography>
                </Box>

                {/* Right Section */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "250px",
                  }}
                >
                  <InputLabel
                    sx={{
                      marginBottom: 1,
                      fontWeight: 600,
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    Old Password
                  </InputLabel>
                  <TextField
                    sx={{
                      maxWidth: "340px",
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        fontSize: "14px",
                      },
                    }}
                    fullWidth
                    name="password"
                    type="password"
                    placeholder="Enter your old password"
                  />
                  <InputLabel
                    sx={{
                      marginTop: 2,
                      fontWeight: 600,
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    New Password
                  </InputLabel>
                  <TextField
                    sx={{
                      maxWidth: "340px",
                      backgroundColor: "rgba(214, 221, 235, 0.18)",
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        fontSize: "14px",
                      },
                    }}
                    fullWidth
                    name="password"
                    type="password"
                    placeholder="Enter your new password"
                  />
                  <Button
                    sx={{
                      width: "155px",
                      marginTop: 2,
                      height: "46px",
                      background: "linear-gradient(180deg, #2EAE7D, #134834)",
                      color: "#fff",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
      {tabValue === 1 && (
        <Box sx={{ p: 2 }}>
          {/* Header */}
          <Box>
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3, // Add margin below the header for spacing
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Basic Information
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(81, 91, 111, 1)" }}>
                  This is User page that you can update anytime and Add New
                  user.
                </Typography>
              </Box>
              <Button
                sx={{
                  width: "155px",
                  height: "46px",
                  background: "linear-gradient(180deg, #2EAE7D, #134834)",
                  color: "#fff",
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
              >
                Add New User
              </Button>
            </Box>
          </Box>

        </Box>
      )}
      {/* Close Account */}
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        <Button
          sx={{
            color: "rgba(255, 101, 80, 1)",
            textTransform: "capitalize",
            fontWeight: "600",
          }}
          endIcon={<InfoIcon />}
        >
          Close Account
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;
