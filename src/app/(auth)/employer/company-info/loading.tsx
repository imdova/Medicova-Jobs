import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ ml: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
