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
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import TextEditor from "@/components/editor/editor";
import { JobData, UserState } from "@/types";
import { Controller, useForm } from "react-hook-form";
import { JobWorkPlace } from "@/constants/enums/work-place.enum";
import { Gender } from "@/constants/enums/gender.enum";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import { Add, Close, Remove } from "@mui/icons-material";
import { EducationLevel } from "@/constants/enums/education-level.enum";
import { useSession } from "next-auth/react";
import IndustryForm from "../industry";

const employmentTypes = [
  { id: "Full Time", label: "Full Time" },
  { id: "Part Time", label: "Part Time" },
  { id: "Freelance", label: "Freelance" },
  { id: "Volunteer", label: "Volunteer" },
];
const jobWorkPlaceOptions = [
  { id: JobWorkPlace.ONSITE, label: "Onsite" },
  { id: JobWorkPlace.REMOTE, label: "Remote" },
  { id: JobWorkPlace.HYBRID, label: "Hybrid" },
];
const genderOptions = [
  { id: Gender.ANY, label: "Any" },
  { id: Gender.FEMALE, label: "Female" },
  { id: Gender.MALE, label: "Male" },
];
const educationOptions = [
  { id: EducationLevel.HIGH_SCHOOL, label: "High School" },
  { id: EducationLevel.BACHELORS, label: "bachelors" },
  { id: EducationLevel.MASTERS, label: "Master's" },
  { id: EducationLevel.PHD, label: "PHD" },
];
interface SectorSelectionProps {
  onSubmit: (data: JobData) => void;
}

