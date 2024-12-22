import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Image from "next/image";

interface NewUserModalProps {
  open: boolean;
  onClose: () => void;
  type?: "create" | "edit";
  folderName?: string;
}

const FolderModal: React.FC<NewUserModalProps> = ({
  open,
  onClose,
  type = "create",
  folderName: name,
}) => {
  const [folderName, setFolderName] = useState("");

  const handleFolderNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFolderName(event.target.value);
  };

  const handleCreateFolder = () => {
    // Logic to create the folder
    console.log("Folder Created: ", folderName);
    // Clear the folder name after creation
    onClose(); // Close the modal
    setFolderName("");
  };

  const closeHandler = () => {
    setFolderName("");
    onClose();
  };
  const captionText =
    type === "create"
      ? "Enter a name for your new folder."
      : "Edit the name of your existing folder.";

  useEffect(() => {
    setFolderName(name || "");
  }, [name]);

  return (
    <Modal open={open} onClose={closeHandler}>
      <FormControl
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
          px: 4,
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <div>
            <h2 className="text-2xl font-bold">
              {type === "create" ? "Create Folder" : "Edit Folder"}
            </h2>
            <p className="mb-3 text-sm text-gray-500">{captionText}</p>
          </div>
          <IconButton onClick={closeHandler}>
            <Close />
          </IconButton>
        </Box>
        {/* Folder Name Input */}
        <TextField
          label="Folder Name"
          variant="outlined"
          fullWidth
          value={folderName}
          onChange={handleFolderNameChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image
                  src="/images/folder.png"
                  width={20}
                  height={20}
                  alt="folder icon"
                  className="object-contain"
                />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {/* Modal Content */}
        <div className="flex justify-start gap-2">
          {/* Cancel and Create Folder Buttons */}
          <Button onClick={closeHandler} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleCreateFolder}
            variant="contained"
            disabled={!folderName} // Disable if folderName is empty
          >
            {type === "create" ? "Create Folder" : "Edit Folder"}
          </Button>
        </div>
      </FormControl>
    </Modal>
  );
};

export default FolderModal;
