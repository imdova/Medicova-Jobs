"use client";
import {
  API_GET_CAREER_LEVELS,
  API_GET_CATEGORIES,
  API_GET_EMPLOYMENT_TYPES,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES,
} from "@/api/admin";
import { API_FILTER_SEARCH_JOBS } from "@/api/employer";
import Filter from "@/components/Layout/filter/filter";
import Flag from "@/components/UI/flagitem";
import { gendersOptions } from "@/constants";
import { educationOptions, jobWorkPlaceOptions } from "@/constants/job";
import useFetch from "@/hooks/useFetch";
import { useLocationData } from "@/hooks/useLocationData";
import { Industry } from "@/types";
import { mergeData } from "@/util/general";

type Result = PaginatedResponse<Industry>;

const initialCountries: JobsAggregations["country"] = [
  { code: "SA", count: 0, name: "Saudi Arabia" },
  { code: "EG", count: 0, name: "Egypt" },
  { code: "AE", count: 0, name: "United Arab Emirates" },
  { code: "MA", count: 0, name: "Morocco" },
  { code: "DZ", count: 0, name: "Algeria" },
  { code: "IQ", count: 0, name: "Iraq" },
  { code: "JO", count: 0, name: "Jordan" },
  { code: "KW", count: 0, name: "Kuwait" },
  { code: "QA", count: 0, name: "Qatar" },
  { code: "LB", count: 0, name: "Lebanon" },
];

const JobFilter: React.FC<{ data: JobsAggregations }> = ({ data }) => {
  const { countries, states } = useLocationData();
  const { data: industries } = useFetch<Result>(API_GET_INDUSTRIES);
  const { data: categories } = useFetch<Result>(API_GET_CATEGORIES);
  const { data: specialities } = useFetch<Result>(API_GET_SPECIALITIES);
  const { data: careerLevels } = useFetch<Result>(API_GET_CAREER_LEVELS);
  const { data: employmentTypes } = useFetch<Result>(API_GET_EMPLOYMENT_TYPES);

  const filters: FilterType[] = [];
  data.country = mergeData(data.country, initialCountries, "code");
  if (data.country?.length) {
    filters.push({
      name: "Country",
      multiple: true,
      searchable: true,
      sectionKey: "country",
      maxItems: 8,
      items: data.country.map((item) => ({
        label:
          countries?.find((x) => x.isoCode === item.code)?.name ||
          item.name ||
          item.code, // You can map code to real country names if needed
        // icon: (
        //   <Flag code={item.code.toLocaleLowerCase()} name={item.name || ""} />
        // ),
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

  const initialIndustry = industries?.data.map((x) => ({
    id: x.id,
    name: x.name,
    count: 0,
  }));

  data.industry = mergeData(data.industry, initialIndustry, "id");
  if (data.industry?.length) {
    filters.push({
      name: "Industry",
      multiple: true,
      sectionKey: "ind",
      items: data.industry.map((item) => ({
        label:
          industries?.data.find((x) => x.id === item.id)?.name ||
          item.name ||
          item.id.slice(0, 5), // same, ideally you map the id to real category name
        count: item.count,
        value: item.id,
      })),
    });
  }

  const initialCategories = categories?.data.map((x) => ({
    id: x.id,
    name: x.name,
    count: 0,
  }));
  data.category = mergeData(data.category, initialCategories, "id");
  if (data.category?.length) {
    filters.push({
      name: "Category",
      searchable: true,
      multiple: true,
      maxItems: 8,
      sectionKey: "ctg",
      items: data.category.map((item) => ({
        label:
          categories?.data.find((x) => x.id === item.id)?.name ||
          item.name ||
          item.id.slice(0, 5), // same, ideally you map the id to real category name
        count: item.count,
        value: item.id,
      })),
    });
  }

  const initialSpecialities = specialities?.data.map((x) => ({
    id: x.id,
    name: x.name,
    count: 0,
  }));
  data.speciality = mergeData(data.speciality, initialSpecialities, "id");

  if (data.speciality?.length) {
    filters.push({
      name: "Main Speciality",
      searchable: true,
      maxItems: 8,
      sectionKey: "sp",
      items: data.speciality.map((item) => ({
        label:
          specialities?.data.find((x) => x.id === item.id)?.name ||
          item.name ||
          item.id.slice(0, 5),
        count: item.count,
        value: item.id,
      })),
    });
  }

  const initialCareerLevel = careerLevels?.data.map((x) => ({
    id: x.id,
    name: x.name,
    count: 0,
  }));
  data.careerLevel = mergeData(data.careerLevel, initialCareerLevel, "id");

  if (data.careerLevel?.length) {
    filters.push({
      name: "Career Level",
      multiple: true,
      searchable: true,
      maxItems: 8,
      sectionKey: "clv",
      items: data.careerLevel.map((item) => ({
        label:
          careerLevels?.data.find((x) => x.id === item.id)?.name ||
          item.name ||
          item.id.slice(0, 5), // same, ideally replace id with readable career level name
        count: item.count,
        value: item.id,
      })),
    });
  }

  const initialEmploymentTypes = employmentTypes?.data.map((x) => ({
    id: x.id,
    name: x.name,
    count: 0,
  }));
  data.employmentType = mergeData(
    data.employmentType,
    initialEmploymentTypes,
    "id",
  );
  if (data.employmentType?.length) {
    filters.push({
      name: "Employment Type",
      multiple: true,
      sectionKey: "emp",
      items: data.employmentType.map((item) => ({
        label:
          employmentTypes?.data.find((x) => x.id === item.id)?.name ||
          item.name ||
          item.id.slice(0, 5), // same, ideally replace id with readable career level name
        count: item.count,
        value: item.id,
      })),
    });
  }

  const initialEducation = educationOptions.map((x) => ({
    name: x.id,
    count: 0,
  }));
  data.educationLevel = mergeData(
    data.educationLevel,
    initialEducation,
    "name",
  );
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

  const initialWorkPlace = jobWorkPlaceOptions.map((x) => ({
    name: x.id,
    count: 0,
  }));
  data.workPlace = mergeData(data.workPlace, initialWorkPlace, "name");
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

  const initialGender = gendersOptions.map((x) => ({
    name: x.value,
    count: 0,
  }));
  data.gender = mergeData(data.gender, initialGender, "name");
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