const JobDetailsStep: React.FC<SectorSelectionProps> = ({ onSubmit }) => {
  const { data: session, status, update } = useSession();
  const user = session?.user as UserState;
  const companyId = user?.companyId || "";

  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { companyId } as JobData,
  });

  const handelJobDescription = (e: string) => {
    console.log(e);
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Job Title */}
      <div className="mb-6 md:w-1/2 md:pr-3">
        <label className="mb-2 text-lg font-semibold text-main">Title *</label>
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
          <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      {/* Industry */}
      <IndustryForm control={control} errors={errors} />

      {/* Dropdowns employment type - education level  */}
      <div className="mb-6 flex flex-wrap gap-5 md:flex-nowrap">
        <div className="min-w-[150px] flex-1">
          <label className="mb-1 text-lg font-semibold text-main">
            Type of Employment *
          </label>
          <Controller
            name="jobEmploymentTypeId"
            control={control}
            defaultValue=""
            rules={{ required: "industry is required" }}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                error={!!errors?.jobEmploymentTypeId?.message}
                fullWidth
              >
                <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
                  {employmentTypes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => field.onChange(item.id)}
                      className={`h-[50px] w-full rounded-base border font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.jobEmploymentTypeId ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                    >
                      {item.id}
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
            defaultValue={null}
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
                        <span className="text-gray-400">Education Level</span>
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
                    className={`h-[50px] w-full rounded-base border font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.jobWorkPlace ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
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

      {/* Gender */}
      <div className="mb-6 md:w-1/2 md:pr-3">
        <label className="mb-1 text-lg font-semibold text-main">Gender *</label>
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
                    className={`h-[50px] w-full rounded-base border font-normal focus:outline-offset-2 focus:outline-light-primary ${errors?.gender ? "border-red-500 !text-red-500" : "border-neutral-300"} ${field.value === item.id ? "bg-primary text-white" : "text-neutral-500 hover:border-black hover:text-secondary"} `}
                  >
                    {item.id}
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

      <div className="mb-6 flex flex-wrap gap-5 md:flex-nowrap">
        {/* Age */}
        <div className="flex min-w-[300px] flex-1 flex-wrap gap-5 md:flex-nowrap">
          <div className="min-w-[150px] flex-1">
            <label className="mb-2 text-lg font-semibold text-main">
              Min Age *
            </label>
            <Controller
              name="minAge"
              control={control}
              defaultValue={null}
              rules={{ required: "min age is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full"
                  name="min age"
                  type="number"
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
              rules={{ required: "max age is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full"
                  name="max age"
                  type="number"
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

        {/* Job Location */}
        <div className="flex min-w-[300px] flex-1 flex-wrap gap-5 md:flex-nowrap">
          <div className="min-w-[150px] flex-1">
            <label className="mb-2 text-lg font-semibold text-main">
              Job Location *
            </label>
            <Controller
              name="countryCode"
              control={control}
              defaultValue=""
              rules={{ required: "country is required" }}
              render={({ field }) => (
                <FormControl error={Boolean(errors.countryCode)} fullWidth>
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
                      const country = countries.data.find(
                        (c) => c.isoCode === selected,
                      );
                      if (!country) {
                        return (
                          <span className="text-gray-400">Job Location</span>
                        );
                      }
                      return country.name;
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select Job Location</em>
                    </MenuItem>
                    {countries.data.map((country) => (
                      <MenuItem key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.countryCode && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.countryCode.message}
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
              <p className="mt-2 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Years of Experience */}
      <div className="mb-6 flex flex-wrap gap-5 md:w-1/2 md:flex-nowrap md:pr-3">
        <div className="min-w-[150px] flex-1">
          <label className="mb-2 text-lg font-semibold text-main">
            Min Years of Experience *
          </label>
          <Controller
            name="minExpYears"
            control={control}
            defaultValue={null}
            rules={{ required: "min experience years is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full"
                name="min experience years"
                type="number"
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
            Max Years of Experience *
          </label>
          <Controller
            name="maxExpYears"
            control={control}
            defaultValue={null}
            rules={{ required: "max experience years is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full"
                name="max experience years"
                type="number"
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

      {/* Salary Details */}
      <div className="mb-6 flex flex-wrap gap-5 md:flex-nowrap">
        <div className="flex-1">
          <div className="flex min-w-[300px] flex-1 flex-wrap gap-5 md:flex-nowrap">
            <div className="min-w-[150px] flex-1">
              <label className="mb-2 text-lg font-semibold text-main">
                Salary Start range *
              </label>
              <Controller
                name="salaryRangeStart"
                control={control}
                defaultValue={null}
                rules={{ required: "salary rang start is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="w-full"
                    name="salary rang start"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
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
                Salary Start range *
              </label>
              <Controller
                name="salaryRangeEnd"
                control={control}
                defaultValue={null}
                rules={{ required: "salary range end is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="w-full"
                    name="salary range end"
                    type="number"
                    placeholder="Enter The Salary Range End"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
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
            Additional Salary Details *
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
                error={!!errors?.title?.message}
              />
            )}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
      </div>
      {/* Number of Vacancies */}
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
              <div className="flex gap-5">
                <Button
                  variant="outlined"
                  color={errors?.availableVacancies ? "error" : "primary"}
                  onClick={() => field.onChange((field.value || 0) - 1)}
                  disabled={!field.value || field.value <= 1} // Disable the minus button when count is 1
                >
                  <Remove />
                </Button>
                <p
                  className={`rounded-base border p-4 px-8 text-center text-xl ${errors?.availableVacancies ? "border-red-500 text-red-500" : ""}`}
                >
                  {field.value}
                </p>
                <Button
                  variant="outlined"
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

      <Divider className="my-2" />
      {/* Job Details */}
      <h5 className="mb-12 mt-4 text-3xl font-bold text-main">About The Job</h5>
      <div className="mb-4 w-full">
        <h6 className="mb-2 text-xl font-bold text-main">Job Description</h6>
        <TextEditor
          value={"<p>Write your job description ...</p>"}
          onChange={handelJobDescription}
        />
      </div>
      <div className="w-full">
        <h6 className="mb-2 text-xl font-bold text-main">Job Requirements</h6>
        <TextEditor
          value={"<p>Write your job requirements ... </p>"}
          onChange={handelJobDescription}
        />
      </div>

      {/* Skills */}
      <div className="mt-8 rounded-[10px] bg-green-50 p-4">
        <h6 className="text-xl font-semibold text-main">
          Skills related to the job post{" "}
        </h6>
        <div className="mt-2 flex flex-wrap">
          {["React", "Angular", "Vue"].map((skill, i) => (
            <div
              key={i}
              className="mr-2 mt-2 rounded-[5px] border border-primary px-4 py-2 text-secondary focus:ring-2 focus:ring-primary md:mr-4"
            >
              {skill}
              <IconButton size="small" color="error">
                <Close />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div className="mt-8 rounded-[10px] bg-green-50 p-4">
        <h6 className="text-xl font-semibold text-main">Keywords</h6>
        <p className="text-secondary">
          Enter keywords including any related job titles, technologies, or
          keywords the candidate should have in his CV.
        </p>
        <div className="mt-2 flex flex-wrap">
          {["React", "Angular", "Vue"].map((skill, i) => (
            <div
              key={i}
              className="mr-2 mt-2 rounded-[5px] border border-primary px-4 py-2 text-secondary focus:ring-2 focus:ring-primary md:mr-4"
            >
              {skill}
              <IconButton size="small" color="error">
                <Close />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="space-between mt-5 flex gap-2 md:justify-end">
        {/* <Button variant="outlined" >Back</Button> */}
        <Button className="bg-[#FFAE35] text-[#464748] hover:bg-[#e19e39]">
          Save and Publish Later
        </Button>
        <Button type="submit" variant="contained">
          next
        </Button>
      </div>
      {/* //////////////////////// */}
    </form>
  );
};

export default JobDetailsStep;
