import React, { useEffect, useState } from "react";
import MinJobCard from "@/components/UI/job-card-min";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Company, FieldConfig, JobData } from "@/types";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNewJob, fetchJobs } from "@/store/slices/jobSlice";
import { filteredJobs } from "@/lib/auth/utils";
import { createJob } from "@/lib/actions/job.actions";
import DynamicFormModal from "@/components/form/DynamicFormModal";
import { useRouter } from "next/navigation";
import { fetchCategories, fetchIndustries } from "@/store/slices/industrySlice";

const INITIAL_VISIBLE_ITEMS = 4;

const fields: FieldConfig<JobData>[] = [
  {
    name: "title",
    type: "text",
    label: "Job Title",
    textFieldProps: { placeholder: "Enter Job Title" },
    required: true,
  },
];

const CompanyJobs: React.FC<{
  company: Company;
  isEmployee: boolean;
}> = ({ company, isEmployee }) => {
  const router = useRouter();
  const {
    jobs: { data: jobs, loading: jobsLoading, error },
  } = useAppSelector((state) => state.companyJobs);
  const { industries, categories } = useAppSelector((state) => state.industry);
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");

  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);
  const [isExpanded, setIsExpanded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

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
    }
  };

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleItems(INITIAL_VISIBLE_ITEMS);
    } else {
      setVisibleItems(jobs.length);
    }
    setIsExpanded(!isExpanded);
  };

  const handleSelectIndustry = (industryId: string) => {
    dispatch(fetchCategories(industryId));
  };
  const remainingItems = jobs.length - visibleItems;

  useEffect(() => {
    if (jobs.length === 0 && company?.id) {
      dispatch(fetchJobs(company?.id));
    }
    if (industries.data.length === 0) {
      dispatch(fetchIndustries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, company?.id]);

  if (!isEmployee && jobs.length === 0) {
    return null;
  }

  const filJobs = filteredJobs(jobs, isEmployee ? "all" : "active");

  return (
    <div className="mt-5">
      <DynamicFormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleSubmit}
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
      {/* Title */}
      <div className="flex items-center justify-between rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
        <h3 className="text-2xl font-bold text-main">Latest jobs:</h3>
        {isEmployee && (
          <Tooltip title="Post New Job">
            <IconButton
              onClick={open}
              className="rounded border border-solid border-gray-300 p-2"
            >
              <Add />
            </IconButton>
          </Tooltip>
        )}
      </div>
      {/* Loop through MinJobCard 8 times */}
      {filJobs.length > 0 ? (
        <div
          className={`mt-4 grid ${filJobs.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2`}
        >
          {/* card  */}
          {filJobs.slice(0, visibleItems).map((job, i) => (
            <MinJobCard key={i} job={job} />
          ))}
        </div>
      ) : isEmployee ? (
        <div className="mt-5 flex flex-col items-center justify-center gap-4 rounded-base border border-gray-100 bg-white p-5 shadow-lg">
          <h6 className="text-2xl font-semibold text-secondary">
            You haven&apos;t posted any jobs yet.
          </h6>
          <Button
            LinkComponent={Link}
            href="/employer/job/posted"
            variant="contained"
          >
            Post Job Now
          </Button>
        </div>
      ) : null}
      {jobs.length > INITIAL_VISIBLE_ITEMS && (
        <div className="mt-5 flex items-center justify-center rounded-base border border-gray-100 bg-white p-3 shadow-lg">
          <Button className="mt-2 p-0" variant="text" onClick={handleToggle}>
            {isExpanded ? `Show less Jobs` : `Show ${remainingItems} more Jobs`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
