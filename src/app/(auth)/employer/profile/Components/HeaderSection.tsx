"use client";
import React, { useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import ShareMenu from "@/components/UI/ShareMenu";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import BackupIcon from "@mui/icons-material/Backup";
import FlagIcon from "@mui/icons-material/Flag";

const HeaderSection: React.FC = () => {
  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  // Handle deleting the avatar image
  const handleDeleteImage = () => {
    setAvatarImage(undefined);
  };

  // Handle selecting a new image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
    }
  };
  return (
    <Grid item xs={12}>
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
          src={avatarImage || undefined}
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

        {/* Container for the Delete Icon and Upload Button */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            left: "140px",
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          {/* Delete Icon Button */}
          <IconButton
            size="medium"
            sx={{
              color: "#E34817",
            }}
            onClick={handleDeleteImage}
          >
            <DeleteIcon sx={{ fontSize: "25px" }} />
          </IconButton>

          {/* Upload Button */}
          <Button
            variant="contained"
            color="primary"
            component="label"
            startIcon={<BackupIcon />}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </Button>
        </Box>
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
                Modicova Medical Community
                <CheckCircleIcon
                  sx={{
                    color: "#00A884",
                    fontSize: { xs: 20, sm: 24 },
                    marginLeft: "8px", // Adds space between the text and the icon
                  }}
                />
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                Healthcare: Medical Services and Education healthcare
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
                    Hospital
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PlaceIcon className="text-primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Egypt, Cairo
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GroupsIcon className="text-primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    11-50 employees
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
              <IconButton
                sx={{
                  color: "#00795c",
                }}
              >
                <EditIcon />
              </IconButton>

              {/* Share Button */}
              <IconButton
                sx={{
                  color: "#00795c",
                }}
              >
                <ShareIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default HeaderSection;
