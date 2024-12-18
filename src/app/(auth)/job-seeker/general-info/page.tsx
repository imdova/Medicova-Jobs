import React from "react";
import { Box, Grid } from "@mui/material";
import "react-phone-number-input/style.css";
import HeaderSection from "./Components/HeaderSection";
import AboutSeeker from "./Components/AboutSeeker";
import EducationsSection from "./Components/EducationsSection";
import ExperienceSection from "./Components/ExperienceSection";
import RightSection from "./Components/RightSection";
import SkillsSection from "./Components/SkillsSection";
import ActivitiesSection from "./Components/ActivitiesSection";
import AchievementsSection from "./Components/AchievementsSection";


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
          {/* Achievements Section */}
          <AchievementsSection />
        </Grid>
        {/* Right Section */}
        <RightSection />
      </Grid>
    </Box>
  );
};

export default GeneralInfoPage;
