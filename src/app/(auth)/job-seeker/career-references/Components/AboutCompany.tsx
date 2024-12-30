import React from "react";
import { Typography, Grid, Card, Switch, Box } from "@mui/material";

const AboutCompany: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card className="flex items-center justify-between bg-primary-100 p-[16px] text-start">
        {/* Title and Description */}
        <Box>
          <h6 className="mb-2 text-left text-lg font-bold text-main">
            Are you available for immediate hiring?
          </h6>
          <p className="text-secondary">
            Let companies know you can start immediately by adding the Immediate
            start badge to your profile
          </p>
        </Box>

        {/* Switch */}
        <Switch color="primary" />
      </Card>
    </Grid>
  );
};

export default AboutCompany;
