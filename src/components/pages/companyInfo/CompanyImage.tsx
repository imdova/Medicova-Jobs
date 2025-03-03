import { TAGS } from "@/api";
import { API_UPDATE_COMPANY } from "@/api/employer";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import useFileUploader from "@/hooks/useFileUploader";
import useIsLeaving from "@/hooks/useIsLeaving";
import useUpdateApi from "@/hooks/useUpdateApi";
import { Company } from "@/types";
import { companyBanners } from "@/util/company/companyform";
import { Alert, Button, CircularProgress } from "@mui/material";
import clsx from "clsx";
import { CloudUpload, Info, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 1; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

interface CompanyImageProps {
  company: Company;
}

const CompanyImage: React.FC<CompanyImageProps> = ({ company }) => {
  const { uploadFiles, loadingStates, uploadResults } = useFileUploader();
  const { update } = useUpdateApi<Company>(handleSuccess);

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>(companyBanners(company));
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({ preventDefault: isDirty });

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setError(null);

      if (acceptedFiles.length === 0) {
        setError(`Unsupported file type. Only ${ACCEPTED_IMAGE_TYPES.join(", ")} allowed.`);
        return;
      }

      if (selectedFiles.length + acceptedFiles.length > 3) {
        setError("You can only upload up to 3 files.");
        return;
      }

      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file), uploaded: false })
      );

      setSelectedFiles((prev) => [...prev, ...filesWithPreview]);
    },
    accept: ACCEPTED_IMAGE_TYPES.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    multiple: true,
    maxFiles: 3,
  });

  // Handle file removal
  const handleRemoveFile = (fileToRemove: FileWithPreview) => {
    const newFiles = selectedFiles.filter((file) => file !== fileToRemove);
    const [banner1, banner2, banner3] = newFiles.filter((file) => file.uploaded).map((file) => file.preview);
    setSelectedFiles(newFiles);
    update(API_UPDATE_COMPANY, {
      body: { id: company.id, userName: company.username, banner1: banner1 || null, banner2: banner2 || null, banner3: banner3 || null },
    }, TAGS.company);
  };

  // Handle successful update
  function handleSuccess(updatedCompany: Company) {
    setSelectedFiles(companyBanners(updatedCompany));
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const filesToUpload = selectedFiles.filter((file) => !file.uploaded);
      const uploadedUrls = await uploadFiles(filesToUpload);

      if (uploadedUrls.length > 0) {
        const [banner1, banner2, banner3] = [
          ...selectedFiles.filter((file) => file.uploaded).map((file) => file.preview),
          ...uploadedUrls,
        ];
        await update(API_UPDATE_COMPANY, {
          body: { id: company.id, userName: company.username, banner1: banner1 || null, banner2: banner2 || null, banner3: banner3 || null },
        }, TAGS.company);
      }
    } catch (err) {
      setError("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Cleanup preview URLs
  useEffect(() => {
    if (selectedFiles.find(file => !file.uploaded)) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [selectedFiles]);

  return (
    <div className="h-full">
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <p className="mb-2 text-sm text-secondary">Share Moments of your company</p>
      {error && (
        <Alert severity="error" className="my-1">
          <p className="text-xs">{error}</p>
        </Alert>
      )}
      {selectedFiles.length > 0 ? (
        <div className="mt-4">
          <div className="mt-4 grid grid-cols-3 gap-4">
            {selectedFiles.map((file, index) => (
              <ImageItem
                key={index}
                file={file}
                index={index}
                handleRemoveFile={handleRemoveFile}
                loadingStates={loadingStates}
                uploadResults={uploadResults}
              />
            ))}
            {selectedFiles.length < 3 && (
              <div
                {...getRootProps()}
                className={clsx(
                  "relative col-span-1 flex justify-center items-center aspect-square cursor-pointer rounded-base border border-dashed p-4 transition-colors",
                  isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                )}
              >
                <CloudUpload className="mx-auto h-8 w-8 text-gray-400" />
                <input {...getInputProps()} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div
            {...getRootProps()}
            className={clsx(
              "cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors",
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
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
            {ACCEPTED_IMAGE_TYPES.join(", ")} (max {MAX_FILE_SIZE}MB, max 3 images)
          </p>
        </div>
      )}
      {isDirty && selectedFiles.length > 0 && <Button
        variant="contained"
        color="primary"
        startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUpload />}
        onClick={handleUpload}
        disabled={isUploading}
        className="mt-4"
      >
        {isUploading ? "Uploading" : "Upload"}
      </Button>}
    </div>
  );
};

export default CompanyImage;

interface ImageItemProps {
  file: FileWithPreview;
  index: number;
  handleRemoveFile: (file: FileWithPreview) => void;
  loadingStates: Record<string, boolean>;
  uploadResults: UploadResponse[];
}

const ImageItem: React.FC<ImageItemProps> = ({ file, index, handleRemoveFile, loadingStates, uploadResults }) => {
  const isLoading = loadingStates[file.name];
  const error = uploadResults.find((result) => "error" in result && result.fileName === file.name);

  return (
    <div className={`${index === 0 ? "col-span-3" : "col-span-1"} relative aspect-square`}>
      <div className="relative h-full w-full">
        <button
          type="button"
          onClick={() => handleRemoveFile(file)}
          className="absolute -right-2 -top-2 z-[1]  rounded-full bg-gray-300 p-1 hover:bg-red-300 hover:text-red-600"
        >
          <X className="h-3 w-3" />
        </button>
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {isLoading && (
            <div className="absolute inset-0  flex items-center justify-center bg-gray-200/50">
              <CircularProgress size={index === 0 ? 20 : 14} className="text-primary" />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50">
              <Info size={index === 0 ? 20 : 14} className="text-red-700" />
            </div>
          )}
          <Image
            src={file.preview}
            alt={file.name}
            width={index === 0 ? 300 : 70}
            height={index === 0 ? 300 : 70}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};