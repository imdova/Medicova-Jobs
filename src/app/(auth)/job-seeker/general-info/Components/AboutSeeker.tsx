"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddModal from "./Modals/AddModal";

const AboutSeeker: React.FC = () => {
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

  const getAboutFields = (): JSX.Element[] => [
    <Box key="aboutInfo">
      <Typography sx={{ fontSize: "14px", color: "#7C8493", marginBottom: 2 }}>
        Highlight your skills, experience, and commitment. Let potential
        employers know why you are the right fit to make a difference in their
        team!
      </Typography>
    </Box>,

    <Box key="description">
      <TextField
        placeholder="E.g., 'Hi, I’m ....., a dedicated in ....... with ...... years of experience in ....."
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          "& .MuiOutlinedInput-root": {
            height: "70px",
            fontSize: "14px",
          },
        }}
      />
    </Box>,

    <Box key="note">
      <Typography
        sx={{
          fontSize: "14px",
          backgroundColor: "#ECF7F3",
          padding: "8px",
          marginTop: "8px",
          borderRadius: "4px",
        }}
      >
        <strong>Note:</strong> Please avoid sharing any contact information or external links in
        this section.
      </Typography>
    </Box>,
  ];
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          padding: "16px",
          textAlign: "start",
          position: "relative", // Allow positioning of the button
        }}
      >
        {/* Edit Button positioned at the top right */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#00A884",
            border: "1px solid #D6DDEB",
            borderRadius: "4px",
            padding: "6px",
          }}
          onClick={() =>
            handleOpenModal("Introduce Yourself to Employers", getAboutFields)
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
            About Me
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              color: "#185D43",
              maxWidth: "90%",
            }}
          >
            I’m a Medical Ambassador + I am dedicated to transforming healthcare
            access and education in underserved communities. My passion for
            promoting health equity drives me to bridge the gap between medical
            professionals and those in need. Through community outreach,
            education, and advocacy, I strive to empower individuals with the
            knowledge and resources they require for better health outcomes.
            Together, we can build a future where quality healthcare is a right,
            not a privilege.
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default AboutSeeker;
