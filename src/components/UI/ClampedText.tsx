"use client";
import { Button } from "@mui/material";
import { useState } from "react";

interface ClampedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
  lines: number;
}

const ClampedText: React.FC<ClampedTextProps> = ({
  children,
  lines,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div {...props}>
      <div
        className={`overflow-hidden transition-all ${
          isExpanded ? "" : `line-clamp-${lines}`
        }`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
        }}
      >
        {children}
      </div>
      <div className="flex items-center justify-center">
        <Button
          className="mt-2 p-0"
          variant="text"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
};

export default ClampedText;
