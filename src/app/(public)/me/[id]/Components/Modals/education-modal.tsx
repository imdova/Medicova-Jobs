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
      label: "Institute Name*",
      textFieldProps: {
        placeholder: "Enter The name of your College or University ",
      },
      required: true,
    },
    {
      name: "degree",
      type: "select",
      label: "Degree*",
      textFieldProps: { placeholder: "Select degree" },
      gridProps: { xs: 8, sm: 9 },
      options: educationOptions.map((x) => ({
        label: x.label,
        value: x.id,
      })),
    },
    {
      name: "grade",
      label: "Grade*",
      type: "text",
      textFieldProps: { placeholder: "grade" },
      gridProps: { xs: 4, sm: 3 },
    },
    {
      name: "startYear",
      label: "Start Year*",
      type: "search-select",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: { placeholder: "Start Year" },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      required: true,
    },
    {
      name: "endYear",
      label: "End Year*",
      type: "search-select",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: { placeholder: "End Year" },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      required: true,
    },
    {
      name: "countryCode",
      type: "search-select",
      label: "Country*",
      required: true,
      textFieldProps: {
        placeholder: "Select country",
      },
      options: countries.data.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      gridProps: { xs: 6, md: 4 },
    },
  ];

  const onSubmit = async (formData: Partial<EducationData>) => {
    const body = {
      ...formData,
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
