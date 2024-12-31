"use client";

import { IconButton } from "@mui/material";

interface ToolbarButtonProps {
  icon: React.ElementType; // Update type to accept Material UI icon components
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  isActive = false,
}: ToolbarButtonProps) {
  return (
    <IconButton
      size="medium"
      onClick={onClick}
      className={`${isActive ? "bg-muted hover:bg-muted text-primary hover:text-primary" : ""} h-8 w-8`}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </IconButton>
  );
}
