import UserDropdown from "@/components/UI/Avatar";
import NotificationModal from "@/components/UI/Notification-modal";
import { UserState } from "@/types";
import { NotificationsActive, NotificationsNone } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserActionProps {
  user?: UserState;
  pageName?: string;
}

const HeaderAction: React.FC<UserActionProps> = ({ user, pageName }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (user?.id) {
    return (
      <div className="hidden items-center gap-3 text-inherit md:flex">
        <NotificationModal anchorEl={anchorEl} onClose={handleClose} />
        <IconButton
          className="relative h-12 w-12 text-inherit"
          size="medium"
          onClick={handleClick}
          disabled={pageName === "notifications"}
        >
          {pageName !== "notifications" && (
            <div className="absolute right-4 top-3 h-2 w-2 rounded-full border border-white bg-red-500" />
          )}
          {pageName === "notifications" ? (
            <NotificationsActive className="h-6 w-6 text-inherit" />
          ) : (
            <NotificationsNone className="h-6 w-6 text-inherit" />
          )}
        </IconButton>
        <UserDropdown
          userAvatar={user.photo || user.image}
          userName={user.firstName || user.name || "User Image"}
        />
      </div>
    );
  } else {
    return (
      <div className="hidden gap-3 md:flex">
        <Link
          href="/auth/register"
          className="text-nowrap rounded-[10px] px-4 py-2 font-semibold uppercase text-inherit transition-colors duration-300 hover:bg-primary-foreground hover:text-primary focus:ring-2 focus:ring-primary-foreground"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/signin"
          className="rounded-[10px] bg-primary px-4 py-2 font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary focus:ring-2 focus:ring-primary-foreground"
        >
          Login
        </Link>
      </div>
    );
  }
};

export default HeaderAction;
