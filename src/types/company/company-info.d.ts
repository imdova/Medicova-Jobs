interface FormErrors {
  email: string;
  phone: string;
  companyTypeId: string;
  name: string;
}

interface FileWithPreview extends File {
  preview: string;
  uploaded?: boolean;
}

interface UploadResponse {
  message?: string;
  fileId?: string;
  fileUrl?: string;
  error?: string;
  fileName?: string;
}
