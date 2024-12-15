import React from "react";
import { Box, IconButton, Typography, Grid, Card, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import Image from "next/image";
import post from "@/components/images/post.svg";
import AddIcon from "@mui/icons-material/Add";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";

const RightSection: React.FC = () => {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ padding: "16px", marginBottom: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Centered Image */}
          <Image
            src={post}
            alt="Login Cover"
            width={50}
            height={50}
            priority={true}
          />

          {/* Typography below the Image */}
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, textAlign: "center", fontWeight: "600" }}
          >
            To find better candidates, make your job description detailed, use
            relevant keywords, and add screening questions to your job post.
          </Typography>
        </Box>

        {/* Centered Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "204.16px",
              height: "46px",
              textTransform: "capitalize",
              borderRadius: "3px",
              fontWeight: "600",
            }}
          >
            Post a job for free
          </Button>
        </Box>
      </Card>

      <Card sx={{ padding: "16px" }}>
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
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              size="small"
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 0,
                color: "rgba(46, 174, 125, 1)",
              }}
            >
              <AddIcon />
            </IconButton>
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
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          {/* Instagram Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <InstagramIcon sx={{ color: "rgba(241, 9, 234, 1)" }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: "400", color: "rgba(124, 132, 147, 1)" }}
            >
              Instagram
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.instagram.com
            </Link>
          </Typography>

          {/* Twitter Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TwitterIcon sx={{ color: "rgba(91, 146, 250, 1)" }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: "400", color: "rgba(124, 132, 147, 1)" }}
            >
              Twitter
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.twitter.com
            </Link>
          </Typography>

          {/* website Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LanguageIcon sx={{ color: "rgba(46, 174, 125, 1)" }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: "400", color: "rgba(124, 132, 147, 1)" }}
            >
              Web site
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.imetsacademy.com
            </Link>
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default RightSection;
