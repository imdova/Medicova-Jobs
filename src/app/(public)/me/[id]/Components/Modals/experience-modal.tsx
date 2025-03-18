"use client";

import { TAGS } from "@/api";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types";
import { useEffect, useState } from "react";
import FormModal from "@/components/form/FormModal/FormModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import {
  API_CREATE_SEEKER_EXPERIENCE,
  API_DELETE_SEEKER_EXPERIENCE,
  API_UPDATE_SEEKER_EXPERIENCE,
} from "@/api/seeker";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<ExperienceData>;
  seekerId?: string;
};

const ExperienceModal = ({
  isOpen,
  onClose,
  initialValues = {},
  seekerId,
}: PostJobModalProps) => {
  const { isLoading, error, update, reset } = useUpdateApi();
  const { isLoading: isDeleting, update: onDelete } = useUpdateApi();

  // location selection
  const [countryCode, setCountryCode] = useState(
    initialValues?.country?.code || "",
  );

  const { countries, states } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (!countryCode) {
      setCountryCode(initialValues?.country?.code || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  useEffect(() => {
    dispatch(fetchStates(countryCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, isOpen]);

  const handleClose = () => {
    reset();
    onClose();
    setCountryCode("");
  };
  const fields: FieldConfig<ExperienceData>[] = [
    {
      name: "title",
      type: "text",
      label: "Job Title*",
      textFieldProps: { placeholder: "Enter Job Title" },
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: "Company | Organization*",
      textFieldProps: { placeholder: "Enter Company" },
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date*",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: { placeholder: "Start Date" },
      required: true,
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date*",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: { placeholder: "End Date" },
      required: true,
    },
    {
      name: "isPresent",
      label: "I currently work there",
      type: "checkbox",
      resetFields: ["endDate"],
      hideFieldNames: ["endDate"], // Multiple fields to hide
    },
    {
      name: "country.code",
      type: "search-select",
      label: "Country*",
      required: true,
      resetFields: ["state.code"],
      textFieldProps: {
        placeholder: "Select country",
      },
      options: countries.data.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value) => setCountryCode(value),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "state.code",
      type: "search-select",
      label: "State*",
      required: true,
      dependsOn: "country.code",
      textFieldProps: {
        placeholder: "Select state",
      },
      options: states.data.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "city",
      type: "text",
      label: "City*",
      required: true,
      textFieldProps: {
        placeholder: "Enter City",
      },
      gridProps: { xs: 12, md: 4 },
      validation: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  const onSubmit = async (formData: Partial<ExperienceData>) => {
    const { state: formState, country: formCountry } = formData;
    const country =
      countries.data.find((country) => country.isoCode === formCountry?.code) ||
      null;
    const state =
      states.data.find((state) => state.isoCode === formState?.code) || null;
    const body = {
      ...formData,
      seekerId: seekerId,
      country: { code: country?.isoCode, name: country?.name },
      state: { code: state?.isoCode, name: state?.name },
      endDate: formData.isPresent ? null : formData.endDate,
    };
    if (body.id) {
      await update(API_UPDATE_SEEKER_EXPERIENCE, { body }, TAGS.experience);
    } else {
      await update(
        API_CREATE_SEEKER_EXPERIENCE,
        { method: "POST", body },
        TAGS.experience,
      );
    }
    handleClose();
  };

  const deleteHandler = async (data: ExperienceData) => {
    await onDelete(API_DELETE_SEEKER_EXPERIENCE + data.id, {
      method: "DELETE",
    },TAGS.experience);
    handleClose();
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
      deleteButtonText="Delete Experience"
      title="Add Experience"
      initialValues={initialValues}
    />
  );
};

export default ExperienceModal;
