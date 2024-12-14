"use client";
import React from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const AboutCompany: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card sx={{ padding: "16px", textAlign: "center" }}>
        {/* Title */}
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "left" }}>
          About Company :
        </Typography>

        {/* Description */}
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            color: "gray",
          }}
        >
          <PendingActionsIcon sx={{ color: "rgba(46, 174, 125, 1)" }} />
          <Typography
            sx={{
              fontWeight: "400",
            }}
          >
            A healthcare company refers to any business or organization that
            provides products or services related to the maintenance,
            improvement, or management of health.
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default AboutCompany;
