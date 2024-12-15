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
import NewUserModal from "./Components/Modals/NewUserModal";
const SettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
          label="Users"
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
                onClick={handleOpenModal}
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
            <NewUserModal open={openModal} onClose={handleCloseModal} />
            {/* Divider */}
            <Divider sx={{ my: 4 }} /> {/* Users Section */}
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: "600",
                  color: "rgba(32, 36, 48, 1)",
                  fontSize: "18px",
                }}
              >
                All Users
              </Typography>
              <Typography sx={{ mb: 2, color: "rgba(81, 91, 111, 1)" }}>
                Can Delete or Edit any user
              </Typography>
            </Box>
          </Box>

          {/* User Cards */}
          <Grid container spacing={2}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      justifyContent: { xs: "center", sm: "space-between" }, // Space between elements
                      p: 2,
                    }}
                  >
                    {/* User Avatar */}
                    <Box
                      component="img"
                      src="/images/logo.png" // Replace with actual avatar image URL
                      alt="User Avatar"
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "contain",
                        borderRadius: "50%",
                        mr: 2,
                      }}
                    />
                    {/* User Details */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "center", sm: "flex-start" },
                      }}
                    >
                      <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                        Ahmed Mohamed
                      </Typography>
                      <Typography
                        sx={{ fontSize: "16px", color: "rgba(3, 28, 255, 1)" }}
                      >
                        ahmedmohamed@gmail.com
                      </Typography>
                      <Typography
                        sx={{ fontSize: "14px", color: "rgba(81, 91, 111, 1)" }}
                      >
                        Admin
                      </Typography>
                    </Box>
                    {/* User Role */}
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        gap: 2,
                        justifyContent: { xs: "center", sm: "space-evenly " },
                        alignItems: "center",
                        flex: 3, // Ensures even spacing
                      }}
                    >
                      <Button
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          color: "#2EAE7D",
                          borderColor: "#2EAE7D",
                          border: "1px solid", // Add border for button
                        }}
                      >
                        Full Control
                      </Button>
                      <Box>
                        <Button
                          sx={{
                            minWidth: 0,
                            padding: "2px",
                            border: "1px solid rgba(214, 221, 235, 1)",
                            color: "rgba(46, 174, 125, 1)",
                            mr: 1,
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          sx={{
                            minWidth: 0,
                            padding: "2px",
                            border: "1px solid rgba(214, 221, 235, 1)",
                            color: "rgba(227, 72, 23, 1)",
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </Box>
                    {/* Action Icons */}
                  </Card>
                </Grid>
              ))}
          </Grid>
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
