"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Button,
  Box,
  TextField,
  InputLabel,
} from "@mui/material";
import Image from "next/image";
import activities from "@/components/images/activities.png";
import AddModal from "./Modals/AddModal";

const ActivitiesSection: React.FC = () => {
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

  const getActivitiesAchievementsFields = (): JSX.Element[] => [

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
      <Card
        sx={{
          padding: { xs: 2, sm: 4 },
          position: "relative",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Title aligned to the start */}
        <Typography
          variant="h3"
          sx={{
            marginBottom: 1,
            fontWeight: "700",
            color: "#03353C",
          }}
        >
          Activities / Achievements
        </Typography>

        {/* Centered Content */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          {/* Image */}
          <Image
            src={activities}
            alt="Activities"
            width={180}
            height={180}
            style={{
              marginBottom: 16,
              maxWidth: "100%",
              height: "auto",
            }}
            priority
          />

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: "400",
              color: "#185D43",
              marginBottom: 2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Your volunteering and student activities.
          </Typography>

          {/* Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00A884",
              fontWeight: "600",
              color: "#fff",
              paddingX: 4,
              paddingY: 1.2,
              fontSize: { xs: "0.8rem", sm: "1rem" },
              "&:hover": {
                backgroundColor: "#00795c",
              },
            }}
            onClick={() =>
              handleOpenModal(
                "Activities & Achievements ",
                getActivitiesAchievementsFields,
              )
            }
          >
            Add Activities / Achievements
          </Button>
          <AddModal
            open={openModal}
            onClose={handleCloseModal}
            modalTitle={modalTitle}
            fields={fields}
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default ActivitiesSection;
