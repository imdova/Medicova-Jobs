import { getEmploymentTypes } from "@/lib/actions/employer.actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEmploymentTypes } from "@/store/slices/employmentTypeSlice";
import { EmploymentType, JobData } from "@/types";
import { FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import {
  UseFormSetValue,
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
interface IndustryFormProps {
  control: Control<JobData, any>;
  errors: FieldErrors<JobData>;
  watch: UseFormWatch<JobData>;
  setValue: UseFormSetValue<JobData>;
}
const EmploymentTypeSelect: React.FC<IndustryFormProps> = ({
  control,
  errors,
  watch,
  setValue,
}) => {
  const {
    employmentTypes: { data: employmentTypes, loading },
  } = useAppSelector((state) => state.employmentType);
  const dispatch = useAppDispatch();

  const handleFetchEmploymentTypes = async () => {
    await dispatch(fetchEmploymentTypes());
  };
  useEffect(() => {
    if (employmentTypes.length === 0) {
      handleFetchEmploymentTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div className="min-w-[150px] flex-1">
      <label className="mb-1 text-lg font-semibold text-main">
        Type of Employment *
      </label>
      <Controller
        name="jobEmploymentTypeId"
        control={control}
        defaultValue=""
        rules={{ required: "Employment type is required" }}
        render={({ field }) => (
          <FormControl
            component="fieldset"
            error={!!errors?.jobEmploymentTypeId?.message}
            fullWidth
          >
            <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
              {loading || employmentTypes.length === 0
                ? [1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-[50px] w-full max-w-[150px] animate-pulse items-center justify-center rounded-base border border-neutral-300"
                    >
                      <span className="rounded-md bg-gray-300 text-transparent">
                        Demo
                      </span>
                    </div>
                  ))
                : employmentTypes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        field.onChange(item.id);
                        setValue("jobEmploymentTypeName", item.name);
                      }}
                      className={`h-[50px] w-full rounded-base border font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.jobEmploymentTypeId ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                    >
                      {item.name}
                    </button>
                  ))}
            </div>

            {errors.jobEmploymentTypeId && (
              <p className="mt-2 text-sm text-red-500">
                {errors.jobEmploymentTypeId.message}
              </p>
            )}
          </FormControl>
        )}
      />
    </div>
  );
};

export default EmploymentTypeSelect;
