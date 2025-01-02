"use client";
import React, { useState } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddModal from "./Modals/AddModal";

const AboutSeeker: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [fields, setFields] = useState<JSX.Element[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenModal = (title: string, getFields: () => JSX.Element[]) => {
    setModalTitle(title);
    setFields(getFields());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openModalHandler = () => {
    handleOpenModal("Introduce Yourself to Employers", getAboutFields);
  };

  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <AddModal
        open={openModal}
        onClose={handleCloseModal}
        modalTitle={modalTitle}
        fields={fields}
      />
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">About Me</h3>
        <IconButton
          className="rounded border border-solid border-gray-300 p-2"
          onClick={openModalHandler}
        >
          <EditIcon />
        </IconButton>
      </div>
      <p
        className={`${isExpanded ? "" : "line-clamp-3"} max-w-[90%] px-2 text-secondary`}
      >
        I’m a Medical Ambassador + I am dedicated to transforming healthcare
        access and education in underserved communities. My passion for
        promoting health equity drives me to bridge the gap between medical
        professionals and those in need. Through community outreach, education,
        and advocacy, I strive to empower individuals with the knowledge and
        resources they require for better health outcomes. Together, we can
        build a future where quality healthcare is a right, not a privilege.
      </p>
      <div className="flex items-center justify-center">
        <Button className="mt-2 p-0" variant="text" onClick={handleToggle}>
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
};

export default AboutSeeker;

const getAboutFields = (): JSX.Element[] => [
  <Box key="aboutInfo">
    <p className="mb-2 text-secondary">
      Highlight your skills, experience, and commitment. Let potential employers
      know why you are the right fit to make a difference in their team!
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
