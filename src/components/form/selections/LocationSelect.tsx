import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { useLocationData } from "@/hooks/useLocationData";
import { Country, FieldConfig, State } from "@/types";
import { Grid } from "@mui/material";
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
  const country = getValues(
    "country" as Path<T>,
  ) as unknown as LocationItem | null;
  const { countries, states } = useLocationData(country?.code);

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
      gridProps: { xs: 6, md: 4 },
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
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "city" as Path<T>,
      type: "text",
      label: "City",
      textFieldProps: {
        placeholder: "e.g., Cairo, Giza",
      },
      gridProps: { xs: 12, md: 4 },
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
      <Grid container spacing={1}>
        {locationFields.map((field) => (
          <Grid
            item
            xs={field.gridProps?.xs ?? 12}
            sm={field.gridProps?.sm}
            md={field.gridProps?.md}
            key={String(field.name)}
          >
            <FormField
              field={field}
              control={control}
              formValues={getValues()}
              dependsOnField={locationFields.find(
                (f) => f.name === field.dependsOn,
              )}
              resetValues={resetValues}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default LocationSelect;
