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
          <h6 className="text-2xl font-bold text-main">{modalTitle}</h6>
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
              textTransform: "capitalize",
              fontWeight: "600",
              border: "1px solid var(--primary)",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "113px",
              height: "30px",
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
