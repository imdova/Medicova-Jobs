"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  InputLabel,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import AddModal from "./Modals/AddModal";

const SocialMediaSection: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [fields, setFields] = useState<JSX.Element[]>([]);

  const handleOpenModal = (title: string, getFields: () => JSX.Element[]) => {
    setModalTitle(title);
    setFields(getFields());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getSocialMediaFields = (): JSX.Element[] => [
    <Box key="socialMediaInfo">
      <Typography sx={{ fontSize: "14px", color: "#7C8493", marginBottom: 2 }}>
        Add elsewhere links to your profile. You can add full https links.
      </Typography>
    </Box>,

    <Box key="instagram">
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        Instagram
      </InputLabel>
      <TextField
        placeholder="Enter Instagram Link"
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            fontSize: "14px",
          },
        }}
      />
    </Box>,

    <Box key="facebook">
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        Facebook
      </InputLabel>
      <TextField
        placeholder="Enter Facebook Link"
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            fontSize: "14px",
          },
        }}
      />
    </Box>,

    <Box key="twitter">
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        Twitter
      </InputLabel>
      <TextField
        placeholder="Enter Twitter Link"
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            fontSize: "14px",
          },
        }}
      />
    </Box>,

    <Box key="linkedin">
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        LinkedIn
      </InputLabel>
      <TextField
        placeholder="Enter LinkedIn Link"
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            fontSize: "14px",
          },
        }}
      />
    </Box>,

    <Box key="youtube">
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        YouTube
      </InputLabel>
      <TextField
        placeholder="Enter YouTube Link"
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            fontSize: "14px",
          },
        }}
      />
    </Box>,
  ];

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
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="small"
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 0,
                color: "rgba(46, 174, 125, 1)",
              }}
              onClick={() =>
                handleOpenModal("Add Social Media", getSocialMediaFields)
              }
            >
              <EditIcon />
            </IconButton>
            <AddModal
              open={openModal}
              onClose={handleCloseModal}
              modalTitle={modalTitle}
              fields={fields}
            />
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
          {/* Social Media Icons */}
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
