import React from "react";
import { Modal, Box, Button, IconButton, FormControl } from "@mui/material";
import { Close } from "@mui/icons-material";
import FolderBig from "./folder-main-card";

interface NewUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AddToFolder: React.FC<NewUserModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
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
          <h2 className="text-2xl font-bold">Create Folder</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <div className="p-2">
          <h3 className="mb-4 text-xl font-semibold">Recently Used</h3>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((item, index) => (
              <FolderBig key={index} isSmall={true} />
            ))}
          </div>
        </div>
        {/* Modal Content */}
        <div className="flex justify-start gap-2">
          {/* Add Button */}
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create Folder
          </Button>
        </div>
      </FormControl>
    </Modal>
  );
};

export default AddToFolder;
