"use client";
import React from "react";
import Image from "next/image";
import useImageValidation from "@/hooks/useImageValidation";
import { cn } from "@/util";

interface AvatarProps {
  src?: string | null; // Image source URL
  alt?: string; // Alt text for the image
  size?: number; // Size of the avatar (width and height)
  shape?: "circle" | "square"; // Shape of the avatar
  placeholderSrc?: string; // Custom placeholder image source
  className?: string; // Additional Tailwind CSS classes
  imageClass?: string; // Additional Tailwind CSS classes
}
const DEFAULT_IMAGE = "/images/placeholder-avatar.svg";

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = 40,
  shape = "circle",
  placeholderSrc = DEFAULT_IMAGE, // Default placeholder image
  className = "",
  imageClass = "",
}) => {
  // Use the custom hook to validate the image
  const { isValid } = useImageValidation(src);

  // Determine the shape class
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-primary-100",
        shapeClass,
        "overflow-hidden",
        className,
      )}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      {isValid ? (
        <Image
          src={src!}
          alt={alt}
          width={size}
          height={size}
          style={{ minWidth: size + "px", minHeight: size + "px" }}
          className={cn("object-cover", shapeClass, imageClass)}
          onError={(e) => {
            // Handle image loading errors
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <Image
          src={placeholderSrc}
          alt="Placeholder Avatar"
          width={size}
          height={size}
          className={cn("object-cover", shapeClass, imageClass)}
        />
      )}
    </div>
  );
};

export default Avatar;
