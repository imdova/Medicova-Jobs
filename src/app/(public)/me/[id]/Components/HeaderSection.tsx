"use client";
import { useEffect, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import BackupIcon from "@mui/icons-material/Backup";
import { Verified } from "@mui/icons-material";

const HeaderSection: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const handleEditProfileClick = () => {
    router.push("/job-seeker/general-info");
  };

  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  // Handle deleting the avatar image
  const handleDeleteImage = () => {
    setAvatarImage(undefined);
  };

  // Handle selecting a new image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
    }
  };

  return (
    <div className="overflow-hidden rounded-base border border-gray-100 bg-white shadow-lg">
      {/* Background Cover Image */}
      <div className="flex h-[200px] w-full items-center rounded-t-base bg-primary-100">
        <Avatar
          alt="Profile"
          src={avatarImage || undefined}
          className="ml-14 mr-8 h-[100px] w-[100px] border-[6px] border-white shadow-xl"
        />
        <div className="mr-5">
          <div className="flex items-center">
            <h5 className="text-xl font-bold text-main">Jake Gyll</h5>
            <Verified color="primary" className="ml-2 h-6 w-6" />
          </div>
          <Typography
            variant="body1"
            sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            Cardiology Consultant at{" "}
            <span className="font-bold text-main">Saudi German Hospital</span>
          </Typography>
          <Grid item xs={12} sm={9}>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
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
                <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16 } }} /> Cairo,
                Egypt
              </Typography>
              <Button
                variant="text"
                sx={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  backgroundColor: "var(--primary-100)",
                  gap: 1,
                  p: 0,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                <FlagIcon
                  color="primary"
                  sx={{ fontSize: { xs: 18, sm: 20 } }}
                />
                Open For Opportunities
              </Button>
            </Box>
          </Grid>
        </div>
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
          <IconButton onClick={handleEditProfileClick}>
            <EditIcon />
          </IconButton>

          {/* Share Button */}
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>
      </div>
    </div>
  );
};

export default HeaderSection;
