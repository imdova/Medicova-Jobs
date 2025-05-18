"use client";

import { TAGS } from "@/api";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types";
import { useEffect, useState } from "react";
import FormModal from "@/components/form/FormModal/FormModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import {
  API_CREATE_SEEKER_EDUCATION,
  API_DELETE_SEEKER_EDUCATION,
  API_UPDATE_SEEKER_EDUCATION,
} from "@/api/seeker";
import { educationOptions } from "@/constants/job";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<EducationData>;
  seekerId?: string;
};

const years = Array.from(
  { length: new Date().getFullYear() - 1980 + 1 },
  (v, k) => k + 1980,
).reverse();

const EducationModal = ({
  isOpen,
  onClose,
  initialValues,
  seekerId,
}: PostJobModalProps) => {
  const { isLoading, error, update, reset } = useUpdateApi(handleClose);
  const { isLoading: isDeleting, update: onDelete } = useUpdateApi(handleClose);

  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleClose() {
    reset();
    onClose();
  }
  const fields: FieldConfig<EducationData>[] = [
    {
      name: "inistitute",
      type: "text",
      label: "Educational Institute",
      textFieldProps: {
        placeholder: "e.g., University of Oxford, MIT, Delhi University",
      },
      required: true,
    },
    {
      name: "program",
      type: "text",
      label: "Program Name",
      textFieldProps: {
        placeholder:
          "e.g., Nursing, Radiologic Technology, Health Information Management",
      },
      required: true,
    },
    {
      name: "degree",
      type: "select",
      label: "Degree Awarded",
      textFieldProps: {
        placeholder: "e.g., Bachelor's, Master's, PhD",
      },
      gridProps: { xs: 12, md: 3 },
      required: true,
      options: educationOptions.map((x) => ({
        label: x.label,
        value: x.id,
      })),
    },
    {
      name: "grade",
      label: "Final Grade or GPA",
      required: true,
      type: "text",
      textFieldProps: {
        placeholder: "e.g., 3.8 GPA, First Class Honours, A+",
      },
      gridProps: { xs: 12, md: 3 },
    },
    {
      name: "startYear",
      label: "Year of Admission",
      type: "search-select",
      gridProps: { xs: 12, md: 3 },
      textFieldProps: {
        placeholder: "e.g., 2019",
      },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      required: true,
    },
    {
      name: "endYear",
      label: "Year of Graduation",
      type: "search-select",
      gridProps: { xs: 12, md: 3 },
      textFieldProps: {
        placeholder: "e.g., 2023",
      },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      rules: {
        validate: (value, formValues) => {
          const allValues = formValues as EducationData;
          return !value ||
            !allValues?.startYear ||
            Number(value) >= Number(allValues.startYear)
            ? true
            : "End Year must be after Start Year";
        },
      },
      required: true,
    },
    {
      name: "country.code",
      type: "search-select",
      gridProps: { xs: 12, md: 4 },
      label: "Country of Institute",
      required: true,
      textFieldProps: {
        placeholder: "e.g., United States, India, United Kingdom",
      },
      options: countries.data.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    },
  ];

  const onSubmit = async (formData: Partial<EducationData>) => {
    const country =
      countries.data.find(
        (country) => country.isoCode === formData?.country?.code,
      ) || null;
    const body = {
      ...formData,
      country: { code: country?.isoCode, name: country?.name },
      seekerId: seekerId,
    };
    if (body.id) {
      await update(API_UPDATE_SEEKER_EDUCATION, { body }, TAGS.education);
    } else {
      await update(
        API_CREATE_SEEKER_EDUCATION,
        { method: "POST", body },
        TAGS.education,
      );
    }
  };

  const deleteHandler = async (data: EducationData) => {
    await onDelete(
      API_DELETE_SEEKER_EDUCATION + data.id,
      {
        method: "DELETE",
      },
      TAGS.education,
    );
  };

  return (
    <FormModal
      open={isOpen}
      error={error?.message}
      loading={isLoading}
      deleteLoading={isDeleting}
      onClose={handleClose}
      onDelete={initialValues?.id ? deleteHandler : undefined}
      onSubmit={onSubmit}
      fields={fields}
      deleteButtonText="Delete Education"
      title="Add Education"
      initialValues={initialValues}
    />
  );
};

export default EducationModal;
