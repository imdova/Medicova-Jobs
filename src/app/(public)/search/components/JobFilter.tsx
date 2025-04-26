"use client";
import {
  API_GET_CATEGORIES,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES,
} from "@/api/admin";
import { API_GET_COUNTRIES } from "@/api/general";
import Filter from "@/components/Layout/filter/filter";
import useFetch from "@/hooks/useFetch";
import { Country, Industry } from "@/types";
import { SearchBreakdown } from "@/types/jobs";
import { breakdownToFilters } from "@/util/job/searchInJobs";

type Result = PaginatedResponse<Industry>;

interface JobSearchFilterProps {
  breakdown: SearchBreakdown;
}

const JobFilter: React.FC<JobSearchFilterProps> = ({ breakdown }) => {
  const { data: countries } = useFetch<Country[]>(API_GET_COUNTRIES);

  const { data: industries } = useFetch<Result>(API_GET_INDUSTRIES);
  const { data: categories } = useFetch<Result>(API_GET_CATEGORIES);
  const { data: specialities } = useFetch<Result>(API_GET_SPECIALITIES);

  const searchFilterSections = breakdownToFilters(breakdown, {
    industries: industries?.data,
    categories: categories?.data,
    countries,
    specialities: specialities?.data,
  });

  return <Filter sections={searchFilterSections} />;
};

export default JobFilter;
