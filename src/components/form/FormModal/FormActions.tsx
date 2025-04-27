import React, { useState } from "react";
import { Button, DialogActions } from "@mui/material";
import DeleteConfirmationDialog from "@/components/UI/DeleteConfirmationDialog";

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
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const onDeleteOpen = () => setOpenDialog(true);
  const onDeleteCancel = () => setOpenDialog(false);
  return (
    <>
      <DialogActions className="border-t border-gray-200">
        <div className="flex w-full justify-between">
          {onDelete && (
            <Button onClick={onDeleteOpen} variant="text" color="secondary">
              {deleteButtonText}
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
      {onDelete && (
        <DeleteConfirmationDialog
          open={openDialog}
          title="Confirm Deletion"
          loading={deleteLoading}
          message={`Are you sure you want to ${deleteButtonText}? This action cannot be undone.`}
          onDelete={onDelete}
          onClose={onDeleteCancel}
        />
      )}
    </>
  );
};
