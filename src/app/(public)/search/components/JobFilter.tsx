"use client";
import {
  API_GET_CATEGORIES,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES,
} from "@/api/admin";
import { API_GET_COUNTRIES, API_GET_STATES } from "@/api/general";
import Filter from "@/components/Layout/filter/filter";
import { searchJopFilters } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { Country, Industry, State } from "@/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Result = PaginatedResponse<Industry>;

const InJobFilter = () => {
  const searchParams = useSearchParams();
  const selectedCountries = searchParams.get("country")?.split(",") || [];
  // state
  const { data: countries } = useFetch<Country[]>(API_GET_COUNTRIES);
  const { data: states } = useFetch<State[]>(
    selectedCountries &&
      `${API_GET_STATES}?countryCode=${selectedCountries.join(",")}`,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );
  const { data: industries } = useFetch<Result>(API_GET_INDUSTRIES);
  const { data: categories } = useFetch<Result>(API_GET_CATEGORIES);
  const { data: specialities } = useFetch<Result>(API_GET_SPECIALITIES);

  const countriesFilter: FilterType[] = countries
    ? [
        {
          name: "Country",
          multiple: true,
          searchable: true,
          sectionKey: "country",
          maxItems: 5,
          items: countries.map((country) => ({
            label: country.name,
            value: country.isoCode,
          })),
        },
      ]
    : [];
  const statesFilter: FilterType[] = states
    ? [
        {
          name: "State",
          multiple: true,
          searchable: true,
          sectionKey: "state",
          maxItems: 5,
          items: states.map((state) => ({
            label: state.name,
            value: state.isoCode,
          })),
        },
      ]
    : [];

  const industriesFilter: FilterType[] = industries?.data
    ? [
        {
          name: "Industry",
          multiple: true,
          sectionKey: "ind",
          resetSections: ["ctg"],
          items: industries?.data.map((industry) => ({
            label: industry.name,
            value: industry.id,
          })),
        },
      ]
    : [];
  const categoriesFilter: FilterType[] = categories?.data
    ? [
        {
          name: "Categories",
          multiple: true,
          searchable: true,
          sectionKey: "ctg",
          maxItems: 5,
          items: categories?.data.map((category) => ({
            label: category.name,
            value: category.id,
          })),
        },
      ]
    : [];
  const specialitiesFilter: FilterType[] = specialities?.data
    ? [
        {
          name: "Main Specialty",
          multiple: true,
          sectionKey: "sp",
          items: specialities?.data.map((speciality) => ({
            label: speciality.name,
            value: speciality.id,
          })),
        },
      ]
    : [];

  const filterArray: FilterType[] = [
    ...countriesFilter,
    ...statesFilter,
    ...industriesFilter,
    ...categoriesFilter,
    ...specialitiesFilter,
    ...searchJopFilters,
  ];

  return <Filter sections={filterArray} />;
};

const JobFilter = () => {
  return (
    <Suspense>
      <InJobFilter />
    </Suspense>
  );
};

export default JobFilter;
