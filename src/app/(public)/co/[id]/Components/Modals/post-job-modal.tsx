"use client";

import { TAGS } from "@/api";
import { API_CREATE_JOB } from "@/api/employer";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import useFetch from "@/hooks/useFetch";
import useIsLeaving from "@/hooks/useIsLeaving";
import useUpdateApi from "@/hooks/useUpdateApi";
import { useAppDispatch } from "@/store/hooks";
import { addNewJob } from "@/store/slices/jobSlice";
import { Company, Industry, JobData } from "@/types";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
  API_GET_CATEGORIES_BY_INDUSTRY,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES_BY_CATEGORY,
  API_GET_CAREER_LEVELS_BY_CATEGORY,
} from "@/api/admin";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
};

// TODO: you need to use FormModal


const PostJobModal = ({ isOpen, onClose, company }: PostJobModalProps) => {
  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isOpen,
  });
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    watch,
    setValue,
    reset
  } = useForm(
    {
      defaultValues: {
        title: "",
        jobIndustry: "",
        jobIndustryId: "",
        jobCategory: "",
        jobCategoryId: "",
        jobSpeciality: "",
        jobSpecialityId: "",
        jobCareerLevel: "",
        jobCareerLevelId: "",
      } as JobData,
    }
  );

  const { isLoading, error, update } = useUpdateApi<JobData>(handleSuccess);

  const handlePost = async (formData: Partial<JobData>) => {
    const body = {
      ...formData,
      companyId: company.id,
      draft: true,
    }
    await update(API_CREATE_JOB, { method: "POST", body }, TAGS.jobs);
  };

  async function handleSuccess(newJob: JobData) {
    router.push(`/employer/job/posted/${newJob.id}`);
    onClose();
  }

  const selectedJobIndustryId = watch("jobIndustryId");
  const selectedJobCategoryId = watch("jobCategoryId");


  const { data: industries } = useFetch<PaginatedResponse<Industry>>(API_GET_INDUSTRIES);
  const { data: categories } = useFetch<PaginatedResponse<Industry>>(selectedJobIndustryId && `${API_GET_CATEGORIES_BY_INDUSTRY}?ids=${selectedJobIndustryId}`, {
    fetchOnce: false,
    fetchOnUrlChange: true,
  });
  const { data: jobCareerLevels } = useFetch<PaginatedResponse<Industry>>(selectedJobCategoryId && `${API_GET_CAREER_LEVELS_BY_CATEGORY}?ids=${selectedJobCategoryId}`, {
    fetchOnce: false,
    fetchOnUrlChange: true,
  });
  const { data: jobSpecialities } = useFetch<PaginatedResponse<Industry>>(selectedJobCategoryId && API_GET_SPECIALITIES_BY_CATEGORY + selectedJobCategoryId, {
    fetchOnce: false,
    fetchOnUrlChange: true,
  });


  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
        },
      }}
    >
      <LeaveConfirmationModal
        isOpen={isLeaving && isDirty}
        onLeave={() => {
          handleUserDecision(true);
          // reset(getDefaultValues(fields, initialValues));
          handleClose();
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <DialogTitle className="text-lg font-bold">
        Post a New Job
        <p className="mt-2 text-sm font-normal text-secondary">
          Provide details about the job opening to attract potential candidates. This section is public.
        </p>
      </DialogTitle>
      {error && (
        <Alert severity="error" className="my-1">
          <p className="text-xs">{error.message}</p>
        </Alert>
      )}
      <DialogContent>
        <form onSubmit={handleSubmit(handlePost)} noValidate>
          <div className="mb-4 ">
            <label className="mb-2 text-lg font-semibold text-main">
              Title *
            </label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    className="w-full"
                    placeholder="Enter your company name"
                    error={!!error}
                  />
                  {error && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </div>
          <div className="mb-2 flex flex-1 gap-1">
            <div className="w-1/2">
              <label className="text-lg font-semibold text-main">Job Industry</label>
              <Controller
                name="jobIndustry"
                control={control}
                rules={{ required: "Job Industry is required" }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={Boolean(error)} fullWidth>
                    <Select
                      {...field}
                      value={field.value ?? undefined}
                      onChange={(e) => {
                        const selectIndustry = e.target.value
                        field.onChange(e.target.value);
                        const industry = industries?.data?.find(
                          (x) => x.name === selectIndustry,
                        );
                        setValue("jobIndustryId", industry?.id || "");
                        setValue("jobCategoryId", "")
                        setValue("jobCategory", "")
                        setValue("jobCareerLevelId", "");
                        setValue("jobCareerLevel", "");
                        setValue("jobSpecialityId", "");
                        setValue("jobSpeciality", "");
                      }}
                      displayEmpty
                      MenuProps={{
                        disableScrollLock: true,
                        PaperProps: {
                          sx: { maxHeight: 300 },
                        },
                      }}
                      renderValue={(selected?: string) => {
                        if (!selected) {
                          return <em className="text-gray-400">Select Job industry</em>;
                        }
                        return <span>{selected}</span>;
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Job Industry</em>
                      </MenuItem>
                      {industries?.data && industries.data.map((industry) => (
                        <MenuItem key={industry.id} value={industry.name}>
                          {industry.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && (
                      <FormHelperText error>{error.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>
            <div className="w-1/2">
              <label className="text-lg font-semibold text-main">Job Category</label>
              <Controller
                name="jobCategory"
                control={control}
                rules={{ required: "Job Category is required" }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={Boolean(error)} fullWidth>
                    <Select
                      {...field}
                      value={field.value ?? undefined}
                      onChange={(e) => {
                        const selectCategory = e.target.value
                        field.onChange(e.target.value);
                        const category = categories?.data?.find(
                          (x) => x.name === selectCategory,
                        );
                        setValue("jobCategoryId", category?.id || null)
                        setValue("jobCareerLevelId", "");
                        setValue("jobCareerLevel", "");
                        setValue("jobSpecialityId", "");
                        setValue("jobSpeciality", "");
                      }}
                      displayEmpty
                      MenuProps={{
                        disableScrollLock: true,
                        PaperProps: {
                          sx: { maxHeight: 300 },
                        },
                      }}
                      renderValue={(selected?: string) => {
                        if (!selected) {
                          return <em className="text-gray-400">Select Job Category</em>;
                        }
                        return <span>{selected}</span>;
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Job category</em>
                      </MenuItem>
                      {categories?.data && categories.data.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && (
                      <FormHelperText error>{error.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>
          </div>
          <div className="mb-2 flex flex-1 gap-1">
            <div className="w-1/2">
              <label className="text-lg font-semibold text-main">Job Industry</label>
              <Controller
                name="jobSpeciality"
                control={control}
                rules={{ required: "Job Speciality is required" }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={Boolean(error)} fullWidth>
                    <Select
                      {...field}
                      value={field.value ?? undefined}
                      onChange={(e) => {
                        const speciality = jobSpecialities?.data?.find(
                          (inDus) => inDus.name === e.target.value,
                        );
                        setValue("jobSpecialityId", speciality?.id || "");
                        field.onChange(e.target.value);
                      }}
                      displayEmpty
                      MenuProps={{
                        disableScrollLock: true,
                        PaperProps: {
                          sx: { maxHeight: 300 },
                        },
                      }}
                      renderValue={(selected?: string) => {
                        if (!selected) {
                          return <em className="text-gray-400">Select Job Specialty</em>;
                        }
                        return <span>{selected}</span>;
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Job Specialty</em>
                      </MenuItem>
                      {jobSpecialities?.data && jobSpecialities.data.map((specialty) => (
                        <MenuItem key={specialty.id} value={specialty.name}>
                          {specialty.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && (
                      <FormHelperText error>{error.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>
            <div className="w-1/2">
              <label className="text-lg font-semibold text-main">Job Career Level</label>
              <Controller
                name="jobCareerLevel"
                control={control}
                rules={{ required: "Job Career Level is required" }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={Boolean(error)} fullWidth>
                    <Select
                      {...field}
                      value={field.value ?? undefined}
                      onChange={(e) => {
                        const jobCareerLevel = jobCareerLevels?.data?.find(
                          (x) => x.name === e.target.value,
                        );
                        setValue("jobCareerLevelId", jobCareerLevel?.id || "");
                        field.onChange(e.target.value);
                      }}
                      displayEmpty
                      MenuProps={{
                        disableScrollLock: true,
                        PaperProps: {
                          sx: { maxHeight: 300 },
                        },
                      }}
                      renderValue={(selected?: string) => {
                        if (!selected) {
                          return <em className="text-gray-400">Select Job Career Level</em>;
                        }
                        return <span>{selected}</span>;
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Job Career Level</em>
                      </MenuItem>
                      {jobCareerLevels?.data && jobCareerLevels.data.map((carerLevel) => (
                        <MenuItem key={carerLevel.id} value={carerLevel.name}>
                          {carerLevel.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && (
                      <FormHelperText error>{error.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>
          </div>

          <DialogActions>
            <Button
              onClick={() => {
                // reset(getDefaultValues(fields, initialValues));
                handleClose();
              }}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isDirty}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>

  );
};

export default PostJobModal;
