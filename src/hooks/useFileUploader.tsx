import { API_UPLOAD_FILE } from '@/api/general';
import { useState } from 'react';




const useFileUploader = (maxFileSize: number = 1 * 1024 * 1024) => { // Default max size: 1MB
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [uploadResults, setUploadResults] = useState<UploadResponse[]>([]);

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return `File type not supported: ${file.name}. Only JPEG, PNG, or PDF allowed.`;
    }

    // Check file size
    if (file.size > maxFileSize) {
      return `File too large: ${file.name}. Maximum size allowed is ${maxFileSize / 1024 / 1024}MB.`;
    }

    return null; // No error
  };

  const uploadFiles = async (files: File[]) => {
    const results: UploadResponse[] = [];

    for (const file of files) {
      const validationError = validateFile(file);
      if (validationError) {
        results.push({ error: validationError, fileName: file.name });
        continue; // Skip this file
      }

      setLoadingStates((prev) => ({ ...prev, [file.name]: true }));

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(API_UPLOAD_FILE, {
          method: "POST",
          headers: {
            accept: "*/*",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const data: UploadResponse = await response.json();
        results.push(data);
      } catch (error) {
        results.push({
          error: error instanceof Error ? error.message : "Unknown error occurred",
          fileName: file.name,
        });
      } finally {
        setLoadingStates((prev) => ({ ...prev, [file.name]: false }));
      }
    }

    setUploadResults(results);

    // Filter successful uploads and return their URLs
    const successfulUploads = results.filter(
      (result): result is UploadResponse => "fileUrl" in result,
    );

    return successfulUploads.map((result) => result.fileUrl);
  };

  return { uploadFiles, loadingStates, uploadResults };
};

export default useFileUploader;