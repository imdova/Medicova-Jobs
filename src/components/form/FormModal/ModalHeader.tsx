import React from "react";
import { DialogTitle, Alert } from "@mui/material";

interface ModalHeaderProps {
    title: string;
    description?: string;
    error?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, description, error }) => (
    <>
        <DialogTitle className="text-lg font-bold">
            {title}
            {description && (
                <p className="mt-2 text-sm font-normal text-secondary">{description}</p>
            )}
        </DialogTitle>
        {error && (
            <Alert severity="error" className="my-1">
                <p className="text-xs">{error}</p>
            </Alert>
        )}
    </>
);