import { NotificationItem } from "@/types";
import { getFullLastEdit } from "@/util";
import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";

const NotificationCard: React.FC<NotificationItem> = ({
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
      className={` ${isRead ? "" : "bg-neutral-50"} flex justify-between gap-3 border-b border-gray-100 p-3 px-5`}
    >
      <div className="grid grid-cols-1 grid-rows-1">
        <Image
          src={image}
          alt="image"
          width={60}
          height={60}
          className="col-start-1 row-start-1 h-[60px] w-[60px] rounded-full border object-cover"
        />
        <div className="col-start-1 row-start-1 flex justify-end">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-light-primary p-1 text-white">
            <IconComponent className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h6 className="font-medium text-main">{title}</h6>
        <p className="max-w-[700px] text-sm text-secondary">{description}</p>
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
        <IconButton size="medium">
          <MoreVert className="h-6 w-6" />
        </IconButton>
      </div>
    </div>
  );
};

export default NotificationCard;
