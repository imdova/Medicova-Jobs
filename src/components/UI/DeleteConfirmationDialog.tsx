import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// The dynamic confirmation dialog component
interface DeleteConfirmationDialogProps {
  open: boolean;
  title: string;
  message?: string;
  onDelete: () => void;
  onClose: () => void;
  loading?: boolean;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  title,
  message,
  onDelete,
  onClose,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: 10,
        },
      }}
    >
      <DialogTitle className="text-red-600">{title}</DialogTitle>
      <DialogContent>
        <p className="text-secondary">{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          No
        </Button>
        <Button onClick={onDelete} color="error" variant="contained">
        {loading ? "loading..." : "Yes Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
