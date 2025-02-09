"use client";

import DynamicFormModal from "@/components/form/DynamicFormModal";
import { createJob } from "@/lib/actions/job.actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories, fetchIndustries } from "@/store/slices/industrySlice";
import { addNewJob } from "@/store/slices/jobSlice";
import { Company, FieldConfig, JobData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
};

const fields: FieldConfig<JobData>[] = [
  {
    name: "title",
    type: "text",
    label: "Job Title",
    textFieldProps: { placeholder: "Enter Job Title" },
    required: true,
  },
];

const PostJobModal = ({ isOpen, onClose, company }: PostJobModalProps) => {
  const router = useRouter();
  const { industries, categories } = useAppSelector((state) => state.industry);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: JobData) => {
    setLoading(true);
    handleCreate(data);
  };

  const handleCreate = async (data: JobData) => {
    const result = await createJob({
      ...data,
      companyId: company.id,
      draft: true,
    });
    if (result.success && result.data) {
      const job = result.data;
      dispatch(addNewJob(job));
      router.push(`/job/posted/${job.id}`);
      onClose();
      return;
    } else {
      setError("Some thing happen while Posting your job please try again");
      return;
    }
  };

  const handleSelectIndustry = (industryId: string) => {
    dispatch(fetchCategories(industryId));
  };

  useEffect(() => {
    if (industries.data.length === 0) {
      dispatch(fetchIndustries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <DynamicFormModal
      open={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      fields={[
        ...fields,
        {
          name: "jobIndustryId",
          type: "select",
          textFieldProps: { placeholder: "Select Industry" },
          gridProps: { xs: 12, sm: 6 },
          onChange: handleSelectIndustry,
          options:
            industries.data.map((industry) => ({
              value: industry.id,
              label: industry.name,
            })) || [],
          required: true,
        },
        {
          name: "jobCategoryId",
          type: "select",
          textFieldProps: { placeholder: "Select Category" },
          gridProps: { xs: 12, sm: 6 },
          options:
            categories.data.map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
          onChange: (jobCategoryId) => setSelectedCategory(jobCategoryId),
          required: true,
        },
        {
          name: "jobSpecialityId",
          type: "select",
          textFieldProps: { placeholder: "Select Speciality" },
          gridProps: { xs: 12, sm: 6 },
          options:
            categories?.data
              .find((c) => c.id === selectedCategory)
              ?.specialities.map((specialty) => ({
                value: specialty.id,
                label: specialty.name,
              })) || [],
          required: true,
        },
        {
          name: "jobCareerLevelId",
          type: "select",
          textFieldProps: { placeholder: "Select Career Level" },
          gridProps: { xs: 12, sm: 6 },
          options:
            categories?.data
              .find((c) => c.id === selectedCategory)
              ?.careerLevels.map((levels) => ({
                value: levels.id,
                label: levels.name,
              })) || [],
          required: true,
        },
      ]}
      title="Post a New Job"
      description="Provide details about the job opening to attract potential candidates. This section is public."
      initialValues={{ about: company?.about }}
    />
  );
};

export default PostJobModal;
