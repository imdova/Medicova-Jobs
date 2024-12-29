"use client";
import React from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const AboutCompany: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card className="p-4">
        {/* Title */}
        {/* <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "left" }}>
          About Company :
        </Typography> */}
        <h3 className="text-main mb-2 text-2xl font-semibold">
          About Company :
        </h3>

        {/* Description */}
        <PendingActionsIcon className="text-primary mr-2 inline" />
        <p className="text-secondary mt-2 inline font-medium">
          A healthcare company refers to any business or organization that
          provides products or services related to the maintenance, improvement,
          or management of health.
        </p>
      </Card>
    </Grid>
  );
};

export default AboutCompany;
