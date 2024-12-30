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
    <Grid item xs={12}>
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
          <p className="text-secondary mb-2 text-center font-semibold">
            To find better candidates, make your job description detailed, use
            relevant keywords, and add screening questions to your job post.
          </p>
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
          <h6 className="text-main mb-2 text-2xl font-semibold">
            Social Links
          </h6>
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
              <EditIcon />
            </IconButton>
          </Box>
        </Box>

        <div className="flex gap-4">
          <Link href="#">
            <InstagramIcon sx={{ color: "rgba(241, 9, 234, 1)" }} />
          </Link>
          <Link href="#">
            <TwitterIcon sx={{ color: "rgba(91, 146, 250, 1)" }} />
          </Link>
          <Link href="#">
            <LanguageIcon sx={{ color: "rgba(46, 174, 125, 1)" }} />
          </Link>
        </div>
      </Card>
    </Grid>
  );
};

export default RightSection;
