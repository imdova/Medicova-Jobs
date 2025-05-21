"use client";
import { FieldConfig } from "@/types";
import { Grid } from "@mui/material";
import { FormField } from "@/components/form/FormModal/FormField/FormField";

import uploadFiles from "@/lib/files/imageUploader";
import { UseFormReturn } from "react-hook-form";
import ProfileImage from "@/components/UI/ProfileImage";
const fields: FieldConfig<UserProfile>[] = [
  {
    label: "First Name*",
    name: "firstName",
    type: "text",
    required: true,
    rules: {
      minLength: { value: 2, message: "First Name must be larger than 2 word" },
    },
    gridProps: { xs: 12, sm: 6, md: 3 },
  },
  {
    label: "Last Name*",
    name: "lastName",
    type: "text",
    required: true,
    rules: {
      minLength: { value: 2, message: "Last Name must be larger than 2 word" },
    },
    gridProps: { xs: 12, sm: 6, md: 3 },
  },
];

interface HeaderSectionProps {
  formMethods: UseFormReturn<Partial<UserProfile>>;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ formMethods }) => {
  const { control, getValues, setValue, watch } = formMethods;
  const avatar = watch("avatar");

  const updateImage = async (file: File) => {
    const [avatar] = await uploadFiles([file]);
    setValue("avatar", avatar, { shouldDirty: true });
  };

  return (
    <div className="flex w-full flex-col items-center gap-8 overflow-hidden rounded-base rounded-t-base border border-gray-200 bg-white p-5 shadow-soft lg:flex-row lg:items-start">
      <div>
        <ProfileImage
          currentImageUrl={avatar || ""}
          alt={" user image"}
          size="large"
          onImageUpdate={updateImage}
          imageClassName="border-4 border-white shadow-md"
        />
      </div>
      <div className="flex w-full gap-3">
        <div className="flex-1">
          <FormField
            field={{
              label: "First Name*",
              name: "firstName",
              type: "text",
              required: true,
              rules: {
                minLength: {
                  value: 2,
                  message: "First Name must be larger than 2 word",
                },
              },
            }}
            control={control}
            formValues={getValues()}
          />
        </div>
        <div className="flex-1">
          <FormField
            field={{
              label: "Last Name*",
              name: "lastName",
              type: "text",
              required: true,
              rules: {
                minLength: {
                  value: 2,
                  message: "Last Name must be larger than 2 word",
                },
              },
            }}
            control={control}
            formValues={getValues()}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
