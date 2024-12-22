import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";

const SocialMediaSection: React.FC = () => {
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
            Social Links
          </Typography>
          <Box sx={{ display: "flex"}}>  
            <IconButton
              size="small"
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 0,
                color: "rgba(46, 174, 125, 1)",
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            marginTop: 2,
          }}
        >
          {/* Instagram Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              color: "#2EAE7D",
            }}
          >
            <InstagramIcon />
            <TwitterIcon />
            <LanguageIcon />
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default SocialMediaSection;
