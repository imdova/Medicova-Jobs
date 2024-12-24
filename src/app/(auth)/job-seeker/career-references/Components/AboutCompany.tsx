import React from "react";
import { Typography, Grid, Card, Switch, Box } from "@mui/material";

const AboutCompany: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          padding: "16px",
          textAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ECF7F3",
        }}
      >
        {/* Title and Description */}
        <Box>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "left", fontWeight: "700" }}
          >
            Are you available for immediate hiring?
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              color: "gray",
            }}
          >
            Let companies know you can start immediately by adding the Immediate
            start badge to your profile
          </Typography>
        </Box>

        {/* Switch */}
        <Switch color="primary" />
      </Card>
    </Grid>
  );
};

export default AboutCompany;
