"use client";
import React, { useState } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddModal from "./Modals/AddModal";
import { UserState } from "@/types";
import ClampedText from "@/components/UI/ClampedText";
import EmptyCard from "@/components/UI/emptyCard";

const about = "";
const AboutSeeker: React.FC<{
  user: UserState;
  isMe: boolean;
}> = ({ user, isMe }) => {
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

  const openModalHandler = () => {
    handleOpenModal("Introduce Yourself to Employers", getAboutFields);
  };
  if (!isMe && about.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <AddModal
        open={openModal}
        onClose={handleCloseModal}
        modalTitle={modalTitle}
        fields={fields}
      />
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">About</h3>
        {isMe && (
          <IconButton
            className="rounded border border-solid border-gray-300 p-2"
            onClick={openModalHandler}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
      {about ? (
        <ClampedText className="px-2 text-secondary" lines={3}>
          {about}
        </ClampedText>
      ) : isMe ? (
        <EmptyCard
          src={"/images/activities.png"}
          description={" Your volunteering and student activities."}
          buttonText="Add Activities / Achievements"
          onClick={openModalHandler}
        />
      ) : null}
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
