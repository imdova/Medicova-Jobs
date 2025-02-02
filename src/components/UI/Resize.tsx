"use client";
import { useState, useRef } from "react";

interface ResizeProps {
  value: { width: string; height: string };
  onChange: (size: { width: string; height: string }) => void;
  children: React.ReactNode;
}

const Resize = ({ value, onChange, children }: ResizeProps) => {
  const [size, setSize] = useState(value);
  const divRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !divRef.current) return;

    const newWidth = `${e.clientX - divRef.current.getBoundingClientRect().left}px`;
    const newHeight = `${e.clientY - divRef.current.getBoundingClientRect().top}px`;

    setSize({ width: newWidth, height: newHeight });
    onChange({ width: newWidth, height: newHeight });
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={divRef}
      style={{
        width: size.width,
        height: size.height,
        position: "relative",
        border: "1px solid black",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      {children}
      {/* Resize handle */}
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "black",
          position: "absolute",
          bottom: "0",
          right: "0",
          cursor: "nwse-resize",
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Resize;
