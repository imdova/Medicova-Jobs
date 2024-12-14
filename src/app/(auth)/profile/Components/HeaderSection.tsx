import React from "react";
import { Box, Avatar, IconButton, Typography } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import ShareMenu from "@/components/UI/ShareMenu";

const HeaderSection: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" },
        gap: 2,
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar
          src="/images/logo.png"
          sx={{
            width: 100,
            height: 100,
            borderRadius: "1px",
          }}
        />
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            bottom: -12,
            right: 5,
            backgroundColor: "#fff",
            width: 25,
            height: 25,
            padding: "0",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <ChangeCircleIcon
            sx={{ color: "rgba(46, 174, 125, 1)" }}
            fontSize="large"
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Modicova Medical Community
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
            Healthcare: Medical Services and Education healthcare
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocalHospitalIcon sx={{ color: "rgba(46, 174, 125, 1)" }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Hospital
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PlaceIcon sx={{ color: "rgba(46, 174, 125, 1)" }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Egypt, Cairo
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <GroupsIcon sx={{ color: "rgba(46, 174, 125, 1)" }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                11-50 employees
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
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
        <ShareMenu
          link="https://medicova.com"
          size="small"
          color="primary"
          sx={{
            border: 1,
            borderColor: "grey.300",
            borderRadius: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default HeaderSection;
