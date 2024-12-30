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
        }}
      >
        <Tab
          sx={{
            fontWeight: "600",
            fontSize: "14px",
          }}
          label="Login Details"
        />
        <Tab
          sx={{
            fontWeight: "600",
            fontSize: "14px",
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
              <h6 className="mb-1 text-xl font-bold text-main">
                Basic Information
              </h6>
              <p className="text-secondary">
                This is login information that you can update anytime.
              </p>
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
                  <h6 className="mb-1 text-xl font-bold text-main">
                    Update Email
                  </h6>
                  <p className="text-secondary">
                    Update your email address to make sure it is safe
                  </p>
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
                  <h6 className="mb-1 text-xl font-bold text-main">
                    jakegyll@email.com
                  </h6>
                  <p className="mb-2 text-secondary">
                    Your email address is verified.
                  </p>
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
                    variant="contained"
                    sx={{
                      width: "155px",
                      marginTop: 2,
                      height: "46px",
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
                  <h6 className="mb-1 text-xl font-bold text-main">
                    New Password
                  </h6>
                  <p className="text-secondary">
                    Manage your password to make sure it is safe
                  </p>
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
                    variant="contained"
                    sx={{
                      width: "155px",
                      marginTop: 2,
                      height: "46px",
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
                <h6 className="mb-1 text-xl font-bold text-main">
                  Basic Information
                </h6>
                <p className="text-secondary">
                  This is User page that you can update anytime and Add New
                  user.
                </p>
              </Box>
              <Button
                variant="contained"
                sx={{
                  width: "155px",
                  height: "46px",
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
