"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Divider,
} from "@mui/material";
// import AddModal from "./Modals/AddModal";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Edit, LanguageOutlined } from "@mui/icons-material";

// Data array for languages and proficiency levels
const languageData = [
  { language: "Arabic", proficiency: "Native" },
  { language: "English", proficiency: "Fluent" },
];

const LanguageSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [languageFields, setLanguageFields] = useState<JSX.Element[]>([
    <LanguageModal key={0} onClick={() => handleDeleteField(0)} />,
  ]);

  const handleOpenModal = (title: string) => {
    setModalTitle(title);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddNewField = () => {
    setLanguageFields((prevFields) => [
      ...prevFields,
      <Language
        key={prevFields.length}
        onClick={() => handleDeleteField(prevFields.length)}
      />,
    ]);
  };

  const handleDeleteField = (index: number) => {
    setLanguageFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold text-main">Languages</h3>
        {isMe && (
          <IconButton
            className="rounded border border-solid border-gray-300 p-2"
            onClick={() => handleOpenModal("Select Your Languages")}
          >
            <Edit />
          </IconButton>
        )}
      </div>

      <div>
        {languageData.map((language, index) => (
          <div key={index}>
            <p className="my-2 text-secondary">
              <LanguageOutlined className="mr-2 inline-block" color="primary" />
              <span className="font-semibold text-main">
                {language.language} :
              </span>{" "}
              {language.proficiency}
            </p>
            {index % 2 === 0 ? <Divider sx={{ marginY: 1 }} /> : null}
          </div>
        ))}
      </div>
      {/* <AddModal
        open={openModal}
        onClose={handleCloseModal}
        modalTitle={modalTitle}
        fields={[
          ...languageFields,
          <Box
            key="addNewLanguage"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 2,
            }}
          >
            <Button
              endIcon={<AddIcon />}
              sx={{
                backgroundColor: "#ECF7F3",
                color: "#2EAE7D",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "14px",
                width: "100%",
                gap: 1.5,
                paddingRight: "16px",
                ":hover": { backgroundColor: "#CFEDE8" },
              }}
              onClick={handleAddNewField}
            >
              Add New Language
            </Button>
          </Box>,
        ]}
      /> */}
    </div>
  );
};

export default LanguageSection;

export const Language: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: 2,
        alignItems: "end",
      }}
    >
      <Box>
        <InputLabel
          sx={{
            marginBottom: 0.5,
            fontWeight: 600,
            color: "#000",
            fontSize: "14px",
          }}
        >
          Language
        </InputLabel>
        <Select
          fullWidth
          displayEmpty
          defaultValue=""
          sx={{
            backgroundColor: "rgba(214, 221, 235, 0.18)",
            height: "40px",
            fontSize: "14px",
            "& .MuiSelect-select": {
              padding: "10px",
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Language
          </MenuItem>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Arabic">Arabic</MenuItem>
          <MenuItem value="French">French</MenuItem>
        </Select>
      </Box>

      <Box>
        <InputLabel
          sx={{
            marginBottom: 0.5,
            fontWeight: 600,
            color: "#000",
            fontSize: "14px",
          }}
        >
          Proficiency
        </InputLabel>
        <Select
          fullWidth
          displayEmpty
          defaultValue=""
          sx={{
            backgroundColor: "rgba(214, 221, 235, 0.18)",
            height: "40px",
            fontSize: "14px",
            "& .MuiSelect-select": {
              padding: "10px",
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Proficiency
          </MenuItem>
          <MenuItem value="Native">Native</MenuItem>
          <MenuItem value="Fluent">Fluent</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
        </Select>
      </Box>

      <IconButton sx={{ justifySelf: "center" }} onClick={onClick}>
        <DeleteIcon sx={{ color: "#FF3B30" }} />
      </IconButton>
    </Box>
  );
};

export const LanguageModal: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Box
      key={0}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: 2,
        alignItems: "end",
      }}
    >
      {/* Language Label and Select */}
      <Box>
        <InputLabel
          sx={{
            marginBottom: 0.5,
            fontWeight: 600,
            color: "#000",
            fontSize: "14px",
          }}
        >
          Language
        </InputLabel>
        <Select
          fullWidth
          displayEmpty
          defaultValue=""
          sx={{
            backgroundColor: "rgba(214, 221, 235, 0.18)",
            height: "40px",
            fontSize: "14px",
            "& .MuiSelect-select": {
              padding: "10px",
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Language
          </MenuItem>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Arabic">Arabic</MenuItem>
          <MenuItem value="French">French</MenuItem>
        </Select>
      </Box>

      {/* Proficiency Label and Select */}
      <Box>
        <InputLabel
          sx={{
            marginBottom: 0.5,
            fontWeight: 600,
            color: "#000",
            fontSize: "14px",
          }}
        >
          Proficiency
        </InputLabel>
        <Select
          fullWidth
          displayEmpty
          defaultValue=""
          sx={{
            backgroundColor: "rgba(214, 221, 235, 0.18)",
            height: "40px",
            fontSize: "14px",
            "& .MuiSelect-select": {
              padding: "10px",
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Proficiency
          </MenuItem>
          <MenuItem value="Native">Native</MenuItem>
          <MenuItem value="Fluent">Fluent</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
        </Select>
      </Box>

      {/* Delete Icon */}
      <IconButton
        sx={{ justifySelf: "center" }}
        onClick={onClick}
        // onClick={() => handleDeleteField(0)}
      >
        <DeleteIcon sx={{ color: "#FF3B30" }} />
      </IconButton>
    </Box>
  );
};
