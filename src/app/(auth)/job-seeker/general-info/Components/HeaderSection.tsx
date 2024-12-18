"use client";
import { useEffect } from "react";
import { Box, Avatar, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";

const HeaderSection: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const handleEditProfileClick = () => {
    router.push("/job-seeker/profile");
  };

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          paddingBottom: "20px",
        }}
      >
        {/* Background Cover Image */}
        <Box
          component="div"
          sx={{
            width: "100%",
            height: { xs: "150px", sm: "200px" }, // Adjust height based on screen size
            backgroundImage: "url('https://via.placeholder.com/1500x400')", // Replace with cover photo URL
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {/* Avatar Positioned on Background Image */}
          <Avatar
            alt="Profile"
            sx={{
              position: "absolute",
              bottom: "-50px",
              left: "20px", // Avatar aligned to the left
              width: { xs: 80, sm: 120 }, // Adjust avatar size based on screen size
              height: { xs: 80, sm: 120 },
              border: "6px solid white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          />
        </Box>

        {/* Profile Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: { xs: "12px 8px", sm: "16px 15px 0 20px" }, // Adjust padding for smaller screens
            backgroundColor: "#fff",
            borderRadius: "0 0 8px 8px",
            flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
            gap: { xs: 2, sm: 0 }, // Add gap between elements on smaller screens
          }}
        >
          {/* Text Section centered */}
          <Box sx={{ textAlign: "center", flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#185D43",
                marginBottom: "4px",
                fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Adjust font size for smaller screens
              }}
            >
              Jake Gyll
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }} // Adjust font size
            >
              Medical Ambassador at{" "}
              <span style={{ color: "#000" }}>PL Hospital</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
                marginY: "8px",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16 } }} /> Cairo,
              Egypt
            </Typography>
            <Button
              variant="text"
              sx={{
                fontWeight: "600",
                color: "#00A884",
                textTransform: "uppercase",
                backgroundColor: "#56CDAD1A",
                gap: 1,
                fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjust font size
              }}
            >
              <FlagIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> Open for
              Opportunities
            </Button>
          </Box>

          {/* Edit Profile Button positioned on right */}
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              fontWeight: "600",
              borderColor: "#00A884",
              "&:hover": {
                borderColor: "#00795c",
                backgroundColor: "rgba(0, 168, 132, 0.1)",
              },
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjust font size for smaller screens
            }}
            onClick={handleEditProfileClick}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default HeaderSection;
