import React from "react";

type Notification = {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
};

type NotificationCardProps = {
  notification: Notification;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-700";
      case "success":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className={`rounded-lg p-4 shadow-sm ${getTypeStyles(notification.type)}`}
    >
      <h3 className="font-medium">{notification.title}</h3>
      <p className="text-sm">{notification.message}</p>
      <p className="mt-1 text-xs text-gray-500">{notification.timestamp}</p>
    </div>
  );
};

export default NotificationCard;
