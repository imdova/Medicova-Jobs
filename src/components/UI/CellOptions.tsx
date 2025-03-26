"use client";
import { FilterList, MoreVert } from "@mui/icons-material";
import { Button, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";

interface ActionOption<T> {
  label: string;
  action: (item: T) => void;
  icon?: React.ReactNode;
}

type CellOptionsProps<T> = {
  options: ActionOption<T>[];
  item: T;
};

export default function CellOptions<T>({ item, options }: CellOptionsProps<T>) {
  const [anchorEl, selAnchorEl] = useState<null | HTMLElement>(null);
  const onOpen = (e: MouseEvent<HTMLButtonElement>) =>
    selAnchorEl(e.currentTarget);
  const onClose = () => selAnchorEl(null);
  if (!options || !options.length) return null;
  return (
    <div>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            className="group min-w-40"
            onClick={() => {
              option.action(item);
              onClose();
            }}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <span>{option.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
