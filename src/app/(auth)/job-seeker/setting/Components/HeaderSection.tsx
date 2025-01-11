"use client";
import React, { useState } from "react";
import { Box, Avatar, IconButton, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BackupIcon from "@mui/icons-material/Backup";

const HeaderSection: React.FC = () => {
  // State to hold the avatar image (either URL or undefined)
  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  // Handle deleting the avatar image
  const handleDeleteImage = () => {
    setAvatarImage(undefined); // Remove the image by setting the state to undefined
  };

  // Handle selecting a new image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the uploaded image
      setAvatarImage(imageUrl); // Update the avatar image state
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" },
        gap: 2,
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Avatar */}
        <Avatar
          src={avatarImage || undefined}
          sx={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            boxShadow: "7px 4px 7px 4px rgba(0, 0, 0, 0.2)",
            border: "4px solid white",
          }}
        />
        {/* Typography and IconButton */}
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            John Doe
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            You can upload a .jpg, .png, or .gif photo with max size of 5MB.
          </Typography>

          {/* IconButton for deleting image below typography */}
          <IconButton
            size="medium"
            sx={{
              marginTop: 1,
              color: "#E34817",
            }}
            onClick={handleDeleteImage}
          >
            <DeleteIcon sx={{ fontSize: "25px" }} />
          </IconButton>

          {/* File input to upload a new avatar */}
          <Button
            variant="contained"
            color="primary"
            component="label"
            startIcon={<BackupIcon />}
            className="m-3"
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
    </Box>
  );
};

export default HeaderSection;
