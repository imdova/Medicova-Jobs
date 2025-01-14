"use client";
import React from "react";
import { Box, Avatar, IconButton, Typography, Grid } from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { Verified } from "@mui/icons-material";
import { HeaderData } from "@/types/employer";

interface EmployerHeaderSectionProps {
  isMe: boolean;
  data: HeaderData;
}

const EmployerHeaderSection: React.FC<EmployerHeaderSectionProps> = ({
  data,
  isMe,
}) => {
  return (
    <div className="overflow-hidden rounded-base border border-gray-100 bg-white shadow-lg">
      {/* Background Cover Image */}
      <Box
        component="div"
        sx={{
          width: "100%",
          height: { xs: "150px", sm: "200px" },
          backgroundImage: "url('https://via.placeholder.com/1500x400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Avatar Positioned on Background Image */}
        <Avatar
          alt="Profile"
          src={""}
          sx={{
            position: "absolute",
            bottom: "-50px",
            left: "20px",
            width: { xs: 80, sm: 120 },
            height: { xs: 80, sm: 120 },
            border: "6px solid white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        />
      </Box>
      {/* Profile Section */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "0 0 8px 8px",
          marginTop: "45px",
        }}
      >
        <Grid container alignItems="start">
          {/* Text Section */}
          <Grid item xs={12} sm={9}>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#000",
                  marginBottom: "4px",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                {data.title}
                <Verified className="ml-3 text-primary" />
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                {data.subtitle}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  alignItems: "center",
                  justifyContent: "start",
                  my: { xs: 1, sm: 2 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalHospitalIcon className="text-primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data.type}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PlaceIcon className="text-primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data.address}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GroupsIcon className="text-primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data.employees} employees
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Edit Profile Button */}
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "center", sm: "flex-end" },
                height: "100%",
                gap: 1,
              }}
            >
              {/* Edit Button */}
              {isMe && (
                <IconButton>
                  <EditIcon />
                </IconButton>
              )}
              {/* Share Button */}
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EmployerHeaderSection;
