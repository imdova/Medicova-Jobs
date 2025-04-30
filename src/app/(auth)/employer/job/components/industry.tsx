import {
  API_GET_CAREER_LEVELS_BY_CATEGORY,
  API_GET_CATEGORIES_BY_INDUSTRY,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES_BY_CATEGORY,
} from "@/api/admin";
import useFetch from "@/hooks/useFetch";
import { Industry, JobData } from "@/types";
import { FormControl, MenuItem, Select, Tooltip } from "@mui/material";
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
  industries: Industry[];
}
// TODO: enhancements, create a usable component
const IndustryForm: React.FC<IndustryFormProps> = ({
  control,
  errors,
  watch,
  setValue,
  industries,
}) => {
  const selectedJobIndustryId = watch("jobIndustryId");
  const selectedJobCategoryId = watch("jobCategoryId");

  const { loading: categoriesLoading, data: categories } = useFetch<
    PaginatedResponse<Industry>
  >(
    selectedJobIndustryId &&
      API_GET_CATEGORIES_BY_INDUSTRY + selectedJobIndustryId,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );
  const { loading: careerLevelsLoading, data: jobCareerLevels } = useFetch<
    PaginatedResponse<Industry>
  >(
    selectedJobCategoryId &&
      `${API_GET_CAREER_LEVELS_BY_CATEGORY}?ids=${selectedJobCategoryId}&limit=200`,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );
  const { loading: specialtyLoading, data: jobSpecialities } = useFetch<
    PaginatedResponse<Industry>
  >(
    selectedJobCategoryId &&
      API_GET_SPECIALITIES_BY_CATEGORY + selectedJobCategoryId,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );

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
              {/* TODO add icons here  */}
              <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
                {industries?.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setValue("jobCategoryId", null);
                      setValue("jobSpecialityId", null);
                      setValue("jobCareerLevelId", null);
                      setValue("jobIndustry", item.name);
                      field.onChange(item.id);
                    }}
                    className={`h-[42px] w-full max-w-[150px] rounded-base border font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.jobIndustryId ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
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
                    selectedJobIndustryId
                      ? categoriesLoading
                        ? "loading..."
                        : undefined
                      : "Please select industry first"
                  }
                  placement="bottom"
                >
                  <Select
                    {...field}
                    onChange={(e) => {
                      const id = e.target.value;
                      field.onChange(id);
                      const category = categories?.data?.find(
                        (x) => x.id === id,
                      );
                      setValue("jobSpecialityId", null);
                      setValue("jobCareerLevelId", null);
                      setValue("jobCategory", category?.name || "");
                    }}
                    displayEmpty
                    MenuProps={{
                      disableScrollLock: true,
                      PaperProps: {
                        sx: { maxHeight: 300 },
                      },
                    }}
                    disabled={!selectedJobIndustryId || categoriesLoading}
                    renderValue={(selected) => {
                      const category = categories?.data.find(
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
                    {categories?.data?.map((item) => (
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
                    selectedJobCategoryId
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
                      const specialty = jobSpecialities?.data?.find(
                        (x) => x.id === id,
                      );
                      setValue("jobSpeciality", specialty?.name || "");
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                      PaperProps: {
                        sx: { maxHeight: 300 },
                      },
                    }}
                    disabled={!selectedJobCategoryId}
                    displayEmpty
                    renderValue={(selected) => {
                      const specialty = jobSpecialities?.data?.find(
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
                    {jobSpecialities?.data?.map((item) => (
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
                    selectedJobCategoryId
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
                      const career = jobCareerLevels?.data?.find(
                        (x) => x.id === id,
                      );
                      setValue("jobCareerLevel", career?.name || "");
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                      PaperProps: {
                        sx: { maxHeight: 300 },
                      },
                    }}
                    displayEmpty
                    disabled={!selectedJobCategoryId}
                    renderValue={(selected) => {
                      const careerLevel = jobCareerLevels?.data.find(
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
                    {jobCareerLevels?.data.map((item) => (
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
