"use client";
import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useRouter } from "next/navigation";

const ContactInfoSection: React.FC = () => {
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
      <Card sx={{ padding: "16px", marginY: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "rgba(0, 0, 0, 0.8)" }}
          >
            Contact Info
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              size="small"
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 0,
                color: "rgba(46, 174, 125, 1)",
              }}
              onClick={handleEditProfileClick}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          {/* Email Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#7C8493",
            }}
          >
            <EmailIcon sx={{ color: "#2EAE7D" }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: "500", color: "#000" }}
            >
              Email :
            </Typography>
            <Typography variant="body2" color="textSecondary">
              jakegyll@email.com
            </Typography>
          </Box>

          <Divider sx={{ marginY: 0.1 }} />
          {/* Phone Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#7C8493",
            }}
          >
            <PhoneIphoneIcon sx={{ color: "#2EAE7D" }} />
            <Typography sx={{ fontWeight: "500", color: "#000" }}>
              Phone :
            </Typography>
            <Typography variant="body2" color="textSecondary">
              +44 1245 572 135
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
export default ContactInfoSection;
