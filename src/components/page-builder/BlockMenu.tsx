import { Block } from "@/types/blog";
import { Menu, MenuItem } from "@mui/material";

interface BlockMenuProps {
  block: Block;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (block: Block, action: string) => void;
}

export function BlockMenu({ block, anchorEl, isOpen, onClose, onAction }: BlockMenuProps) {
  const menuItems = [
    { label: "Split", action: "Split" },
    { label: "Full Width", action: "Full-Width" },
    { label: "Delete", action: "Delete" },
    { label: "Duplicate", action: "Duplicate" },
  ];

  return (  
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{ vertical: "center", horizontal: "left" }}
      transformOrigin={{ vertical: "center", horizontal: "right" }}
    >
      {menuItems.map(({ label, action }) => (
        <MenuItem key={action} onClick={() => onAction(block, action)}>
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
}