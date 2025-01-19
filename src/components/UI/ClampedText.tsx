"use client";
import { Button, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";

interface ClampedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  lines: number;
}

const ClampedText: React.FC<ClampedTextProps> = ({
  children,
  lines,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && hiddenRef.current) {
      const clampedHeight =
        parseInt(window.getComputedStyle(textRef.current).lineHeight || "0") *
        lines;
      const fullHeight = hiddenRef.current.offsetHeight;
      setIsClamped(fullHeight > clampedHeight);
    }
  }, [children, lines]);

  return (
    <div {...props}>
      {/* Hidden span to measure full text height */}
      <div
        ref={hiddenRef}
        className="pointer-events-none invisible absolute left-0 top-0 z-[-1] whitespace-normal"
      >
        {children}
      </div>
      {/* Clamped or expanded text */}
      <Typography
        ref={textRef}
        sx={{
          overflow: "hidden",
          display: isExpanded ? "block" : "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isExpanded ? "none" : lines,
          transition: "all 0.3s ease-in-out",
        }}
      >
        {children}
      </Typography>
      {/* Show more/less button */}
      {isClamped && (
        <div className="flex items-center justify-center">
          <Button
            className="mt-2 p-0"
            variant="text"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClampedText;
