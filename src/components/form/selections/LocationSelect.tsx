import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { useLocationData } from "@/hooks/useLocationData";
import { FieldConfig } from "@/types";
import { Path, PathValue, UseFormReturn } from "react-hook-form";

interface LocationItems {
  country: LocationItem | null;
  state: LocationItem | null;
  city: string | null;
}

interface LocationSectionProps<T extends Partial<LocationItems>> {
  formMethods: UseFormReturn<T>;
}

function LocationSelect<T extends Partial<LocationItems>>({
  formMethods,
}: LocationSectionProps<T>) {
  const { control, getValues, setValue, watch } = formMethods;
  const country = watch("country.code" as Path<T>) as string | null;

  const { countries, states } = useLocationData(country || "");

  const locationFields: FieldConfig<T>[] = [
    {
      name: "country.code" as Path<T>,
      type: "search-select",
      label: "Address",
      resetFields: ["state.code", "city"] as Path<T>[],
      textFieldProps: {
        placeholder: "Select your country (e.g., Egypt)",
      },
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value) =>
        setValue(
          "country.name" as Path<T>,
          (countries.find((c) => c.isoCode === value)?.name || "") as any,
        ),
    },
    {
      name: "state.code" as Path<T>,
      type: "search-select",
      label: "State/Province",
      dependsOn: "country.code" as Path<T>,
      textFieldProps: {
        placeholder: "Select your governorate (e.g., Cairo, Alexandria)",
      },
      onChange: (value) =>
        setValue(
          "state.name" as Path<T>,
          (states.find((s) => s.isoCode === value)?.name || "") as any,
        ),
      options: states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
    },
    {
      name: "city" as Path<T>,
      type: "text",
      label: "City",
      textFieldProps: {
        placeholder: "e.g., Cairo, Giza",
      },
      rules: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  const resetValues = (fieldNames: (string | number)[]) => {
    fieldNames.forEach((name) => {
      const field = locationFields.find((f) => f.name === name);
      if (field) {
        setValue(field.name, "" as PathValue<T, Path<T>>, {
          shouldDirty: true,
        });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="mt-1 grid grid-cols-12 gap-4">
        {locationFields.map((field) => {
          return (
            <div className="col-span-6 md:col-span-4" key={String(field.name)}>
              <FormField
                field={field}
                control={control}
                formValues={getValues()}
                dependsOnField={locationFields.find(
                  (f) => f.name === field.dependsOn,
                )}
                resetValues={resetValues}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationSelect;
