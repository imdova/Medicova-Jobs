"use client";
import { useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "0 0 8px 8px",
            marginTop: "45px",
          }}
        >
          <Grid container alignItems="start">
            {/* Text Section */}
            <Grid item xs={12} sm={9}>
              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "4px",
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  }}
                >
                  Jake Gyll
                  <CheckCircleIcon
                    sx={{
                      color: "#00A884",
                      fontSize: { xs: 20, sm: 24 },
                      marginLeft: "8px", // Adds space between the text and the icon
                    }}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  Cardiology Consultant at{" "}
                  <span style={{ color: "#000" }}>Saudi German Hospital</span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  35 years old - Egyptian - Married - Cardiology - 10 years
                  Experience
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#999",
                    display: "flex",
                    justifyContent: { xs: "center", sm: "flex-start" },
                    alignItems: "center",
                    gap: 0.5,
                    marginY: "8px",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />{" "}
                  Cairo, Egypt
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    fontWeight: "600",
                    color: "#00A884",
                    textTransform: "uppercase",
                    backgroundColor: "#56CDAD1A",
                    gap: 1,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  <FlagIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                  Open For Opportunities
                </Button>
              </Box>
            </Grid>

            {/* Edit Profile Button */}
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: { xs: "center", sm: "flex-end" },
                  height: "100%",
                  gap: 1,
                }}
              >
                {/* Edit Button */}
                <IconButton
                  sx={{
                    color: "#00795c",
                  }}
                  onClick={handleEditProfileClick}
                >
                  <EditIcon />
                </IconButton>

                {/* Share Button */}
                <IconButton
                  sx={{
                    color: "#00795c",
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default HeaderSection;
