"use client";
import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";

interface ClampedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  lines: number;
  lineHeight?: number;
  showMoreText?: string;
  showLessText?: string;
}

const ClampedText: React.FC<ClampedTextProps> = ({
  children,
  lines,
  lineHeight = 24, // Default line height
  showMoreText = "Show more",
  showLessText = "Show less",
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate the clamped height
  const clampedHeight = lines * lineHeight;
  
  useEffect(() => {
    // Function to measure content and determine if clamping is needed
    const measureContent = () => {
      if (!contentRef.current) return;
      
      // Get the full content height
      const fullHeight = contentRef.current.scrollHeight;
      setContentHeight(fullHeight);
      
      // Check if content needs clamping
      setIsClamped(fullHeight > clampedHeight);
    };
    
    measureContent();
    
    // Re-measure on window resize
    window.addEventListener('resize', measureContent);
    return () => window.removeEventListener('resize', measureContent);
  }, [children, clampedHeight]);
  
  return (
    <div {...props}>
      <div 
        ref={containerRef}
        style={{
          overflow: "hidden",
          maxHeight: isExpanded ? `${contentHeight}px` : `${clampedHeight}px`,
          transition: "max-height 0.3s ease-in-out"
        }}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>
      
      {isClamped && (
        <div className="flex items-center justify-center mt-2">
          <Button
            variant="text"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? showLessText : showMoreText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClampedText;