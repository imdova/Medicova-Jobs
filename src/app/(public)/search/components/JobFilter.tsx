"use client";
import {
  API_GET_CAREER_LEVELS,
  API_GET_CATEGORIES,
  API_GET_EMPLOYMENT_TYPES,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES,
} from "@/api/admin";
import { API_GET_COUNTRIES } from "@/api/general";
import Filter from "@/components/Layout/filter/filter";
import { gendersOptions } from "@/constants";
import { educationOptions, jobWorkPlaceOptions } from "@/constants/job";
import useFetch from "@/hooks/useFetch";
import { useLocationData } from "@/hooks/useLocationData";
import { Country, Industry } from "@/types";
import { SearchBreakdown } from "@/types/jobs";
import { breakdownToFilters } from "@/util/job/searchInJobs";

type Result = PaginatedResponse<Industry>;

interface JobSearchFilterProps {
  breakdown: SearchBreakdown;
}

const JobFilter: React.FC<{ data: JobsAggregations }> = ({ data }) => {
  const { countries, states } = useLocationData();
  const { data: industries } = useFetch<Result>(API_GET_INDUSTRIES);
  const { data: categories } = useFetch<Result>(API_GET_CATEGORIES);
  const { data: specialities } = useFetch<Result>(API_GET_SPECIALITIES);
  const { data: careerLevels } = useFetch<Result>(API_GET_CAREER_LEVELS);
  const { data: employmentTypes } = useFetch<Result>(API_GET_EMPLOYMENT_TYPES);

  const filters: FilterType[] = [];

  if (data.country?.length) {
    filters.push({
      name: "Country",
      multiple: true,
      searchable: true,
      sectionKey: "country",
      items: data.country.map((item) => ({
        label:
          countries?.find((x) => x.isoCode === item.code)?.name || item.code, // You can map code to real country names if needed
        count: item.count,
        value: item.code,
      })),
    });
  }

  if (data.state?.length) {
    filters.push({
      name: "State",
      multiple: true,
      searchable: true,
      sectionKey: "state",
      items: data.state.map((item) => ({
        label: states?.find((x) => x.isoCode === item.code)?.name || item.code,
        count: item.count,
        value: item.code,
      })),
    });
  }

  if (data.industry?.length) {
    filters.push({
      name: "Industry",
      multiple: true,
      sectionKey: "ind",
      items: data.industry.map((item) => ({
        label:
          industries?.data.find((x) => x.id === item.id)?.name ||
          item.id.slice(0, 5), // same, ideally you map the id to real category name
        count: item.count,
        value: item.id,
      })),
    });
  }
  if (data.category?.length) {
    filters.push({
      name: "Category",
      multiple: true,
      sectionKey: "ctg",
      items: data.category.map((item) => ({
        label:
          categories?.data.find((x) => x.id === item.id)?.name ||
          item.id.slice(0, 5), // same, ideally you map the id to real category name
        count: item.count,
        value: item.id,
      })),
    });
  }

  if (data.speciality?.length) {
    filters.push({
      name: "Main Speciality",
      // multiple: true,
      sectionKey: "sp",
      items: data.speciality.map((item) => ({
        label:
          specialities?.data.find((x) => x.id === item.id)?.name ||
          item.id.slice(0, 5),
        count: item.count,
        value: item.id,
      })),
    });
  }

  if (data.careerLevel?.length) {
    filters.push({
      name: "Career Level",
      multiple: true,
      sectionKey: "clv",
      items: data.careerLevel.map((item) => ({
        label:
          careerLevels?.data.find((x) => x.id === item.id)?.name ||
          item.id.slice(0, 5), // same, ideally replace id with readable career level name
        count: item.count,
        value: item.id,
      })),
    });
  }
  if (data.employmentType?.length) {
    filters.push({
      name: "Career Level",
      multiple: true,
      sectionKey: "clv",
      items: data.employmentType.map((item) => ({
        label:
          employmentTypes?.data.find((x) => x.id === item.id)?.name ||
          item.id.slice(0, 5), // same, ideally replace id with readable career level name
        count: item.count,
        value: item.id,
      })),
    });
  }

  if (data.educationLevel?.length) {
    filters.push({
      name: "Education Level",
      multiple: true,
      sectionKey: "edu",
      items: data.educationLevel.map((item) => ({
        label:
          educationOptions.find((x) => x.id === item.name)?.label || item.name,
        count: item.count,
        value: item.name,
      })),
    });
  }
  if (data.workPlace?.length) {
    filters.push({
      name: "work Place",
      multiple: true,
      sectionKey: "wp",
      items: data.workPlace.map((item) => ({
        label:
          jobWorkPlaceOptions.find((x) => x.id === item.name)?.label ||
          item.name,
        count: item.count,
        value: item.name,
      })),
    });
  }

  if (data.gender?.length) {
    filters.push({
      name: "Gender",
      multiple: true,
      sectionKey: "gen",
      items: data.gender.map((item) => ({
        label:
          gendersOptions?.find((x) => x.value === item.name)?.label ||
          item.name,
        count: item.count,
        value: item.name,
      })),
    });
  }

  if (data.salaryRange?.length) {
    filters.push({
      name: "Salary Rang",
      sectionKey: "sal",
      items: data.salaryRange.map((item) => ({
        label: `${item.from}-${item.to}`,
        count: item.count,
        value: `${item.from}-${item.to}`,
      })),
    });
  }

  if (data.ageRange?.length) {
    filters.push({
      name: "Age",
      sectionKey: "age",
      items: data.ageRange.map((item) => ({
        label: `${item.from}-${item.to}`,
        count: item.count,
        value: `${item.from}-${item.to}`,
      })),
    });
  }
  return <Filter sections={filters} />;
};

export default JobFilter;
