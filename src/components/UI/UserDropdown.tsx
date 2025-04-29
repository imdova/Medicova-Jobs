"use client";

import { useState, useCallback } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  LogoutOutlined,
  SettingsOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import Avatar from "./Avatar";
import { User } from "next-auth";

interface UserDropdownProps {
  user: User;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user: initialUser }) => {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const user = sessionUser || initialUser;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isEmployer = user.type === "employer";
  const userName = isEmployer ? user.companyUserName : user.userName;
  const userAvatar = isEmployer ? user.companyPhoto : user.photo;
  const displayName = isEmployer ? user.companyName : user.firstName;

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <div className="relative">
      <Tooltip title="Account settings" arrow>
        <IconButton
          onClick={handleOpen}
          size="small"
          aria-label="user menu"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{ p: 0 }}
        >
          <Avatar src={userAvatar!} alt={displayName!} size={48} />
        </IconButton>
      </Tooltip>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            borderRadius: 2,
            mt: 1,
          },
        }}
        disableScrollLock
      >
        {/* User Info Header */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {displayName}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 0.5 }} />

        {/* Menu Items */}
        <MenuItem
          component={Link}
          href={isEmployer ? `/co/${user.companyUserName}` : `/me/${userName}`}
          sx={{
            py: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <PersonOutlined sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">
            {isEmployer ? "Company Profile" : "Profile"}
          </Typography>
        </MenuItem>

        <MenuItem
          component={Link}
          href={isEmployer ? "/employer/setting" : "/job-seeker/setting"}
          sx={{
            py: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <SettingsOutlined sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">Settings</Typography>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleSignOut}
          sx={{
            py: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <LogoutOutlined sx={{ mr: 1, color: "error.main" }} />
          <Typography variant="body2" color="error">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserDropdown;
