import React from "react";
import { Box, Grid } from "@mui/material";
import "react-phone-number-input/style.css";
import AboutCompany from "./Components/AboutCompany";
import ProfileForm from "./Components/ProfileForm";

const CareerReferencePage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Left + Center Sections */}
        <Grid container item xs={12} md={10} spacing={3}>
          <AboutCompany />
          {/* Center Section + Profile Form */}
          <ProfileForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CareerReferencePage;
