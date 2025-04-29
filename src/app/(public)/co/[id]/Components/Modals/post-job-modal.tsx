"use client";

import { TAGS } from "@/api";
import { API_CREATE_JOB } from "@/api/employer";
import useFetch from "@/hooks/useFetch";
import useUpdateApi from "@/hooks/useUpdateApi";
import { Company, FieldConfig, Industry, JobData } from "@/types";
import { useRouter } from "next/navigation";
import {
  API_GET_CATEGORIES_BY_INDUSTRY,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES_BY_CATEGORY,
  API_GET_CAREER_LEVELS_BY_CATEGORY,
} from "@/api/admin";
import { useState } from "react";
import FormModal from "@/components/form/FormModal/FormModal";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
};

const PostJobModal = ({ isOpen, onClose, company }: PostJobModalProps) => {
  const router = useRouter();
  const initialValues: Partial<JobData> = {
    title: "",
    jobIndustry: "",
    jobIndustryId: "",
    jobCategory: "",
    jobCategoryId: "",
    jobSpeciality: "",
    jobSpecialityId: "",
    jobCareerLevel: "",
    jobCareerLevelId: "",
  };
  const { isLoading, error, update } = useUpdateApi<JobData>(handleSuccess);

  const handlePost = async (formData: Partial<JobData>) => {
    const body = {
      ...formData,
      companyId: company.id,
      draft: true,
    };
    await update(API_CREATE_JOB, { method: "POST", body }, TAGS.jobs);
  };

  async function handleSuccess(newJob: JobData) {
    router.push(`/employer/job/posted/${newJob.id}`);
    onClose();
  }

  const { data: industries } =
    useFetch<PaginatedResponse<Industry>>(API_GET_INDUSTRIES);
  const [categories, setCategories] = useState<Industry[]>([]);
  const [jobCareerLevels, setJobCareerLevels] = useState<Industry[]>([]);
  const [jobSpecialities, setJobSpecialities] = useState<Industry[]>([]);

  const handleIndustrySelect = async (id: string) => {
    const response = await fetch(`${API_GET_CATEGORIES_BY_INDUSTRY}?ids=${id}&limit=200`);
    const data = await response.json();
    setCategories(data.data);
  };

  const handleCategorySelect = async (id: string) => {
    const specialtyResponse = await fetch(
      API_GET_SPECIALITIES_BY_CATEGORY + id + "&limit=200",
    );
    const specialtyData =
      (await specialtyResponse.json()) as PaginatedResponse<Industry>;
    setJobSpecialities(specialtyData.data);

    const careerLevelResponse = await fetch(
      `${API_GET_CAREER_LEVELS_BY_CATEGORY}?ids=${id}&limit=200`,
    );
    const careerLevelData =
      (await careerLevelResponse.json()) as PaginatedResponse<Industry>;
    setJobCareerLevels(careerLevelData.data);
  };
  const fields: FieldConfig<JobData>[] = [
    {
      name: "title",
      type: "text",
      label: "Job Title*",
      required: true,
      rules: {
        minLength: { value: 5, message: "Title must be at least 5 characters" },
      },
    },
    {
      name: "jobIndustryId",
      type: "select",
      label: "Job Industry*",
      resetFields: ["jobCategoryId", "jobSpecialityId", "jobCareerLevelId"],
      required: true,
      onChange: handleIndustrySelect,
      options: industries?.data.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "jobCategoryId",
      type: "select",
      dependsOn: "jobIndustryId",
      required: true,
      resetFields: ["jobSpecialityId", "jobCareerLevelId"],
      label: "Job Category*",
      onChange: handleCategorySelect,
      options: categories.map((type) => ({
        value: type.id,
        label: type.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "jobSpecialityId",
      type: "select",
      dependsOn: "jobCategoryId",
      required: true,
      label: "Job Specialty*",
      options: jobSpecialities.map((type) => ({
        value: type.id,
        label: type.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "jobCareerLevelId",
      type: "select",
      dependsOn: "jobCategoryId",
      required: true,
      label: "Job Career Level*",
      options: jobCareerLevels.map((type) => ({
        value: type.id,
        label: type.name,
      })),
      gridProps: { xs: 6 },
    },
  ];
  return (
    <FormModal
      open={isOpen}
      error={error?.message}
      loading={isLoading}
      onClose={onClose}
      onSubmit={handlePost}
      fields={fields}
      title="Company Main Information"
      initialValues={initialValues}
    />
  );
};

export default PostJobModal;
