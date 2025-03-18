import React from "react";
import { DialogTitle, Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalHeaderProps {
  title: string;
  description?: string;
  error?: string;
  handleCancel: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  description,
  error,
  handleCancel,
}) => (
  <>
    <DialogTitle className="border-b border-gray-200 text-lg font-bold">
      <div className="flex items-start">
        <div className="flex-1">
          {title}
          {description && (
            <p className="mt-1 text-sm font-normal text-secondary">
              {description}
            </p>
          )}
        </div>
        <IconButton size="small" onClick={handleCancel}>
          <Close className="w-5 h-5" />
        </IconButton>
      </div>
    </DialogTitle>
    {error && (
      <Alert severity="error" className="my-1">
        <p className="text-xs">{error}</p>
      </Alert>
    )}
  </>
);
