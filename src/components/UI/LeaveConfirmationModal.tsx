import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
type ButtonVariant = "text" | "outlined" | "contained";

interface LeaveConfirmationModalProps {
  isOpen: boolean;
  onLeave: () => void;
  onStay: () => void;
  title?: string;
  description?: string;
  leaveButtonText?: string;
  stayButtonText?: string;
  leaveButtonColor?: ButtonColor;
  stayButtonColor?: ButtonColor;
  leaveButtonVariant?: ButtonVariant;
  stayButtonVariant?: ButtonVariant;
}

const LeaveConfirmationModal: React.FC<LeaveConfirmationModalProps> = ({
  isOpen,
  onLeave,
  onStay,
  title = "Are you sure you want to leave?",
  description = "You have unsaved changes. Are you sure you want to leave without saving?",
  leaveButtonText = "Leave",
  stayButtonText = "Stay",
  leaveButtonColor = "error",
  stayButtonColor = "primary",
  leaveButtonVariant = "contained",
  stayButtonVariant = "outlined",
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onStay}
      aria-labelledby="leave-dialog-title"
      aria-describedby="leave-dialog-description"
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle id="leave-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="leave-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onStay}
          color={stayButtonColor}
          variant={stayButtonVariant}
        >
          {stayButtonText}
        </Button>
        <Button
          onClick={onLeave}
          color={leaveButtonColor}
          variant={leaveButtonVariant}
          autoFocus
        >
          {leaveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveConfirmationModal;
