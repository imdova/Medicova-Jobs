import React from "react";
import { Typography, Grid, Card, Box, CircularProgress } from "@mui/material";

const CompleteProfile: React.FC = () => {
  const value = 80;

  // Function to determine color based on value
  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return "var(--primary)";
    if (progress >= 50) return "#ff6600";
    return "#ff0000";
  };

  const progressColor = getProgressColor(value);

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          padding: "16px",
          marginTop: 3,
          backgroundColor: "#F8F8FD99",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Title and Description */}
        <Box>
          <h3 className="mb-2 text-2xl font-bold text-primary">
            Complete Your Profile!
          </h3>
          <p className="max-w-60 text-secondary">
            You are almost there—lets finish setting things up!
          </p>
        </Box>
        {/* Circular Progress with Value */}
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={value}
            size={80}
            sx={{
              color: progressColor,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                color: progressColor,
              }}
            >
              {value}%
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default CompleteProfile;
