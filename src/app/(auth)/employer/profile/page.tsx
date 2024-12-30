import React from "react";
import { Box, Grid } from "@mui/material";
import "react-phone-number-input/style.css";
import HeaderSection from "./Components/HeaderSection";
import RightSection from "./Components/RightSection";
import AboutCompany from "./Components/AboutCompany";
import ProfileForm from "./Components/ProfileForm";

const ProfilePage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid container item xs={12} md={8} spacing={3}>
          {/* Header Section */}
          <HeaderSection />
          {/* Left Section */}
          <AboutCompany />
          {/* Center Section + Profile Form */}
          <ProfileForm />
        </Grid>
        {/* Right Section */}
        <RightSection />
      </Grid>
    </Box>
  );
};

export default ProfilePage;
