import React from "react";
import { Button, DialogActions } from "@mui/material";

interface FormActionsProps {
    onCancel: () => void;
    isDirty: boolean;
    loading?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ onCancel, isDirty, loading }) => (
    <DialogActions className="border-t border-gray-200" >
        <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
        </Button>
        <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!isDirty || loading}
        >
            {loading ? "Loading..." : "Submit"}
        </Button>
    </DialogActions>
);