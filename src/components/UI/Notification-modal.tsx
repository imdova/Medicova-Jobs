import { dummyNotifications } from "@/constants/notifications";
import { Close } from "@mui/icons-material";
import { Drawer, IconButton } from "@mui/material";
import NotificationCard from "./NotificationCard";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose} // Handles backdrop clicks automatically
    >
      <div className="h-full w-80 bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        <div className="space-y-4">
          {dummyNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default NotificationModal;
