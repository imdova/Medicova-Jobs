import React from "react";
import { Box, Grid } from "@mui/material";
import "react-phone-number-input/style.css";
import HeaderSection from "./Components/HeaderSection";
import AboutCompany from "./Components/AboutCompany";
import ProfileForm from "./Components/ProfileForm";
import JobCard from "./Components/JobCard";
import CompleteProfile from "../../job-seeker/general-info/Components/CompleteProfile";
import PublicProfile from "../../job-seeker/general-info/Components/PublicProfile";
import ContactInfoSection from "../../job-seeker/general-info/Components/ContactInfoSection";
import SocialMediaSection from "../../job-seeker/general-info/Components/SocialMediaSection";

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
          <JobCard />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Right Section */}
          {/* <RightSection /> */}
          {/* Complete Profile Section */}
          <CompleteProfile />
          {/* Public Profile Section */}
          <PublicProfile />
          {/* Contact Info Section */}
          <ContactInfoSection />
          {/* Socialmedia Section */}
          <SocialMediaSection />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
