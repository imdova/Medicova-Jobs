import React from "react";
import { useDrop } from "react-dnd";
import { cn } from "@/util";
import { Block } from "@/types/blog";

const ACCEPTS: Block["type"][] = [
  "h1",
  "h2",
  "h3",
  "text",
  "paragraph",
  "image",
  "button",
  "html",
  "divider",
  "container",
  "grid",
  "flex-row",
  "flex-column",
  "quote",
  "code",
  "video",
];

type DropZoneData = {
  path: string;
  childrenCount: number;
};

type DragItem = Block & { path: string };

type DropZoneProps = {
  data: DropZoneData;
  onDrop: (data: DropZoneData, item: DragItem) => void;
  isLast?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const DropZone: React.FC<DropZoneProps> = ({
  data,
  onDrop,
  isLast = false,
  className,
  children,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: ACCEPTS,
    drop: (item) => {
      onDrop(data, item);
    },
    canDrop: (item) => {
      const dropZonePath = data.path;
      const splitDropZonePath = dropZonePath.split("-");
      const itemPath = item.path;

      if (!itemPath) return true;

      const splitItemPath = itemPath.split("-");

      if (itemPath === dropZonePath) return false;

      if (splitItemPath.length === splitDropZonePath.length) {
        const pathToItem = splitItemPath.slice(0, -1).join("-");
        const currentItemIndex = Number(splitItemPath.at(-1));

        const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");
        const currentDropZoneIndex = Number(splitDropZonePath.at(-1));

        if (pathToItem === pathToDropZone) {
          const nextDropZoneIndex = currentItemIndex + 1;
          if (nextDropZoneIndex === currentDropZoneIndex) return false;
        }
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div
      className={cn("dropZone", { active: isActive, isLast }, className)}
      ref={drop as any}
    >
      {children}
    </div>
  );
};

export default DropZone;
