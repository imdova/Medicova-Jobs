"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Edit } from "@mui/icons-material";

const AboutCompany: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(descriptionRef.current).lineHeight,
        10,
      );
      const maxLines = 3;
      const maxHeight = lineHeight * maxLines;
      setShowExpandButton(descriptionRef.current.scrollHeight > maxHeight);
    }
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const description = `A healthcare company refers to any business or organization that
        provides products or services related to the maintenance, improvement,
        or management of health.`;

  return (
    <div className="relative mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      {/* Title */}
      <div className="flex mb-2 items-center justify-between">
        <h3 className="text-2xl font-bold text-main">About Company :</h3>
        <IconButton className="rounded border border-solid border-gray-300 p-2">
           <Edit />
        </IconButton>
      </div>
      <p
        ref={descriptionRef}
        className="invisible absolute max-w-[90%] px-2 text-secondary"
      >
        {description}
      </p>
      <p
        className={`${isExpanded ? "" : "line-clamp-3"} max-w-[90%] px-2 text-secondary`}
      >
        <PendingActionsIcon className="-ml-1 mr-2 inline text-primary" />A healthcare
        {description}
      </p>

      {showExpandButton && (
        <div className="flex items-center justify-center">
          <Button className="mt-2 p-0" variant="text" onClick={handleToggle}>
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AboutCompany;
