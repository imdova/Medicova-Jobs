"use client";
import { Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

interface CollapsibleProps {
  children: React.ReactNode;
  lines?: number;
  itemsPerLine?: number;
  defaultExpanded?: boolean;
  type: string;
  className?: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  lines = 2,
  itemsPerLine = 1,
  defaultExpanded = false,
  type,
  className = "",
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [itemHeight, setItemHeight] = useState<number>(0);
  const [totalHeight, setTotalHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  // Function to measure item heights
  const measureHeights = () => {
    if (firstItemRef.current && containerRef.current) {
      const firstItemHeight = firstItemRef.current.offsetHeight;
      const containerHeight = containerRef.current.scrollHeight;

      setItemHeight(firstItemHeight);
      setTotalHeight(containerHeight);
    }
  };

  // Measure heights after initial render and when children change
  useEffect(() => {
    measureHeights();
    // Add resize listener to handle window size changes
    window.addEventListener("resize", measureHeights);

    return () => {
      window.removeEventListener("resize", measureHeights);
    };
  }, [children]);

  // Convert React children to array for easier handling
  const childrenArray = React.Children.toArray(children);

  const remainingItems = childrenArray.length - itemsPerLine * lines;

  return (
    <div>
      <div
        ref={containerRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${className}`}
        style={{
          height: expanded
            ? `${totalHeight}px`
            : itemHeight
              ? `${itemHeight * Math.min(lines, childrenArray.length)}px`
              : "auto",
        }}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            ref={index === 0 ? firstItemRef : null}
            className="transition-opacity duration-300"
          >
            {child}
          </div>
        ))}
      </div>

      {childrenArray.length > lines ? (
        <div className="flex items-center justify-center">
          <Button
            className="mt-4 p-0"
            variant="text"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? `Show less ${type}${remainingItems > 1 ? "s" : ""}`
              : `Show ${remainingItems} more ${type}${remainingItems > 1 ? "s" : ""}`}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Collapsible;
