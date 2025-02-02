import Flag from "@/components/UI/flagitem";
import SearchableSelect from "@/components/UI/SearchableSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import { Company } from "@/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect } from "react";

interface LocationSelectionProps {
  data: Company;
  setData: React.Dispatch<React.SetStateAction<Company>>;
  errors: { [key: string]: string };
}

const LocationSelection = ({
  data,
  setData,
  errors,
}: LocationSelectionProps) => {
  const {
    countries: { data: countries },
    states: { data: states },
  } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (data.country) {
      const countryCode = countries.find(
        (c) => c.isoCode === data.country?.code,
      )?.isoCode;
      if (countryCode) {
        dispatch(fetchStates(countryCode));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.country]);
  return (
    <div className="mb-8 flex flex-wrap gap-5 md:flex-nowrap">
      {/* Company Sector Selector */}
      <div className="flex flex-1 gap-5">
        <div className="min-w-[150px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Country
          </InputLabel>
          <FormControl fullWidth>
            <SearchableSelect
              options={countries.map((x) => ({
                value: x.name,
                label: x.name,
              }))}
              className="w-full"
              displayEmpty
              renderValue={(selected?: string) => {
                const item = countries.find((x) => x.name === selected);
                if (!item) {
                  return <em className="text-gray-400">Select Country</em>;
                }
                return (
                  <div className="flex items-center">
                    <Flag code={item.isoCode.toLowerCase()} name={item.name} />
                    <p className="ml-2 min-w-12">{selected}</p>
                  </div>
                );
              }}
              onChange={(e) => {
                const country = countries.find(
                  (c) => c.name === e.target.value,
                );
                setData({
                  ...data,
                  country: {
                    name: e.target.value || "",
                    code: country?.isoCode || "",
                  },
                });
              }}
              value={
                countries && countries.length > 0
                  ? data.country?.name || ""
                  : ""
              }
            />
          </FormControl>
        </div>
        {/* Company Type Selector */}
        <div className="min-w-[150px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            states
          </InputLabel>
          <FormControl fullWidth>
            <Tooltip
              title={data.country ? undefined : "Please select Country first"}
              placement="bottom"
            >
              <SearchableSelect
                options={states.map((x) => ({
                  value: x.name,
                  label: x.name,
                }))}
                className="w-full"
                displayEmpty
                disabled={data.country ? false : true}
                renderValue={(selected?: string) => {
                  if (!selected) {
                    return <em className="text-gray-400">Select State</em>;
                  }
                  return <span>{selected}</span>;
                }}
                onChange={(e) => {
                  const state = states.find((s) => s.name === e.target.value);
                  setData({
                    ...data,
                    state: {
                      name: e.target.value || "",
                      code: state?.isoCode || "",
                    },
                  });
                }}
                value={states.length > 0 ? (data.state?.name ?? "") : ""}
              />
            </Tooltip>
          </FormControl>
        </div>
      </div>
      <div className="min-w-[250px] flex-1">
        <InputLabel className="mb-2 text-lg font-semibold text-main">
          City
        </InputLabel>
        <TextField
          className="w-full"
          placeholder="Enter City"
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
        />
      </div>
    </div>
  );
};

export default LocationSelection;
