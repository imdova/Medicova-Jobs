"use client";
import React, { useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import TextEditor from "@/components/editor/editor";
import { EmploymentType, Industry, JobData } from "@/types";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import { Add, Remove } from "@mui/icons-material";
import IndustryForm from "../industry";
import MultiTextInput from "@/components/form/MultiTextInput";
import {
  currencyOptions,
  educationOptions,
  genderOptions,
  jobWorkPlaceOptions,
  startDateTypeOptions,
} from "@/constants/job";
import { disableEnterKey } from "@/util";
import SearchableSelect from "@/components/UI/SearchableSelect";
import { SalaryCurrency } from "@/constants/enums/currency.enum";
import useIsLeaving from "@/hooks/useIsLeaving";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";

interface JobDetailProps {
  jobData: JobData;
  onSubmit: (data: JobData) => void;
  onDraft: (data: Partial<JobData>) => void;
  draftLoading: boolean;
  industries: Industry[]
  employmentTypes: EmploymentType[]
}
const JobDetailsStep: React.FC<JobDetailProps> = ({
  jobData,
  onSubmit,
  onDraft,
  draftLoading,
  industries,
  employmentTypes
}) => {
  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    defaultValues: jobData,
  });

  const { isLeaving, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const onDraftSubmit = () => {
    const data = watch();
    onDraft({ ...data, draft: true });
  };

  const handleFetchCountries = async () => {
    await dispatch(fetchCountries());
  };
  useEffect(() => {
    if (countries.data.length === 0) {
      handleFetchCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <LeaveConfirmationModal
        isOpen={isLeaving && isDirty}
        additionalButtons={[
          {
            text: "Save Draft",
            onClick: () => {
              handleUserDecision(true);
              onDraftSubmit();
            },
            color: "warning",
            variant: "contained",
          },
        ]}
        onLeave={() => {
          handleUserDecision(true);
        }}
        onStay={() => {
          handleUserDecision(false);
        }}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={disableEnterKey}
        noValidate
      >
        <div className="mb-4 rounded-base border border-gray-100 bg-white p-4 shadow-lg">
          <h5 className="mb-12 mt-4 text-center text-3xl font-bold text-main">
            Job Details
          </h5>
          <div className="mb-6 md:w-1/2 md:pr-3">
            <label className="mb-2 text-lg font-semibold text-main">
              Title *
            </label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full"
                  name="title"
                  placeholder="Enter The Job Title"
                  error={!!errors?.title?.message}
                />
              )}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>
          {/* Industry */}
          <IndustryForm
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            industries={industries}
          />
          {/* Dropdowns employment type - education level  */}
          <div className="mb-6 flex flex-wrap gap-2 md:flex-nowrap">
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
                      {employmentTypes?.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            field.onChange(item.id);
                            setValue("jobEmploymentType", item.name);
                          }}
                          className={`h-[42px] rounded-base border px-2 font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.jobEmploymentTypeId ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
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
            <div className="min-w-[150px] flex-1">
              <label className="mb-1 text-lg font-semibold text-main">
                Education Level *
              </label>
              <Controller
                name="educationLevel"
                control={control}
                defaultValue={""}
                rules={{ required: "Education Level is required" }}
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.educationLevel)}>
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
                        const selectedEducationLevel = educationOptions.find(
                          (c) => c.id === selected,
                        );
                        if (!selectedEducationLevel) {
                          return (
                            <span className="text-gray-400">
                              Education Level
                            </span>
                          );
                        }
                        return selectedEducationLevel.label;
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Your Education Level</em>
                      </MenuItem>
                      {educationOptions.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.educationLevel && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.educationLevel.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2 md:flex-nowrap">
            {/* Age */}
            <div className="flex min-w-[300px] flex-1 flex-wrap gap-2 md:flex-nowrap">
              <div className="min-w-[150px] flex-1">
                <label className="mb-2 text-lg font-semibold text-main">
                  Min Age *
                </label>
                <Controller
                  name="minAge"
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: "min age is required",
                    min: {
                      value: 16,
                      message: "min age must be at least 16",
                    },
                    max: {
                      value: 100,
                      message: "min age must be at most 100",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="w-full"
                      name="min age"
                      type="number"
                      inputProps={{ min: 16, max: 100 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">y</InputAdornment>
                        ),
                      }}
                      placeholder="Enter The Min Age"
                      error={!!errors?.minAge?.message}
                    />
                  )}
                />
                {errors.minAge && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.minAge.message}
                  </p>
                )}
              </div>
              <div className="min-w-[150px] flex-1">
                <label className="mb-2 text-lg font-semibold text-main">
                  Max Age *
                </label>
                <Controller
                  name="maxAge"
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: "max age is required",
                    min: {
                      value: 16,
                      message: "min age must be at least 16",
                    },
                    max: {
                      value: 100,
                      message: "min age must be at most 100",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="w-full"
                      name="max age"
                      type="number"
                      inputProps={{ min: 16, max: 100 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">y</InputAdornment>
                        ),
                      }}
                      placeholder="Enter The Max Age"
                      error={!!errors?.maxAge?.message}
                    />
                  )}
                />
                {errors.maxAge && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.maxAge.message}
                  </p>
                )}
              </div>
            </div>
            {/* Work Place */}
            <div className="mb-6 md:w-1/2 md:pr-3">
              <label className="mb-1 text-lg font-semibold text-main">
                Work Place *
              </label>
              <Controller
                name="jobWorkPlace"
                control={control}
                defaultValue={null}
                rules={{ required: "industry is required" }}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    error={!!errors?.jobWorkPlace?.message}
                    fullWidth
                  >
                    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
                      {jobWorkPlaceOptions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => field.onChange(item.id)}
                          className={`h-[42px] rounded-base border px-2 font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.jobWorkPlace ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                        >
                          {item.id}
                        </button>
                      ))}
                    </div>

                    {errors.jobWorkPlace && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.jobWorkPlace.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:flex-nowrap">
            <div className="flex min-w-[300px] flex-1 flex-wrap gap-2 md:flex-nowrap">
              <div className="min-w-[150px] flex-1">
                <label className="mb-2 text-lg font-semibold text-main">
                  Job Location *
                </label>
                <Controller
                  name="country.name"
                  control={control}
                  rules={{ required: "country is required" }}
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.country)} fullWidth>
                      <SearchableSelect
                        options={countries.data.map((x) => ({
                          value: x.name,
                          label: x.name,
                        }))}
                        {...field}
                        onChange={(e) => {
                          const country = countries.data.find(
                            (country) => country.name === e.target.value,
                          );
                          field.onChange(e.target.value);
                          setValue("country.code", country?.isoCode || "");
                        }}
                        displayEmpty
                        renderValue={(selected) => {
                          if (!selected) {
                            return (
                              <span className="text-gray-400">
                                Job Location
                              </span>
                            );
                          }
                          return selected;
                        }}
                      />
                      {errors.country && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.country.message}
                        </p>
                      )}
                    </FormControl>
                  )}
                />
              </div>
              <div className="min-w-[150px] flex-1">
                <label className="mb-2 text-lg font-semibold text-main">
                  City/Area *
                </label>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{ required: "city is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="w-full"
                      name="city"
                      placeholder="Enter The Job City / Area"
                      error={!!errors?.city?.message}
                    />
                  )}
                />
                {errors.city && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6 md:w-1/2 md:pr-3">
              <label className="mb-1 text-lg font-semibold text-main">
                Gender *
              </label>
              <Controller
                name="gender"
                control={control}
                defaultValue={null}
                rules={{ required: "gender is required" }}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    error={!!errors?.gender?.message}
                    fullWidth
                  >
                    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
                      {genderOptions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => field.onChange(item.id)}
                          className={`h-[42px] rounded-base border px-2 font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.gender ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {errors.gender && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.gender.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="mb-4 rounded-base border border-gray-100 bg-white p-4 shadow-lg">
          <h5 className="mb-12 mt-4 text-center text-3xl font-bold text-main">
            Experience & Salary Details
          </h5>

          {/* Salary Details */}
          <div className="mb-6 flex flex-wrap gap-2 md:flex-nowrap">
            <div className="flex-1">
              <div className="mb-4 flex min-w-[300px] flex-1 flex-wrap gap-2 md:flex-nowrap">
                <div className="min-w-[150px] flex-1">
                  <label className="mb-2 text-lg font-semibold text-main">
                    Min Years Exp *
                  </label>
                  <Controller
                    name="minExpYears"
                    control={control}
                    defaultValue={null}
                    rules={{
                      required: "min experience years is required",
                      min: {
                        value: 0,
                        message: "min experience years must be greater than 0",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="w-full"
                        name="min experience years"
                        type="number"
                        inputProps={{ min: 0 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">y</InputAdornment>
                          ),
                        }}
                        placeholder="Enter The Min Experience Years"
                        error={!!errors?.minExpYears?.message}
                      />
                    )}
                  />
                  {errors.minExpYears && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.minExpYears.message}
                    </p>
                  )}
                </div>
                <div className="min-w-[150px] flex-1">
                  <label className="mb-2 text-lg font-semibold text-main">
                    Max Years Exp *
                  </label>
                  <Controller
                    name="maxExpYears"
                    control={control}
                    defaultValue={null}
                    rules={{
                      required: "max experience years is required",
                      min: {
                        value: 0,
                        message: "max experience years must be greater than 0",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="w-full"
                        name="max experience years"
                        type="number"
                        inputProps={{ min: 0 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">y</InputAdornment>
                          ),
                        }}
                        placeholder="Enter The Max Experience Years"
                        error={!!errors?.maxExpYears?.message}
                      />
                    )}
                  />
                  {errors.maxExpYears && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.maxExpYears.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex min-w-[300px] flex-1 flex-wrap gap-2 md:flex-nowrap">
                <div className="w-[90px]">
                  <label className="mb-2 text-lg font-semibold text-main">
                    Currency*
                  </label>
                  <Controller
                    name="salaryCurrency"
                    defaultValue={SalaryCurrency.USD}
                    rules={{ required: "Currency is required" }}
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={Boolean(errors.educationLevel)}
                      >
                        <Select
                          {...field}
                          MenuProps={{
                            disableScrollLock: true,
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            const selectedItem = currencyOptions.find(
                              (c) => c.id === selected,
                            );
                            if (!selectedItem) {
                              return (
                                <span className="text-gray-400">Currency</span>
                              );
                            }
                            return selectedItem.label;
                          }}
                        >
                          {currencyOptions.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.educationLevel && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.educationLevel.message}
                          </p>
                        )}
                      </FormControl>
                    )}
                  />
                </div>
                <div className="min-w-[150px] flex-1">
                  <label className="mb-2 text-lg font-semibold text-main">
                    Salary start range *
                  </label>
                  <Controller
                    name="salaryRangeStart"
                    control={control}
                    defaultValue={null}
                    rules={{
                      required: "salary rang start is required",
                      min: {
                        value: 0,
                        message: "salary range start must be greater than 0",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="w-full"
                        name="salary rang start"
                        type="number"
                        inputProps={{ min: 0 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {currencyOptions.find(
                                (c) => c.id === watch("salaryCurrency"),
                              )?.icon || "$"}
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter The Salary Range Start"
                        error={!!errors?.salaryRangeStart?.message}
                      />
                    )}
                  />
                  {errors.salaryRangeStart && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.salaryRangeStart.message}
                    </p>
                  )}
                </div>
                <div className="min-w-[150px] flex-1">
                  <label className="mb-2 text-lg font-semibold text-main">
                    Salary end range *
                  </label>
                  <Controller
                    name="salaryRangeEnd"
                    control={control}
                    defaultValue={null}
                    rules={{
                      required: "salary range end is required",
                      min: {
                        value: 0,
                        message: "salary range end must be greater than 0",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="w-full"
                        name="salary range end"
                        type="number"
                        inputProps={{ min: 0 }}
                        placeholder="Enter The Salary Range End"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {currencyOptions.find(
                                (c) => c.id === watch("salaryCurrency"),
                              )?.icon || "$"}
                            </InputAdornment>
                          ),
                        }}
                        // value={field.value ? Number(field.value).toLocaleString('en-US') : ''}
                        // onChange={(e) => field.onChange(e.target.value.replace(/[^\d]/g, ''))}
                        error={!!errors?.salaryRangeEnd?.message}
                      />
                    )}
                  />
                  {errors.salaryRangeEnd && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.salaryRangeEnd.message}
                    </p>
                  )}
                </div>
              </div>
              <Controller
                name="hideSalary"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <FormControl error={!!errors.hideSalary} fullWidth>
                    <FormControlLabel
                      control={<Checkbox {...field} color="primary" />}
                      label="Hide Salary in job post"
                    />
                    {errors.hideSalary && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.hideSalary.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>

            {/* Additional Salary Details */}
            <div className="min-w-[150px] flex-1">
              <label className="mb-2 text-lg font-semibold text-main">
                Additional Salary Details
              </label>
              <Controller
                name="salaryDetails"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="w-full"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        height: "auto",
                      },
                    }}
                    multiline
                    minRows={4}
                    maxRows={6}
                    placeholder="Eg. Bonus Commission, Salary in Local Currency, etc."
                  />
                )}
              />

            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:flex-nowrap">
            <div className="mb-6 md:w-1/2 md:pr-3">
              <label className="mb-1 text-lg font-semibold text-main">
                Number of Vacancies *
              </label>
              <Controller
                name="availableVacancies"
                control={control}
                defaultValue={0}
                rules={{
                  required: "Vacancy is required",
                  min: {
                    value: 1,
                    message: "Vacancy must be at least 1",
                  },
                }}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    error={!!errors?.availableVacancies?.message}
                    fullWidth
                  >
                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        className="h-[42px] w-[42px]"
                        color={errors?.availableVacancies ? "error" : "primary"}
                        onClick={() => field.onChange((field.value || 0) - 1)}
                        disabled={!field.value || field.value <= 1} // Disable the minus button when count is 1
                      >
                        <Remove />
                      </Button>
                      <TextField
                        {...field}
                        name="Number of Vacancies"
                        className="h-14 w-16"
                        type="number"
                        placeholder="Num of Vacancies"
                        error={!!errors?.availableVacancies?.message}
                      />

                      <Button
                        variant="outlined"
                        className="h-[42px] w-[42px]"
                        color={errors?.availableVacancies ? "error" : "primary"}
                        onClick={() => field.onChange((field.value || 0) + 1)}
                      >
                        <Add />
                      </Button>
                    </div>

                    {errors.availableVacancies && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.availableVacancies.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>
            <div className="mb-6 md:w-1/2 md:pr-3">
              <label className="mb-1 text-lg font-semibold text-main">
                start date *
              </label>
              <Controller
                name="startDateType"
                control={control}
                defaultValue={null}
                rules={{ required: "industry is required" }}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    error={!!errors?.startDateType?.message}
                    fullWidth
                  >
                    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
                      {startDateTypeOptions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => field.onChange(item.id)}
                          className={`h-[42px] rounded-base border px-2 font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.startDateType ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                        >
                          {item.id}
                        </button>
                      ))}
                    </div>

                    {errors.startDateType && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.startDateType.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </div>
          </div>
        </div>
        <div className="mb-4 rounded-base border border-gray-100 bg-white p-4 shadow-lg">
          <h5 className="mb-12 mt-4 text-center text-3xl font-bold text-main">
            About The Job
          </h5>
          <div className="mb-4 w-full">
            <h6 className="mb-2 text-xl font-bold text-main">
              Job Description
            </h6>
            <TextEditor
              value={watch("description") || ""}
              onChange={(e) => setValue("description", e)}
            />
          </div>
          <div className="w-full">
            <h6 className="mb-2 text-xl font-bold text-main">
              Job Requirements
            </h6>
            <TextEditor
              value={watch("requirements") || ""}
              onChange={(e) => setValue("requirements", e)}
            />
          </div>
        </div>
        <div className="mb-4 rounded-base border border-gray-100 bg-white p-4 shadow-lg">
          <h5 className="mb-12 mt-4 text-center text-3xl font-bold text-main">
            Skills & Keywords
          </h5>

          <div className="mb-8 rounded-md bg-green-50 p-4">
            <h6 className="mb-2 text-xl font-semibold text-main">
              Skills related to the job post{" "}
            </h6>
            <MultiTextInput
              defaultValue={watch("skills") || []}
              placeholder="Add your skills (press Enter after each)"
              onChange={(items) => setValue("skills", items)}
            />
          </div>
          {/* Keywords */}
          <div className="rounded-md bg-green-50 p-4">
            <h6 className="text-xl font-semibold text-main">Keywords</h6>
            <p className="mb-3 text-sm text-secondary">
              Enter keywords including any related job titles, technologies, or
              keywords the candidate should have in his CV.
            </p>
            <MultiTextInput
              defaultValue={watch("keywords") || []}
              placeholder="Add your Keywords (press Enter after each)"
              onChange={(items) => setValue("keywords", items)}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className=""></div>
        <div className="space-between flex gap-2 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:justify-end">
          {/* <Button variant="outlined" >Back</Button> */}
          <Button
            onClick={onDraftSubmit}
            className="bg-[#FFAE35] text-[#464748] hover:bg-[#e19e39]"
          >
            {draftLoading ? "Loading... " : "Save and Publish Later"}
          </Button>
          <Button type="submit" variant="contained">
            next
          </Button>
        </div>
        {/* //////////////////////// */}
      </form>
    </>
  );
};

export default JobDetailsStep;
