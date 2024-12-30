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
      <p className="mb-2 text-secondary">
        Highlight your skills, experience, and commitment. Let potential
        employers know why you are the right fit to make a difference in their
        team!
      </p>
    </Box>,

    <Box key="description">
      <TextField
        placeholder="E.g., 'Hi, I’m ....., a dedicated in ....... with ...... years of experience in ....."
        fullWidth
        multiline
        minRows={3}
        maxRows={4}
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          "& .MuiOutlinedInput-root": {
            fontSize: "14px",
            maxHeight: "120px",
            overflow: "auto",
          },
        }}
      />
    </Box>,

    <Box key="note">
      <p className="mt-2 rounded bg-primary-100 p-2 text-main">
        <strong>Note:</strong> Please avoid sharing any contact information or
        external links in this section.
      </p>
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
          <h3 className="mb-2 text-2xl font-bold text-main">About Me</h3>
          <p className="max-w-[90%] text-secondary">
            I’m a Medical Ambassador + I am dedicated to transforming healthcare
            access and education in underserved communities. My passion for
            promoting health equity drives me to bridge the gap between medical
            professionals and those in need. Through community outreach,
            education, and advocacy, I strive to empower individuals with the
            knowledge and resources they require for better health outcomes.
            Together, we can build a future where quality healthcare is a right,
            not a privilege.
          </p>
        </Box>
      </Card>
    </Grid>
  );
};

export default AboutSeeker;
