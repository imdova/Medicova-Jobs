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
    gridProps: { xs: 6 },
  },
  {
    label: "Last Name*",
    name: "lastName",
    type: "text",
    required: true,
    rules: {
      minLength: { value: 2, message: "Last Name must be larger than 2 word" },
    },
    gridProps: { xs: 6 },
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
    <div className="rounded-base rounded-t-base shadow-soft flex w-full flex-col items-center gap-8 overflow-hidden border border-gray-200 bg-white p-5 lg:flex-row lg:items-start">
      <div>
        <ProfileImage
          currentImageUrl={avatar || ""}
          alt={" user image"}
          size="large"
          onImageUpdate={updateImage}
          imageClassName="border-4 border-white shadow-md"
        />
      </div>
      <div className="w-full">
        <Grid className="grid grid-cols-12 gap-4">
          {fields.map((field) => {
            const gridProps = field.gridProps ?? {};
            const xs = gridProps.xs ?? 12;
            const sm = gridProps.sm ?? xs;
            const md = gridProps.md ?? sm;
            const classNames = [
              `col-span-${xs}`,
              sm !== xs ? `sm:col-span-${sm}` : "",
              md !== sm ? `md:col-span-${md}` : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div className={classNames} key={String(field.name)}>
                <FormField
                  field={field}
                  control={control}
                  formValues={getValues()}
                />
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default HeaderSection;
