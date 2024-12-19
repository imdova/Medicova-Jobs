import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {modalTitle}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "rgba(227, 72, 23, 1)" }}>
            <CloseIcon />
          </IconButton>
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

        {/* Add Button */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            sx={{
              width: "204.16px",
              height: "46px",
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
