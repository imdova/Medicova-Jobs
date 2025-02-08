import React, { useState } from "react";
import Image from "next/image";
import { Menu, MenuItem } from "@mui/material";
import clsx from "clsx";
import { FileUploadModal } from "../form/FileUploadModal";
import { DeleteOutline, PhotoCamera } from "@mui/icons-material";

interface AvatarProps {
  currentImageUrl?: string;
  size?: "small" | "medium" | "large" | "xLarge";
  onImageUpdate: (file: File) => Promise<void>;
  onImageRemove?: () => Promise<void>;
  maxFileSizeMB?: number;
  // Style props
  className?: string;
  imageClassName?: string;
  // Custom styling
  avatarStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  // Labels
  uploadModalTitle?: string;
  uploadButtonText?: string;
  removeButtonText?: string;
}

// constants.ts
const SIZE_MAP = {
  small: { width: 32, height: 32 },
  medium: { width: 48, height: 48 },
  large: { width: 64, height: 64 },
  xLarge: { width: 96, height: 96 },
} as const;

const DEFAULT_IMAGE = "/images/placeholder-avatar.svg";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Avatar.tsx

export const Avatar: React.FC<AvatarProps> = ({
  currentImageUrl,
  size = "medium",
  onImageUpdate,
  onImageRemove,
  maxFileSizeMB = 5,
  // Style props
  className,
  imageClassName,
  // Custom styling
  avatarStyle,
  imageStyle,
  // Labels
  uploadModalTitle = "Update Profile Picture",
  uploadButtonText = "Upload",
  removeButtonText = "Remove",
}) => {
  // State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUploadClick = () => {
    handleMenuClose();
    setIsUploadModalOpen(true);
  };

  const handleRemoveClick = async () => {
    handleMenuClose();
    if (onImageRemove) {
      await onImageRemove();
    }
  };

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    await onImageUpdate(file);
  };

  return (
    <div className="relative inline-block">
      {/* Avatar Image */}
      <div
        className={clsx(
          "group relative overflow-hidden rounded-full",
          className,
        )}
        style={avatarStyle}
      >
        <Image
          src={currentImageUrl || DEFAULT_IMAGE}
          alt="Profile picture"
          width={SIZE_MAP[size].width}
          height={SIZE_MAP[size].height}
          className={clsx("object-cover", imageClassName)}
          style={imageStyle}
        />

        {/* Overlay with camera icon */}
        <button
          onClick={handleMenuOpen}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Update profile picture"
        >
          <PhotoCamera className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleUploadClick}>
          <PhotoCamera className="mr-2 h-4 w-4" />
          Update Photo
        </MenuItem>
        {onImageRemove && currentImageUrl && (
          <MenuItem onClick={handleRemoveClick} className="text-red-600">
            <DeleteOutline className="mr-2 h-4 w-4" />
            Remove Photo
          </MenuItem>
        )}
      </Menu>

      {/* Upload Modal */}
      <FileUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        title={uploadModalTitle}
        uploadButtonText={uploadButtonText}
        maxFileSizeMB={maxFileSizeMB}
        acceptedFileTypes={ACCEPTED_IMAGE_TYPES}
        previewType="image"
        description="Choose a new profile picture. Supported formats: JPG, PNG, GIF"
      />
    </div>
  );
};

export default Avatar;
