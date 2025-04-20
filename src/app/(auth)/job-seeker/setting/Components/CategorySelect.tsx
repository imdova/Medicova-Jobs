import {
  API_GET_CAREER_LEVELS_BY_CATEGORY,
  API_GET_CATEGORIES,
  API_GET_SPECIALITIES_BY_CATEGORY,
} from "@/api/admin";
import { FormField } from "@/components/form/FormModal/FormField/FormField";
import useFetch from "@/hooks/useFetch";
import { FieldConfig, Industry } from "@/types";
import { UseFormReturn } from "react-hook-form";

interface LocationSectionProps {
  formMethods: UseFormReturn<Partial<UserProfile>>;
}
const CategorySelect: React.FC<LocationSectionProps> = ({ formMethods }) => {
  const { control, getValues, setValue, watch } = formMethods;
  const categoryId = watch("categoryId");

  const { data: categoriesData } =
    useFetch<PaginatedResponse<Industry>>(API_GET_CATEGORIES);
  const { data: specialitiesData } = useFetch<PaginatedResponse<Industry>>(
    categoryId ? API_GET_SPECIALITIES_BY_CATEGORY + categoryId : null,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );
  const { data: careerLevelData } = useFetch<PaginatedResponse<Industry>>(
    categoryId
      ? `${API_GET_CAREER_LEVELS_BY_CATEGORY}?ids=${categoryId}`
      : null,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );

  const categories = categoriesData?.data || [];
  const specialities = specialitiesData?.data || [];
  const careerLevels = careerLevelData?.data || [];

  const resetValues = (fieldNames: (string | number)[]) => {
    fieldNames.forEach((name) => {
      setValue(name as FieldConfig<UserProfile>["name"], "", {
        shouldDirty: true,
      });
    });
  };
  return (
    <div className="w-full space-y-4">
      <div className="md:w-1/2">
        <FormField
          field={{
            name: "categoryId",
            type: "select",
            label: "Category*",
            resetFields: ["specialityId", "careerLevelId"],
            options: categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
            gridProps: { xs: 7 },
          }}
          control={control}
          formValues={getValues()}
          resetValues={resetValues}
        />
      </div>
      <div className="flex w-full gap-4">
        <div className="md:w-1/2">
          <FormField
            field={{
              name: "specialityId",
              type: "select",
              dependsOn: "categoryId",
              label: "Specialty*",
              options: specialities.map((speciality) => ({
                value: speciality.id,
                label: speciality.name,
              })),
              gridProps: { xs: 6 },
            }}
            dependsOnField={
              {
                name: "categoryId",
                label: "Category*",
              } as FieldConfig
            }
            control={control}
            formValues={getValues()}
            resetValues={resetValues}
          />
        </div>
        <div className="md:w-1/2">
          <FormField
            field={{
              name: "careerLevelId",
              type: "select",
              dependsOn: "categoryId",
              label: "Career Level*",
              options: careerLevels.map((careerLevel) => ({
                value: careerLevel.id,
                label: careerLevel.name,
              })),
              gridProps: { xs: 6 },
            }}
            dependsOnField={
              {
                name: "categoryId",
                label: "Category*",
              } as FieldConfig
            }
            control={control}
            formValues={getValues()}
            resetValues={resetValues}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;
