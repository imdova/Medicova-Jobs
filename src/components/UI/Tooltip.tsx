import React, { useState } from "react";

interface ToolTipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const Tooltip: React.FC<ToolTipProps> = ({
  content,
  children,
  position = "top",
  className = "",
}) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div className={`relative inline-block overflow-visible ${className}`}>
      <div
        onMouseEnter={() => setVisible(content ? true : false)}
        onMouseLeave={() => setVisible( false)}
        className="w-full"
      >
        {children}
      </div>
      {visible && content && (
        <div
          className={`absolute z-50 w-max max-w-xs rounded bg-black/60 backdrop-blur-sm px-3 py-2 text-xs text-white shadow-lg ${positionClasses[position]}`}
        >
          {content}
          <div
            className={`absolute w-0 h-0 border-[6px] border-transparent ${getArrowPosition(position)}`}
            style={{
              borderBottomColor: 'rgba(0, 0, 0, 0.6)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;

function getArrowPosition(position: string): string {
  switch (position) {
    case "top":
      return "bottom-[-12px] rotate-180 left-1/2 -translate-x-1/2";
    case "bottom":
      return "top-[-12px] left-1/2 -translate-x-1/2";
    case "left":
      return "right-[-12px] rotate-90 top-1/2 -translate-y-1/2";
    case "right":
      return "left-[-12px] -rotate-90 top-1/2 -translate-y-1/2";
    default:
      return "";
  }
}
