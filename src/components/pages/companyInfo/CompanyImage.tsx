import { DeleteOutline } from "@mui/icons-material";
import { Alert, IconButton } from "@mui/material";
import clsx from "clsx";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
  preview?: string;
}

const MAX_FILE_SIZE = 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const CompanyImage = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setError(null);

      // Check if files were provided
      if (acceptedFiles.length === 0) {
        setError(
          `This File Type is not supported. Please upload only: ${ACCEPTED_IMAGE_TYPES.map((type) => type.split("/")[1]).join(", ")}`,
        );
        return;
      }

      // Check total number of files
      if (selectedFiles.length + acceptedFiles.length > 3) {
        setError("You can only upload up to 3 files in total.");
        return;
      }

      // Check file size and type for each file
      for (const file of acceptedFiles) {
        // Size check
        if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
          setError(`File "${file.name}" exceeds the ${MAX_FILE_SIZE}MB limit`);
          return;
        }
      }

      // If all checks pass, process the files
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      setSelectedFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
    },
    accept: ACCEPTED_IMAGE_TYPES.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {},
    ),
    multiple: true,
    maxFiles: 3,
    noClick: false,
    noKeyboard: false,
  });

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove),
    );
  };

  //   const handleUpload = async () => {
  //     if (selectedFiles.length === 0) return;

  //     setIsUploading(true);
  //     setError(null);

  //     try {
  //       //   await onUpload(selectedFiles);
  //       setSelectedFiles([]);
  //     } catch (err) {
  //       setError("Failed to upload files. Please try again.");
  //     } finally {
  //       setIsUploading(false);
  //     }
  //   };

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [selectedFiles]);

  return (
    <div className="h-full">
      <p className="mb-2 text-sm text-secondary">
        Share Moments of your company
      </p>
      {error && (
        <Alert severity="error" className="my-1">
          <p className="text-xs">{error}</p>
        </Alert>
      )}
      {selectedFiles.length > 0 ? (
        <div className="mt-4">
          <div className="mt-4 grid grid-cols-3 gap-4">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className={`${index === 0 ? "col-span-3" : "col-span-1"} relative aspect-square`}
              >
                {file.type.startsWith("image/") ? (
                  <div className="relative h-full w-full">
                    <IconButton
                      onClick={() => handleRemoveFile(file)}
                      className="absolute -right-2 -top-2 z-20 bg-gray-300 p-1 hover:bg-red-300 hover:text-red-600"
                    >
                      <DeleteOutline className="h-5 w-5" />
                    </IconButton>
                    <Image
                      src={file.preview || ""}
                      alt={file.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg bg-gray-100">
                    <p className="text-sm text-gray-600">{file.name}</p>
                  </div>
                )}
              </div>
            ))}
            <div
              {...getRootProps()}
              className={clsx(
                "relative col-span-1 aspect-square cursor-pointer rounded-base border border-dashed p-4 transition-colors",
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
                selectedFiles.length >= 3 ? "hidden" : "",
              )}
            >
              <input {...getInputProps()} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            {...getRootProps()}
            className={clsx(
              "cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors",
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
            )}
          >
            <input {...getInputProps()} />
            <div className="py-8">
              <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-xs text-secondary">
                Drag & drop your images here, or click to select
              </p>
            </div>
          </div>
          <p className="mt-1 text-xs text-secondary">
            {ACCEPTED_IMAGE_TYPES.join(", ")} (max {MAX_FILE_SIZE}MB , max 3
            Images )
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyImage;
