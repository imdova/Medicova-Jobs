import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import { FieldConfig } from "@/types";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface LocationSectionProps {
  formMethods: UseFormReturn<Partial<UserProfile>>;
}
const LocationSelect: React.FC<LocationSectionProps> = ({ formMethods }) => {
  const { control, getValues, setValue, watch } = formMethods;
  const country = watch("country");

  const { countries, states } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (country?.code) {
      dispatch(fetchStates(country?.code));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country?.code]);

  const locationFields: FieldConfig<UserProfile>[] = [
    {
      name: "country.code",
      type: "search-select",
      label: "Country",
      resetFields: ["state.code", "city"],
      textFieldProps: {
        placeholder: "Select country",
      },
      options: countries.data.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value) =>
        setValue(
          "country.name",
          countries.data.find((country) => country.isoCode === value)?.name ||
            "",
        ),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "state.code",
      type: "search-select",
      label: "State",
      dependsOn: "country.code",
      textFieldProps: {
        placeholder: "Select state",
      },
      onChange: (value) =>
        setValue(
          "state.name",
          states.data.find((state) => state.isoCode === value)?.name || "",
        ),
      options: states.data.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      textFieldProps: {
        placeholder: "Enter City",
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
        const defaultValue = field.type === "checkbox" ? false : "";
        setValue(field.name, defaultValue, { shouldDirty: true });
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
              // hidden={hiddenFields.includes(String(field.name))}
              // onCheckboxChange={onCheckboxChange(field)}
              dependsOnField={locationFields.find(
                (f) => f.name === field.dependsOn,
              )}
              // removeField={removeField}
              resetValues={resetValues}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LocationSelect;
