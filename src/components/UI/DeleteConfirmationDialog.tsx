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
  color?: "error" | "success" | "warning";
  buttonText?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  title,
  message,
  onDelete,
  onClose,
  loading,
  color = "error",
  buttonText = "Yes Delete",
}) => {
  const colors: Record<"error" | "success" | "warning", string> = {
    success: "text-green-600",
    warning: "text-amber-600",
    error: "text-red-600",
  };

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
      <DialogTitle className={colors[color]}>{title}</DialogTitle>
      <DialogContent>
        <p className="text-secondary">{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          No
        </Button>
        <Button onClick={onDelete} color={color} variant="contained">
          {loading ? "loading..." : buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
