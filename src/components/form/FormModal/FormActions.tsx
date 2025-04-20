import React from "react";
import { Button, DialogActions } from "@mui/material";

interface FormActionsProps {
  onCancel: () => void;
  onDelete?: () => void;
  loading?: boolean;
  deleteLoading?: boolean;
  submitButtonText?: string;
  deleteButtonText?: string;
  cancelButtonText?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onDelete,
  loading,
  deleteLoading,
  submitButtonText = "Save",
  deleteButtonText = "Delete",
  cancelButtonText = "Cancel",
}) => (
  <DialogActions className="border-t border-gray-200">
    <div className="flex w-full justify-between">
      {onDelete && (
        <Button onClick={onDelete} variant="text" color="secondary">
          {deleteLoading ? "loading..." : deleteButtonText}
        </Button>
      )}
      <div className="flex flex-1 justify-end gap-2">
        <Button onClick={onCancel} variant="text" color="secondary">
          {cancelButtonText}
        </Button>
        <Button type="submit" color="primary" variant="contained">
          {loading ? "Loading..." : submitButtonText}
        </Button>
      </div>
    </div>
  </DialogActions>
);
