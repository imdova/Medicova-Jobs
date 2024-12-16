import React from "react";
import { Box, Grid } from "@mui/material";
import "react-phone-number-input/style.css";
import HeaderSection from "./Components/HeaderSection";
import AboutSeeker from "./Components/AboutSeeker";
import EducationsSection from "./Components/EducationsSection";
import ProfileForm from "./Components/ProfileForm";
import RightSection from "./Components/RightSection";

const GeneralInfoPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Left + Center Sections */}
        <Grid container item xs={12} md={8} spacing={3}>
          {/* Header Section */}
          <HeaderSection />
          {/* About Section */}
          <AboutSeeker />
          {/* Education Section */}
          <EducationsSection />
          {/* Center Section + Profile Form */}
          {/* <ProfileForm /> */}
        </Grid>
        {/* Right Section */}
        <RightSection />
      </Grid>
    </Box>
  );
};

export default GeneralInfoPage;
