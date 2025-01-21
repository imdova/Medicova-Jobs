import { JobData } from "@/types";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

const industries = [
    { id: "Healthcare", label: "Healthcare" },
    { id: "Pharmaceutical", label: "Pharmaceutical" },
    { id: "Education", label: "Education" },
  ];

type IndustryType = {
  id: string;
  label: string;
};

interface IndustryFormProps {
  control: Control<JobData, any>;
  errors: FieldErrors<JobData>;
}
const IndustryForm: React.FC<IndustryFormProps> = ({ control, errors }) => {
//   const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [categories, setCategories] = useState<IndustryType[]>([]);
  const [specialties, setSpecialties] = useState<IndustryType[]>([]);
  const [careerLevels, setCareerLevels] = useState<IndustryType[]>([]);


  return (
    <div>
      <div className="mb-6 md:w-1/2 md:pr-3">
        <label className="mb-1 text-lg font-semibold text-main">
          Industry *
        </label>
        <Controller
          name="jobIndustryId"
          control={control}
          defaultValue=""
          rules={{ required: "industry is required" }}
          render={({ field }) => (
            <FormControl
              component="fieldset"
              error={!!errors?.jobIndustryId?.message}
              fullWidth
            >
              <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
                {industries.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => field.onChange(item.id)}
                    className={`h-[50px] w-full rounded-base border font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.jobIndustryId ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                  >
                    {item.id}
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
            defaultValue=""
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormControl error={Boolean(errors.jobCategoryId)} fullWidth>
                <Select
                  {...field}
                  displayEmpty
                  MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                      sx: { maxHeight: 300 },
                    },
                  }}
                  renderValue={(selected) => {
                    if (selected === "") {
                      return (
                        <span className="text-gray-400">Job Category</span>
                      );
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Job Category</em>
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </Select>
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
            defaultValue=""
            rules={{ required: "Specialty is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.jobSpecialityId)}>
                <Select
                  {...field}
                  MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                      sx: { maxHeight: 300 },
                    },
                  }}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === "") {
                      return (
                        <span className="text-gray-400">Job Specialty</span>
                      );
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Specialty</em>
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </Select>
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
            defaultValue=""
            rules={{ required: "Career Level is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.jobCareerLevelId)}>
                <Select
                  {...field}
                  MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                      sx: { maxHeight: 300 },
                    },
                  }}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === "") {
                      return (
                        <span className="text-gray-400">Job Career Level</span>
                      );
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Career Level</em>
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </Select>
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
