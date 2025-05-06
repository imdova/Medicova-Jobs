import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCareerLevels,
  fetchCategories,
  fetchEmploymentTypes,
  fetchIndustries,
  fetchSpecialities,
} from "@/store/slices/industriesSlice";
import { useEffect, useState } from "react";

interface UseIndustriesDataProps {
  industryId?: string | "all" | null;
  categoryId?: string | "all" | null;
}

export const useIndustriesData = ({
  industryId,
  categoryId,
}: UseIndustriesDataProps | undefined = {}) => {
  const dispatch = useAppDispatch();
  const {
    industries,
    categories,
    careerLevels,
    specialities,
    employmentTypes,
  } = useAppSelector((state) => state.industry);
  const [cachedIndustry, setCachedIndustry] = useState<
    string | string[] | null
  >(null);
  const [cachedCategory, setCachedCategory] = useState<
    string | string[] | null
  >(null);

  useEffect(() => {
    if (industries.data.data.length === 0 && !industries.loading) {
      dispatch(fetchIndustries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (employmentTypes.data.data.length === 0 && !employmentTypes.loading) {
      dispatch(fetchEmploymentTypes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (JSON.stringify(industryId) === JSON.stringify(cachedIndustry)) return;
    if (industryId) {
      setCachedIndustry(industryId);
      dispatch(fetchCategories(industryId));
    }
  }, [dispatch, industryId, cachedIndustry]);
  useEffect(() => {
    if (JSON.stringify(categoryId) === JSON.stringify(cachedCategory)) return;
    if (categoryId) {
      setCachedCategory(categoryId);
      dispatch(fetchSpecialities(categoryId));
      dispatch(fetchCareerLevels(categoryId));
    }
  }, [dispatch, categoryId, cachedCategory]);

  return {
    industries,
    categories,
    careerLevels,
    specialities,
    employmentTypes,
  };
};
