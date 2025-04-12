import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import { useEffect } from "react";

export const useLocationData = (selectedCountryCode?: string) => {
  const dispatch = useAppDispatch();
  const { countries, states } = useAppSelector((state) => state.location);

  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.data.length]);

  useEffect(() => {
    if (selectedCountryCode) {
      dispatch(fetchStates(selectedCountryCode));
    }
  }, [dispatch, selectedCountryCode]);

  return {
    countries: countries.data,
    states: selectedCountryCode ? states.data : [],
  };
};
