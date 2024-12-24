import React from "react";
import { Box, Grid } from "@mui/material";
import "react-phone-number-input/style.css";
import HeaderSection from "./Components/HeaderSection";
import AboutSeeker from "./Components/AboutSeeker";
import EducationsSection from "./Components/EducationsSection";
import ExperienceSection from "./Components/ExperienceSection";
import SocialMediaSection from "./Components/SocialMediaSection";
import SkillsSection from "./Components/SkillsSection";
import ActivitiesSection from "./Components/ActivitiesSection";
import AchievementsSection from "./Components/AchievementsSection";
import PublicProfile from "./Components/PublicProfile";
import Resume from "./Components/Resume";
import ContactInfoSection from "./Components/ContactInfoSection";
import LanguageSection from "./Components/LanguageSection";
import CompleteProfile from "./Components/CompleteProfile";

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
          {/* Experience Section */}
          <ExperienceSection />
          {/* Skills Section */}
          <SkillsSection />
          {/* Activities Section */}
          <ActivitiesSection />
        </Grid>
        {/* Right Sections */}
        <Grid item xs={12} md={4}>
          {/* Public Profile Section */}
          <CompleteProfile />
          {/* Public Profile Section */}
          <PublicProfile />
          {/* Resume Section */}
          <Resume />
          {/* Contact Info Section */}
          <ContactInfoSection />
          {/* Socialmedia Section */}
          <SocialMediaSection />
          {/* Language Section */}
          <LanguageSection />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralInfoPage;
