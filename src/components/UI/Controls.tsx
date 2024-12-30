import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PauseIcon from "@mui/icons-material/Pause";
import React, { useState } from "react";
import ShareMenu from "@/components/UI/ShareMenu";

const Controls: React.FC = () => {
  return (
    <div className="flex w-full flex-col text-center md:w-auto">
      <div className="flex items-center justify-center gap-1">
        <ShareMenu link="https://medicova.com" />
        <Switch color="primary" defaultChecked />
        <DropdownMenu />
      </div>
      <LinearProgress
        variant="determinate"
        value={30}
        className="my-2 h-2"
        color="primary"
      />
      <p className="font-semibold">10 applicants</p>
      <Button variant="contained" className="text-nowrap px-10">
        View applicants
      </Button>
    </div>
  );
};

export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        size="medium"
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVertIcon className="h-7 w-7" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="mt-2"
      >
        <MenuItem
          onClick={handleClose}
          className="flex w-60 items-center gap-2"
        >
          <EditIcon color="primary" fontSize="small" />
          <span>Edit</span>
        </MenuItem>
        <Divider className="!m-0" />
        <MenuItem onClick={handleClose} className="flex items-center gap-2">
          <ContentCopyIcon color="primary" fontSize="small" />
          <span>Duplicate</span>
        </MenuItem>
        <Divider className="!m-0" />
        <MenuItem onClick={handleClose} className="flex items-center gap-2">
          <ShareIcon color="primary" fontSize="small" />
          <span>Share</span>
        </MenuItem>
        <Divider className="!m-0" />
        <MenuItem onClick={handleClose} className="flex items-center gap-2">
          <PauseIcon color="warning" fontSize="small" />
          <span>Close Job</span>
        </MenuItem>
        <Divider className="!m-0" />
        <MenuItem onClick={handleClose} className="flex items-center gap-2">
          <DeleteIcon color="error" fontSize="small" />
          <span>Remove</span>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Controls;
