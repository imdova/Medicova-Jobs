import React, { useState } from "react";
import { Badge, Menu, MenuItem, IconButton, Button } from "@mui/material";
import {
  Close,
  DoneAll,
  NotificationsActive,
  SettingsOutlined,
} from "@mui/icons-material";
import { notifications } from "@/constants";
import Link from "next/link";
import { SmallNotificationCard } from "./SmallNotificationCard";

interface NotificationDropdownProps {
  pathname?: string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  pathname,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const pageName = pathname
    ? pathname.split("/").filter(Boolean).pop() || "home"
    : "home";
  const isNotifications = pageName === "notifications";

  return (
    <div className="relative">
      <button
        className="hidden rounded-full p-2 focus:outline-none enabled:hover:bg-gray-200 md:block"
        disabled={isNotifications}
        onClick={handleClick}
      >
        <Badge badgeContent={isNotifications ? 0 : 3} color="error">
          <NotificationsActive
            className={isNotifications ? "text-primary" : "text-inherit"}
          />
        </Badge>
      </button>
      <Link
        href="/notifications"
        onClick={handleClose}
        className="rounded-full p-2 focus:outline-none enabled:hover:bg-gray-200 md:hidden"
      >
        <Badge badgeContent={isNotifications ? 0 : 3} color="error">
          <NotificationsActive
            className={isNotifications ? "text-primary" : "text-inherit"}
          />
        </Badge>
      </Link>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="mt-2"
        MenuListProps={{
          style: { overflowY: "hidden", maxHeight: "400px" },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            background: "none",
            borderRadius: "20px",
          },
          "& .MuiList-root": {
            p: 0,
          },
        }}
        disableScrollLock
      >
        <div className="bg-white">
          <div className="flex items-center justify-between px-5 py-3">
            <h6 className="by-2 font-semibold text-main">Notifications</h6>
            <IconButton
              className="rounded border border-solid border-gray-300 p-1"
              onClick={handleClose}
            >
              <Close className="h-5 w-5" />
            </IconButton>
          </div>
          <div className="scroll-bar-minimal max-h-[300px] overflow-y-auto">
            {notifications.slice(0, 3).map((item, index) => (
              <MenuItem key={index} onClick={handleClose} className="p-0">
                <SmallNotificationCard {...item} />
              </MenuItem>
            ))}
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <IconButton className="p-0">
                <SettingsOutlined className="h-6 w-6" />
              </IconButton>
              <Button variant="text" className="flex">
                <DoneAll className="h-5 w-5" />
                <span className="text-sm">Mark All As Read</span>
              </Button>
            </div>
            <Link
              href="/notifications"
              onClick={handleClose}
              className="rounded-base bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-900"
            >
              View All Notifications
            </Link>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default NotificationDropdown;
