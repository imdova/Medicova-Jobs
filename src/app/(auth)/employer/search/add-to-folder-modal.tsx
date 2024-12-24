import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { folders } from "@/constants";
import FolderSmallCard from "./folder-small-card";
import { Folder } from "@/types";
import CandidateTable from "./saved-search/folders-table";

interface NewUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AddToFolderModal: React.FC<NewUserModalProps> = ({ open, onClose }) => {
  const [folderId, setFolderId] = useState<string | number>("");

  const handleFolderClick = (id: string | number) => {
    setFolderId(id);
  };

  const handelSubmit = () => {
    console.log("Add to folder", folderId);
    onClose();
  };

  const handelTableItemClick = (folder: Folder) => {
    setFolderId(folder.id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <FormControl
        onSubmit={handelSubmit}
        fullWidth
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "700px",
          width: "90%",
          maxHeight: "90dvh",
          overflowY: "auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 24,
          py: 2,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="text-2xl font-bold">Select Folder</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <div className="p-2">
          <h3 className="mb-4 text-lg font-semibold">Recently Used</h3>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
            {folders.slice(0, 5).map((folder, index) => (
              <FolderSmallCard
                key={index}
                folder={folder}
                onClick={handleFolderClick}
                selected={folderId}
              />
            ))}
          </div>
        </div>
        <div className="p-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">All folders</h2>
            <TextField
              variant="outlined"
              placeholder="Search folders"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                classes: {
                  input: "p-2", // Add padding to the input element
                },
              }}
            />
          </div>
          <div className="max-w-[calc(100vw-50px)] overflow-x-auto">
            <CandidateTable
              fixedNumberPerPage={5}
              size="small"
              data={folders.slice(5)}
              onClick={handelTableItemClick}
              selectedItem={folderId}
            />
          </div>
        </div>
        {/* Modal Content */}
        <div className="flex justify-start gap-2">
          {/* Add Button */}
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onClose} variant="contained">
            Add
          </Button>
        </div>
      </FormControl>
    </Modal>
  );
};

export default AddToFolderModal;
