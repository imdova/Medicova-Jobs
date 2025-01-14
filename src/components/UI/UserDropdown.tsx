"use client";

import { useState } from "react";
import {
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserState } from "@/types";

interface UserDropdownProps {
  user: UserState;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const userAvatar = user.photo;
  const userName = user.firstName || "User Image";
  const userType = user.type;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative">
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleOpen}
          size="small"
          className="focus:outline-none"
        >
          <Avatar
            alt={userName || undefined}
            src={userAvatar || undefined}
            className="h-12 w-12"
          />
        </IconButton>
      </Tooltip>

      {/* Material-UI Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className="min-w-40 rounded-lg shadow-lg"
        disableScrollLock
      >
        <MenuItem>
          <Link
            href={`/me/${userName}`}
            className="min-w-40 text-base text-secondary transition-colors hover:text-primary"
          >
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href={
              userType == "seeker" ? "/job-seeker/setting " : "/employer/setting"
            }
            className="w-full text-base text-secondary transition-colors hover:text-primary"
          >
            Settings
          </Link>
        </MenuItem>
        <MenuItem className="p-0">
          <Button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            variant="text"
            color="error"
            className="w-full justify-normal rounded-none text-base"
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserDropdown;
