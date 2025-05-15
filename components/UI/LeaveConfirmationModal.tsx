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

interface ButtonConfig {
  text: string;
  onClick: () => void;
  color?: ButtonColor;
  variant?: ButtonVariant;
  autoFocus?: boolean;
}

interface LeaveConfirmationModalProps {
  isOpen: boolean;
  onLeave: () => void;
  onStay: () => void;
  title?: string;
  description?: string;
  hideDefaultButtons?: boolean;
  additionalButtons?: ButtonConfig[];
  defaultButtonColors?: {
    leave?: string;
    stay?: string;
  };
}

const LeaveConfirmationModal: React.FC<LeaveConfirmationModalProps> = ({
  isOpen,
  onLeave,
  onStay,
  title = "Are you sure you want to leave?",
  description = "You have unsaved changes. Are you sure you want to leave without saving?",
  hideDefaultButtons = false,
  additionalButtons = [],
}) => {
  const defaultButtons: ButtonConfig[] = !hideDefaultButtons
    ? [
        {
          text: "Stay",
          onClick: onStay,
          color: "primary",
          variant: "outlined",
        },
        {
          text: "Leave",
          onClick: onLeave,
          color: "error",
          variant: "contained",
          autoFocus: true,
        },
      ]
    : [];

  const allButtons: ButtonConfig[] = [...defaultButtons, ...additionalButtons];

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
        {allButtons.map((button, index) => (
          <Button
            key={index}
            onClick={button.onClick}
            variant={button.variant}
            autoFocus={button.autoFocus}
            color={button.color}
          >
            {button.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default LeaveConfirmationModal;
