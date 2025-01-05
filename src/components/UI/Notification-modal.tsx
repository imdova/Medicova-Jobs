import {
  Close,
  DoneAll,
  MoreVert,
  SettingsOutlined,
} from "@mui/icons-material";
import { Button, Drawer, IconButton, Menu } from "@mui/material";
import { notifications } from "@/constants";
import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { NotificationItem } from "@/types";
import Image from "next/image";
import { getFullLastEdit } from "@/util";
import Link from "next/link";

interface NotificationModalProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  anchorEl,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent rendering until after hydration
  const open = Boolean(anchorEl);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      component="div"
      MenuListProps={{
        "aria-labelledby": "basic-button",
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
    >
      <div className="bg-white">
        <div className="flex items-center justify-between px-5 py-3">
          <h6 className="by-2 font-semibold text-main">Notifications</h6>
          <IconButton
            className="rounded border border-solid border-gray-300 p-1"
            onClick={onClose}
          >
            <Close className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="scroll-bar-minimal max-h-[450px] w-[450px] overflow-y-auto">
          {notifications.map((item, index) => (
            <SmallNotificationCard key={index} {...item} />
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
            className="rounded-base bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-900"
          >
            View All Notifications
          </Link>
        </div>
      </div>
    </Menu>
  );
};

export default NotificationModal;

const SmallNotificationCard: React.FC<NotificationItem> = ({
  icon,
  isRead,
  image,
  title,
  description,
  timeStamp,
  tags,
}) => {
  const IconComponent = icon;
  return (
    <div
      className={` ${isRead ? "" : "bg-neutral-50"} flex justify-between border-b border-gray-100 p-3`}
    >
      <div className="mr-2 grid grid-cols-1 grid-rows-1">
        <Image
          src={image}
          alt="image"
          width={40}
          height={40}
          className="col-start-1 row-start-1 h-[40px] w-[40px] rounded-full border object-cover"
        />
        <div className="col-start-1 row-start-1 flex justify-end">
          <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-light-primary p-1 text-white">
            <IconComponent className="h-3 w-3" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h6 className="line-clamp-1 text-sm font-bold text-main">{title}</h6>
        <p className="line-clamp-2 max-w-[700px] text-sm text-secondary">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`rounded px-2 py-1 text-xs text-gray-500 ${tag.status === "normal" ? "bg-gray-100" : tag.status === "error" ? "bg-red-100" : tag.status === "warning" ? "bg-yellow-100" : "bg-green-100"}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400"> {getFullLastEdit(timeStamp)}</p>
      </div>
      <div>
        <IconButton size="medium" className="p-1">
          <MoreVert className="h-5 w-5" />
        </IconButton>
      </div>
    </div>
  );
};
