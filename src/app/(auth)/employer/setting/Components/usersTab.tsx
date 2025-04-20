"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "next-auth";

const UsersTab: React.FC<{ user: User }> = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <div className="mb-2 rounded-base border border-gray-100 bg-white p-4 shadow-soft">
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
            <p className="mb-2 text-secondary">
              This is User page that you can update anytime and Add New user.
            </p>
          </Box>
          <Button
            onClick={handleOpenModal}
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
        {/* <NewUserModal open={openModal} onClose={handleCloseModal} /> */}
        {/* Divider */}
        <Divider sx={{ my: 4 }} /> {/* Users Section */}
        <Box sx={{ mt: 2 }}>
          <h6 className="mb-1 text-lg font-bold text-main">All Users</h6>
          <p className="mb-2 text-secondary">Can Delete or Edit any user</p>
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
                    variant="outlined"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    Full Control
                  </Button>
                  <Box>
                    <IconButton
                      color="primary"
                      sx={{
                        minWidth: 0,
                        padding: "2px",
                        borderRadius: "1px",
                        border: "1px solid rgba(214, 221, 235, 1)",
                        mr: 1,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      sx={{
                        minWidth: 0,
                        padding: "2px",
                        borderRadius: "1px",
                        border: "1px solid rgba(214, 221, 235, 1)",
                        mr: 1,
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                {/* Action Icons */}
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default UsersTab;
