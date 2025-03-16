import SearchableSelect from "@/components/UI/SearchableSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import { JobData } from "@/types";
import { FormControl, TextField } from "@mui/material";
import { useEffect } from "react";
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface LocationSelectionProps {
    control: Control<JobData, any>
    watch: UseFormWatch<JobData>;
    setValue: UseFormSetValue<JobData>
}

const JobLocationSelection: React.FC<LocationSelectionProps> = ({ control, watch, setValue }) => {
    const countryCode = watch("country.code");
    const { countries, states } = useAppSelector((state) => state.location);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (countries.data.length === 0) {
            dispatch(fetchCountries());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (countryCode) {
            dispatch(fetchStates(countryCode));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countryCode]);
    return (
        <div className="flex min-w-[300px] flex-1 flex-wrap gap-2 md:flex-nowrap">
            <div className="min-w-[150px] flex-1">
                <label className="mb-2 text-lg font-semibold text-main">
                    Job Location *
                </label>
                <Controller
                    name="country.name"
                    control={control}
                    rules={{ required: "country is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <FormControl error={Boolean(error)} fullWidth>
                            <SearchableSelect
                                options={countries.data.map((x) => ({
                                    value: x.name,
                                    label: x.name,
                                }))}
                                {...field}
                                onChange={(e) => {
                                    const country = countries.data.find(
                                        (country) => country.name === e.target.value,
                                    );
                                    field.onChange(e.target.value);
                                    setValue("country.code", country?.isoCode || "");
                                }}
                                displayEmpty
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return (
                                            <span className="text-gray-400">
                                                Job Location
                                            </span>
                                        );
                                    }
                                    return selected;
                                }}
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.message}
                                </p>
                            )}
                        </FormControl>
                    )}
                />
            </div>
            <div className="min-w-[150px] flex-1">
                <label className="mb-2 text-lg font-semibold text-main">
                    City/Area *
                </label>
                <Controller
                    name="city"
                    control={control}
                    rules={{ required: "city is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            className="w-full"
                            name="city"
                            placeholder="Enter The Job City / Area"
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default JobLocationSelection