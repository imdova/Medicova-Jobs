"use client";
import { useRef } from "react";

interface ResizeProps {
  value: { width?: string | number; height?: string | number };
  onChange: (size: { width: string; height: string }) => void;
  children: React.ReactNode;
}

const Resize = ({ value: size, onChange, children }: ResizeProps) => {
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
      className="relative"
      style={{ width: size.width || "100%", height: size.height || "100%" }}
    >
      {children}
      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 h-3 w-3 cursor-nwse-resize bg-white"
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default Resize;
