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
  API_UPDATE_SEEKER,
  API_UPDATE_SEEKER_EXPERIENCE,
} from "@/api/seeker";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<ExperienceData>;
  seekerId?: string;
  seekerTitle?: string | null;
};

type OptExperienceData = ExperienceData & {
  startYear: string;
  endYear: string;
  startMonth: string;
  endMonth: string;
};

const years = Array.from(
  { length: new Date().getFullYear() - 1980 + 1 },
  (v, k) => k + 1980,
).reverse();
const months = [
  { full: "January", short: "Jan", number: "01" },
  { full: "February", short: "Feb", number: "02" },
  { full: "March", short: "Mar", number: "03" },
  { full: "April", short: "Apr", number: "04" },
  { full: "May", short: "May", number: "05" },
  { full: "June", short: "Jun", number: "06" },
  { full: "July", short: "Jul", number: "07" },
  { full: "August", short: "Aug", number: "08" },
  { full: "September", short: "Sep", number: "09" },
  { full: "October", short: "Oct", number: "10" },
  { full: "November", short: "Nov", number: "11" },
  { full: "December", short: "Dec", number: "12" },
];
const ExperienceModal = ({
  isOpen,
  onClose,
  initialValues: values,
  seekerId,
  seekerTitle,
}: PostJobModalProps) => {
  const initialValues: Partial<OptExperienceData> = values
    ? {
        ...values,
        startYear: values.startDate?.split("-")[0],
        endYear: values.isPresent ? "" : values.endDate?.split("-")[0],
        startMonth: values.startDate?.split("-")[1],
        endMonth: values.isPresent ? "" : values.endDate?.split("-")[1],
      }
    : {};

  const { isLoading, error, update, reset } = useUpdateApi(handleClose);
  const { isLoading: isDeleting, update: onDelete } = useUpdateApi(handleClose);

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

  function handleClose() {
    reset();
    onClose();
    setCountryCode("");
  }
  const fields: FieldConfig<OptExperienceData>[] = [
    {
      name: "title",
      type: "text",
      label: "Job Title",
      textFieldProps: { placeholder: "Enter Job Title" },
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: "Company | Organization",
      textFieldProps: { placeholder: "Enter Company" },
    },
    {
      name: "startYear",
      type: "search-select",
      label: "Start Year",
      gridProps: { xs: 12, md: 3 },
      textFieldProps: { placeholder: "Start Year" },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      required: true,
    },
    {
      name: "startMonth",
      label: "Start Month",
      type: "search-select",
      gridProps: { xs: 12, md: 3 },
      textFieldProps: { placeholder: "Start Month" },
      options: months.map((month) => ({
        value: month.number,
        label: month.full,
      })),

      required: true,
    },
    {
      // TODO: add Validations for the year and month
      name: "endYear",
      label: "End Year",
      type: "search-select",
      gridProps: { xs: 12, md: 3 },
      textFieldProps: { placeholder: "End Year" },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      rules: {
        validate: (value, formValues) => {
          const allValues = formValues as OptExperienceData;
          return !value ||
            !allValues?.startYear ||
            Number(value) >= Number(allValues.startYear)
            ? true
            : "End Year must be after start year";
        },
      },
      required: true,
    },
    {
      name: "endMonth",
      label: "End Month",
      type: "search-select",
      gridProps: { xs: 12, md: 3 },
      textFieldProps: { placeholder: "End Month" },
      options: months.map((month) => ({
        value: month.number,
        label: month.full,
      })),
      // rules: {
      //   validate: (value, formValues) => {
      //     const allValues = formValues as OptExperienceData;
      //     return allValues.startYear === allValues.startYear
      //       ? Number(value) > Number(allValues.startMonth)
      //         ? true
      //         : "End Month must be after start Month"
      //       : true;
      //   },
      // },
      required: true,
    },
    {
      name: "isPresent",
      label: "I currently work there",
      type: "checkbox",
      resetFields: ["endYear", "endMonth"],
      hideFieldNames: ["endYear", "endMonth"], // Multiple fields to hide
      gridProps: { xs: 12, md: 4 },
    },
    {
      name: "country.code",
      type: "search-select",
      label: "Country",
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
      gridProps: { xs: 12, md: 4 },
    },
    {
      name: "state.code",
      type: "search-select",
      label: "State",
      required: true,
      dependsOn: "country.code",
      textFieldProps: {
        placeholder: "Select state",
      },
      options: states.data.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 12, md: 3 },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      required: true,
      textFieldProps: {
        placeholder: "Enter City",
      },
      gridProps: { xs: 12, md: 3 },
      rules: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  const onSubmit = async (formData: Partial<OptExperienceData>) => {
    const { state: formState, country: formCountry } = formData;
    const country =
      countries.data.find((country) => country.isoCode === formCountry?.code) ||
      null;
    const state =
      states.data.find((state) => state.isoCode === formState?.code) || null;

    const startDate = formData.startYear + "-" + formData.startMonth;
    const endDate = formData.isPresent
      ? null
      : formData.endYear + "-" + formData.endMonth;

    const body = {
      ...formData,
      seekerId: seekerId,
      country: { code: country?.isoCode, name: country?.name },
      state: { code: state?.isoCode, name: state?.name },
      startDate,
      endDate,
    };
    if (body.id) {
      const isTitleExperience =
        seekerTitle === `EXPERIENCE: ${values?.title} at ${values?.name}`;
      const title = seekerTitle
        ? isTitleExperience
          ? `EXPERIENCE: ${body.title} at ${body.name}`
          : null
        : `EXPERIENCE: ${body.title} at ${body.name}`;

      await update(API_UPDATE_SEEKER_EXPERIENCE, { body }, TAGS.experience);
      if (title) {
        update(
          API_UPDATE_SEEKER,
          { body: { id: seekerId, title } },
          TAGS.profile,
        );
      }
    } else {
      await update(
        API_CREATE_SEEKER_EXPERIENCE,
        { method: "POST", body },
        TAGS.experience,
      );
      const title = seekerTitle
        ? seekerTitle.includes("EXPERIENCE:")
          ? `EXPERIENCE: ${body.title} at ${body.name}`
          : null
        : `EXPERIENCE: ${body.title} at ${body.name}`;
      if (title) {
        update(
          API_UPDATE_SEEKER,
          { body: { id: seekerId, title } },
          TAGS.profile,
        );
      }
    }
  };

  const deleteHandler = async (data: ExperienceData) => {
    await onDelete(
      API_DELETE_SEEKER_EXPERIENCE + data.id,
      {
        method: "DELETE",
      },
      TAGS.experience,
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
      deleteButtonText="Delete Experience"
      title="Add Experience"
      initialValues={initialValues}
    />
  );
};

export default ExperienceModal;
