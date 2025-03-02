import { Company } from "@/types";

export const companyBanners = (company: Company): FileWithPreview[] => {
  return (
    [company.banner1, company.banner2, company.banner3].filter(Boolean).map(
      (image) =>
        ({
          lastModified: 0,
          name: "",
          webkitRelativePath: "",
          size: 0,
          type: "image/",
          preview: image || "",
          uploaded: true,
        }) as FileWithPreview,
    ) || []
  );
};
