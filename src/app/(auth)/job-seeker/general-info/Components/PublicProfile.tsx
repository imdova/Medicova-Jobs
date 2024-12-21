import React from "react";
import { Typography, Grid, Card, Box, Switch, IconButton } from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const PublicProfile: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card sx={{ padding: "16px", marginTop: 3, backgroundColor: "#F8F8FD99" }}>
        {/* Title and Description */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              marginBottom: 2,
              textAlign: "left",
              fontWeight: "700",
              color: "#03353C",
            }}
          >
            Your Public Profile
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: "#000",
                fontSize: "16px",
              }}
            >
              Public Profile
            </Typography>
            <Switch color="primary" defaultChecked />
          </Box>
          <Box
            sx={{
              backgroundColor: "#D6DDEB6E",
              borderRadius: "8px",
              padding: "8px",
              marginTop: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: "400",
                  color: "#03353C",
                  fontSize: "12px",
                }}
              >
                Here is your public profile link:
              </Typography>
              <Link href="#" passHref>
                <Typography
                  sx={{
                    fontWeight: "500",
                    color: "#2348DF",
                    fontSize: "9px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  modicava.net/me/jakegyl-77943becb8
                </Typography>
              </Link>
            </Box>
            <IconButton
              size="small"
              color="primary"
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 0,
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginY: "16px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: "#000",
                fontSize: "16px",
              }}
            >
              Profile Visibility
            </Typography>
            <Switch color="primary" defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: "#000",
                fontSize: "16px",
              }}
            >
              Available for immediate start
            </Typography>
            <Switch color="primary" />
          </Box>
          {/* Centered Typography with Background */}
          <Box
            sx={{
              backgroundColor: "#D6DDEB6E",
              borderRadius: "8px",
              padding: "8px",
              marginTop: "16px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                color: "#03353C",
                fontSize: "9px",
              }}
            >
              Let companies know you can start immediately by adding the Immediate start badge to your profile
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default PublicProfile;
