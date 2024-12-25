"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  Divider,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TranslateIcon from "@mui/icons-material/Translate";
import AddModal from "./Modals/AddModal";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// Data array for languages and proficiency levels
const languageData = [
  { language: "Arabic", proficiency: "Native" },
  { language: "English", proficiency: "Fluent" },
];

const LanguageSection: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  
  const [languageFields, setLanguageFields] = useState<JSX.Element[]>([
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
      <IconButton sx={{ justifySelf: "center" }} onClick={() => handleDeleteField(0)}>
        <DeleteIcon sx={{ color: "#FF3B30" }} />
      </IconButton>
    </Box>,
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
      <Box
        key={prevFields.length}
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

        <IconButton sx={{ justifySelf: "center" }} onClick={() => handleDeleteField(prevFields.length)}>
          <DeleteIcon sx={{ color: "#FF3B30" }} />
        </IconButton>
      </Box>,
    ]);
  };

  const handleDeleteField = (index: number) => {
    setLanguageFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

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
            Languages
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
              onClick={() => handleOpenModal("Select Your Languages")}
            >
              <EditIcon />
            </IconButton>
            <AddModal
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
            />
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default LanguageSection;
