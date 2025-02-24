interface FormErrors {
  email: string;
  phone: string;
  companyTypeId: string;
  name: string;
}

interface FileWithPreview extends File {
  preview?: string;
  uploaded?: boolean;
}
