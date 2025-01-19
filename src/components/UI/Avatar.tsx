import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Modal,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  styled,
} from "@mui/material";
import Image from "next/image";
import clsx from "clsx";
import { CloudUpload, Delete } from "@mui/icons-material";

// Types
interface AvatarProps extends React.HTMLAttributes<HTMLButtonElement> {
  currentImageUrl?: string;
  size?: "small" | "medium" | "large";
  onImageUpdate: (file: File) => Promise<void>;
  onImageRemove: () => Promise<void>;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
  // Style props
  className?: string;
  containerClassName?: string;
  modalClassName?: string;
  dropzoneClassName?: string;
  imageClassName?: string;
  buttonClassName?: string;
  // Custom styling
  avatarStyle?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
  dropzoneStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  // Modal customization
  modalTitle?: string;
  uploadButtonText?: string;
  cancelButtonText?: string;
  removeButtonText?: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

// Size mappings
const sizeMap = {
  small: { width: 32, height: 32 },
  medium: { width: 48, height: 48 },
  large: { width: 64, height: 64 },
};

// Styled components
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Avatar: React.FC<AvatarProps> = ({
  currentImageUrl,
  size = "medium",
  onImageUpdate,
  onImageRemove,
  maxFileSizeMB = 5,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif"],
  // Style props
  className,
  containerClassName,
  modalClassName,
  dropzoneClassName,
  imageClassName,
  buttonClassName,
  // Custom styling
  avatarStyle,
  modalStyle,
  dropzoneStyle,
  imageStyle,
  // Modal customization
  modalTitle = "Update Profile Picture",
  uploadButtonText = "Upload",
  cancelButtonText = "Cancel",
  removeButtonText = "Remove",
  // Rest props
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultImage = "/images/placeholder-avatar.svg";

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const file = acceptedFiles[0];

      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setError(`File size must be less than ${maxFileSizeMB}MB`);
        return;
      }

      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedFile(file as FileWithPreview);
    },
    [maxFileSizeMB],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {},
    ),
    maxFiles: 1,
  });

  React.useEffect(() => {
    return () => {
      if (selectedFile?.preview) {
        URL.revokeObjectURL(selectedFile.preview);
      }
    };
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      await onImageUpdate(selectedFile);
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setIsUploading(true);
    setError(null);

    try {
      await onImageRemove();
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (err) {
      setError("Failed to remove image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={clsx("block", containerClassName)}>
      <button
        onClick={() => setIsModalOpen(true)}
        className={clsx(
          "relative overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          className,
        )}
        style={avatarStyle}
        aria-label="Update profile picture"
        {...props}
      >
        <Image
          src={currentImageUrl || defaultImage}
          alt="Profile picture"
          width={sizeMap[size].width}
          height={sizeMap[size].height}
          className={clsx("object-cover", imageClassName)}
          style={imageStyle}
        />
      </button>

      <StyledModal
        open={isModalOpen}
        onClose={() => !isUploading && setIsModalOpen(false)}
        aria-labelledby="upload-avatar-modal"
        className={modalClassName}
        style={modalStyle}
      >
        <Box
          className={clsx(
            "mx-4 w-full max-w-[600px] max-h-[80vh] rounded-lg bg-white p-6",
            modalClassName,
          )}
        >
          <Typography variant="h6" component="h2" className="mb-4">
            {modalTitle}
          </Typography>

          <div
            {...getRootProps()}
            className={clsx(
              "cursor-pointer rounded-lg border-2 border-dashed p-4 text-center max-h-full transition-colors",
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
              error ? "border-red-500" : "",
              dropzoneClassName,
            )}
            style={dropzoneStyle}
          >
            <input {...getInputProps()} />
            {selectedFile?.preview ? (
              <Image
                src={selectedFile.preview}
                alt="Preview"
                width={200}
                height={200}
                className={clsx(
                  "mx-auto rounded-lg object-cover max-h-[200px] max-w-[200px]",
                  imageClassName,
                )}
                style={imageStyle}
              />
            ) : (
              <div className="py-8">
                <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                <Typography className="mt-2">
                  Drag & drop an image here, or click to select
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mt-1"
                >
                  Supported formats: JPG, PNG, GIF (max {maxFileSizeMB}MB)
                </Typography>
              </div>
            )}
          </div>

          {error && (
            <Alert severity="error" className="mt-3">
              {error}
            </Alert>
          )}

          <div className="mt-4 flex justify-between gap-2">
            <Button
              variant="text"
              color="error"
              onClick={handleRemove}
              disabled={isUploading || !currentImageUrl}
              startIcon={<Delete />}
              className={buttonClassName}
            >
              {removeButtonText}
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                disabled={isUploading}
                className={buttonClassName}
              >
                {cancelButtonText}
              </Button>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={buttonClassName}
              >
                {isUploading ? (
                  <>
                    <CircularProgress size={16} className="mr-2" />
                    Uploading...
                  </>
                ) : (
                  uploadButtonText
                )}
              </Button>
            </div>
          </div>
        </Box>
      </StyledModal>
    </div>
  );
};

export default Avatar;
