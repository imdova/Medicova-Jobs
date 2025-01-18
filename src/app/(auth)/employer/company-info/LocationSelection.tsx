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
import { useEffect, useState } from "react";

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
    countries: {
      data: countries,
      loading: countriesLoading,
      error: countriesError,
    },
    states: { data: states, loading: statesLoading, error: statesError },
  } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const handleFetchCountries = async () => {
    await dispatch(fetchCountries());
  };

  const handleFetchStates = async (countryCode: string) => {
    await dispatch(fetchStates(countryCode));
  };

  useEffect(() => {
    if (countries.length === 0) {
      handleFetchCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (data.countryCode) {
      handleFetchStates(data.countryCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.countryCode]);
  return (
    <div className="mb-8 flex flex-wrap gap-5 md:flex-nowrap">
      {/* Company Sector Selector */}
      <div className="flex flex-1 gap-5">
        <div className="min-w-[150px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            Country
          </InputLabel>
          <FormControl fullWidth>
            <Select
              className="w-full"
              displayEmpty
              MenuProps={{
                disableScrollLock: true,
                PaperProps: {
                  sx: { maxHeight: 300 },
                },
              }}
              renderValue={(selected?: string) => {
                const countryName = countries.find(
                  (c) => c.isoCode === selected,
                )?.name;
                if (!countryName) {
                  return <em className="text-gray-400">Select Country</em>;
                }
                return <span>{countryName}</span>;
              }}
              onChange={(e) => {
                setData({ ...data, countryCode: e.target.value });
              }}
              value={countries.length > 0 ? data.countryCode : ""}
            >
              <MenuItem value="" disabled>
                <em>Select Sector</em>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            {/* {Boolean(errors.typeId) && !sectorId && (
              <FormHelperText>sector is required</FormHelperText>
            )} */}
          </FormControl>
        </div>
        {/* Company Type Selector */}
        <div className="min-w-[150px] flex-1">
          <InputLabel className="mb-2 text-lg font-semibold text-main">
            states
          </InputLabel>
          <FormControl fullWidth>
            <Tooltip
              title={
                data.countryCode ? undefined : "Please select Country first"
              }
              placement="bottom"
            >
              <Select
                className="w-full"
                displayEmpty
                disabled={data.countryCode ? false : true}
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: { maxHeight: 300 },
                  },
                }}
                renderValue={(selected?: string) => {
                  const stateName = states.find(
                    (s) => s.isoCode === selected,
                  )?.name;
                  if (!stateName) {
                    return <em className="text-gray-400">Select State</em>;
                  }
                  return <span>{stateName}</span>;
                }}
                onChange={(e) => {
                  setData({ ...data, stateCode: e.target.value });
                }}
                value={states.length > 0 ? data.stateCode : ""}
              >
                <MenuItem value="" disabled>
                  <em>Select State</em>
                </MenuItem>
                {states.map((state) => (
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
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
