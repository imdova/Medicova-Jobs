import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  modalTitle: string;
  fields: JSX.Element[];
}

const AddModal: React.FC<AddModalProps> = ({
  open,
  onClose,
  modalTitle,
  fields,
}) => {
  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "700px",
          width: "90%",
          maxHeight: "90dvh",
          overflowX: "hidden",
          backgroundColor: "#F8F8FD",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {modalTitle}
          </Typography>
        </Box>

        {/* Modal Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr", // One column for other fields
            gap: 2,
          }}
        >
          {fields}
        </Box>

        {/* Buttons (Save and Close) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start", // Align buttons to the left
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              width: "113px",
              height: "30px",
              background: "#f5f5f5",
              color: "#2EAE7D",
              textTransform: "capitalize",
              fontWeight: "600",
              border: "1px solid #2EAE7D",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "113px",
              height: "30px",
              background: "linear-gradient(180deg, #2EAE7D, #134834)",
              color: "#fff",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddModal;
