"use client";
import { Button } from "@mui/material";
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
      const clampedHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight || "0"
      ) * lines;
      const fullHeight = hiddenRef.current.offsetHeight;
      setIsClamped(fullHeight > clampedHeight);
    }
  }, [children, lines]);

  return (
    <div {...props}>
      {/* Hidden span to measure full text height */}
      <div
        ref={hiddenRef}
        className="invisible absolute top-0 left-0 z-[-1] pointer-events-none whitespace-normal"
      >
        {children}
      </div>
      {/* Clamped or expanded text */}
      <div
        ref={textRef}
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
