import { cn } from "@/util";
import { ChevronUp } from "lucide-react";
import React from "react";

interface SortableHeaderProps {
  children: React.ReactNode;
  active: boolean;
  direction: "asc" | "desc";
  onClick: () => void;
  isSmall?: boolean;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  children,
  active,
  direction,
  onClick,
  isSmall = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex cursor-pointer w-full select-none items-center gap-1 text-left",
        isSmall && "text-xs",
      )}
    >
      <span className="line-clamp-1 text-nowrap">{children}</span>
      {active && (
        <span
          className={cn(
            "transition-transform duration-150 absolute right-1 ",
            direction === "desc" ? "rotate-180" : "rotate-0",
          )}
        >
          <ChevronUp className={`${isSmall ? "h-3 w-3" : "h-5 w-5"} `}  />
        </span>
      )}
      {!active && (
        <span className="text-gray-400 opacity-0 absolute right-1 transition-opacity duration-150 group-hover:opacity-100">
          <ChevronUp className={`${isSmall ? "h-3 w-3" : "h-5 w-5"} `} />
        </span>
      )}
    </button>
  );
};

export default SortableHeader;
