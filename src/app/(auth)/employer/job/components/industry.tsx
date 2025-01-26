import {
  getCategoryFromIndustryId,
  getIndustries,
  getSpecialtyFromCategoryId,
} from "@/lib/actions/employer.actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories, fetchIndustries } from "@/store/slices/industrySlice";
import {
  CareerLevels,
  Industry,
  JobCategory,
  JobData,
  SpecialtyItem,
} from "@/types";
import { FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface IndustryFormProps {
  control: Control<JobData, any>;
  errors: FieldErrors<JobData>;
  watch: UseFormWatch<JobData>;
  setValue: UseFormSetValue<JobData>;
}
const IndustryForm: React.FC<IndustryFormProps> = ({
  control,
  errors,
  watch,
  setValue,
}) => {
  const {
    categories: { data: categories, loading: categoriesLoading },
    industries: { data: industries, loading: industryLoading },
  } = useAppSelector((state) => state.industry);
  const dispatch = useAppDispatch();

  const selectedIndustry = watch("jobIndustryId");
  const selectedCategory = watch("jobCategoryId");

  const [specialties, setSpecialties] = useState<SpecialtyItem[]>([]);
  const [careerLevels, setCareerLevels] = useState<CareerLevels[]>([]);

  const specialtyHandler = async () => {
    if (!selectedCategory) return;
    const selectedCategoryObject = categories.find(
      (c) => c.id === selectedCategory,
    );
    const specialties = selectedCategoryObject?.specialities;
    const careerLevels = selectedCategoryObject?.careerLevels;
    setSpecialties(specialties || []);
    setCareerLevels(careerLevels || []);
  };
  useEffect(() => {
    specialtyHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, categories]);



  const handleFetchCategories = async (selectedIndustry: string) => {
    await dispatch(fetchCategories(selectedIndustry));
  };
  useEffect(() => {
    if (selectedIndustry) {
      handleFetchCategories(selectedIndustry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndustry]);


  const handleFetchIndustries = async () => {
    await dispatch(fetchIndustries());
  };
  useEffect(() => {
    if (industries.length === 0) {
      handleFetchIndustries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <div className="mb-6">
        <label className="mb-1 text-lg font-semibold text-main">
          Industry *
        </label>
        <Controller
          name="jobIndustryId"
          control={control}
          rules={{ required: "industry is required" }}
          render={({ field }) => (
            <FormControl
              component="fieldset"
              error={!!errors?.jobIndustryId?.message}
              fullWidth
            >
              <Tooltip
                title={!industryLoading ? undefined : "Industries are loading"}
                placement="bottom"
              >
                <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
                  {industryLoading || industries.length === 0
                    ? [1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex h-[50px] w-full max-w-[150px] animate-pulse items-center justify-center rounded-base border border-neutral-300"
                        >
                          <span className="rounded-md bg-gray-300 text-transparent">
                            Demo Industry
                          </span>
                        </div>
                      ))
                    : industries.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setValue("jobCategoryId", "");
                            setValue("jobSpecialityId", "");
                            setValue("jobCareerLevelId", "");
                            field.onChange(item.id);
                            setValue("jobIndustryName", item.name);
                          }}
                          className={`h-[50px] w-full max-w-[150px] rounded-base border font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.jobIndustryId ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                        >
                          {item.name}
                        </button>
                      ))}
                </div>
              </Tooltip>

              {errors.jobIndustryId && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.jobIndustryId.message}
                </p>
              )}
            </FormControl>
          )}
        />
      </div>
      <div className="mb-6 flex flex-wrap gap-5 md:flex-nowrap">
        <div className="min-w-[150px] flex-1">
          <label className="text-lg font-semibold text-main">Category *</label>
          <Controller
            name="jobCategoryId"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormControl error={Boolean(errors.jobCategoryId)} fullWidth>
                <Tooltip
                  title={
                    selectedIndustry
                      ? categoriesLoading ? "loading...":undefined
                      : "Please select industry first"
                  }
                  placement="bottom"
                >
                  <Select
                    {...field}
                    onChange={(e) => {
                      const id = e.target.value;
                      field.onChange(id);
                      const category = categories.find((x) => x.id === id);
                      setValue("jobCategoryName", category?.name || "");
                    }}
                    displayEmpty
                    MenuProps={{
                      disableScrollLock: true,
                      PaperProps: {
                        sx: { maxHeight: 300 },
                      },
                    }}
                    disabled={!selectedIndustry || categoriesLoading}
                    renderValue={(selected) => {
                      const category = categories.find(
                        (i) => i.id === selected,
                      );
                      if (!category) {
                        return (
                          <span className="text-gray-400">Job Category</span>
                        );
                      }
                      return category.name;
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select Job Category</em>
                    </MenuItem>
                    {categories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Tooltip>

                {errors.jobCategoryId && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.jobCategoryId.message}
                  </p>
                )}
              </FormControl>
            )}
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <label className="text-lg font-semibold text-main">Specialty *</label>
          <Controller
            name="jobSpecialityId"
            control={control}
            rules={{ required: "Specialty is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.jobSpecialityId)}>
                <Tooltip
                  title={
                    selectedCategory
                      ? undefined
                      : "Please select Category first"
                  }
                  placement="bottom"
                >
                  <Select
                    {...field}
                    onChange={(e) => {
                      const id = e.target.value;
                      field.onChange(id);
                      const specialty = specialties.find((x) => x.id === id);
                      setValue("jobSpecialityName", specialty?.name || "");
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                      PaperProps: {
                        sx: { maxHeight: 300 },
                      },
                    }}
                    disabled={!selectedCategory}
                    displayEmpty
                    renderValue={(selected) => {
                      const specialty = specialties.find(
                        (i) => i.id === selected,
                      );
                      if (!specialty) {
                        return (
                          <span className="text-gray-400">Job Specialty</span>
                        );
                      }
                      return specialty.name;
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select Specialty</em>
                    </MenuItem>
                    {specialties.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Tooltip>
                {errors.jobSpecialityId && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.jobSpecialityId.message}
                  </p>
                )}
              </FormControl>
            )}
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <label className="text-lg font-semibold text-main">
            Career Level *
          </label>
          <Controller
            name="jobCareerLevelId"
            control={control}
            rules={{ required: "Career Level is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.jobCareerLevelId)}>
                <Tooltip
                  title={
                    selectedCategory
                      ? undefined
                      : "Please select Category first"
                  }
                  placement="bottom"
                >
                  <Select
                    {...field}
                    onChange={(e) => {
                      const id = e.target.value;
                      field.onChange(id);
                      const career = careerLevels.find((x) => x.id === id);
                      setValue("jobCareerLevelName", career?.name || "");
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                      PaperProps: {
                        sx: { maxHeight: 300 },
                      },
                    }}
                    displayEmpty
                    disabled={!selectedCategory}
                    renderValue={(selected) => {
                      const careerLevel = careerLevels.find(
                        (i) => i.id === selected,
                      );
                      if (!careerLevel) {
                        return (
                          <span className="text-gray-400">
                            Job Career Level
                          </span>
                        );
                      }
                      return careerLevel.name;
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select Career Level</em>
                    </MenuItem>
                    {careerLevels.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Tooltip>
                {errors.jobCareerLevelId && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.jobCareerLevelId.message}
                  </p>
                )}
              </FormControl>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default IndustryForm;
