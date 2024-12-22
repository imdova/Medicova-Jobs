import React from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  CircularProgress,
} from "@mui/material";

const CompleteProfile: React.FC = () => {
  const value = 80;

  // Function to determine color based on value
  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return "#2EAE7D";
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
          <Typography
            variant="h3"
            sx={{
              marginBottom: 1,
              textAlign: "left",
              fontWeight: "700",
              color: "#2EAE7D",
            }}
          >
            Complete Your Profile!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "#515B6F",
              maxWidth: "250px",
            }}
          >
            You are almost there—lets finish setting things up!
          </Typography>
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
