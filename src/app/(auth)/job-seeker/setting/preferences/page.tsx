"use client";
import React, { useEffect } from "react";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import useFetch from "@/hooks/useFetch";
import {
  API_CREATE_CAREER_PREFERENCE,
  API_GET_CAREER_PREFERENCES_BY_SEEKER_ID,
  API_UPDATE_CAREER_PREFERENCE,
} from "@/api/seeker";
import { CareerPreference, FieldConfig, Industry } from "@/types";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import useUpdateApi from "@/hooks/useUpdateApi";
import { useForm } from "react-hook-form";
import useIsLeaving from "@/hooks/useIsLeaving";
import { API_GET_EMPLOYMENT_TYPES, API_GET_INDUSTRIES } from "@/api/admin";
import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { jobWorkPlaceOptions } from "@/constants/job";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import { notFound } from "next/navigation";

interface CareerPreferenceFormProps {
  defaultValues: Partial<CareerPreference>;
}

const CareerPreferenceForm: React.FC<CareerPreferenceFormProps> = ({
  defaultValues,
}) => {
  const {
    isLoading,
    error,
    update,
    reset: resetApi,
  } = useUpdateApi<Partial<CareerPreference>>();

  const formMethods = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
    setValue,
  } = formMethods;

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const submit = (formData: Partial<CareerPreference>) => {
    const body: Partial<CareerPreference> = {
      ...formData,
      availableForHiringDate: formData.availableForHiringDate
        ? new Date().toISOString()
        : null,
    };
    if (formData.id) {
      update(API_UPDATE_CAREER_PREFERENCE, { body });
    } else {
      update(API_CREATE_CAREER_PREFERENCE, { method: "POST", body });
    }
  };

  const { data: industries } =
    useFetch<PaginatedResponse<Industry>>(API_GET_INDUSTRIES);
  const { data: employmentTypes } = useFetch<PaginatedResponse<Industry>>(
    API_GET_EMPLOYMENT_TYPES,
  );

  const country = watch("country");

  const { countries, states } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (country?.code) {
      dispatch(fetchStates(country?.code));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country?.code]);

  return (
    <>
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />

      <form onSubmit={handleSubmit(submit)} className="space-y-2">
        <div className="flex items-center justify-between rounded-base border border-gray-200 bg-primary-100 p-[16px] text-start shadow-soft">
          {/* Title and Description */}
          <div>
            <FormField
              field={
                {
                  name: "availableForHiringDate",
                  label: "Available for immediate hiring",
                  type: "checkbox",
                } as FieldConfig<CareerPreference>
              }
              control={control}
            />
            <p className="text-secondary">
              Let companies know you can start immediately by adding
              the Immediate start badge to your profile
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-base border border-gray-200 bg-white p-5 shadow-soft">
          <h5 className="text-xl font-semibold text-main md:mt-4 lg:w-1/2">
            Specify your job preference setting accurately to help reach the
            right opportunity
          </h5>
          {/* personal info */}

          <FormField
            field={
              {
                name: "industriesIds",
                type: "radio",
                multiple: true,
                label: "Industries",
                options: industries?.data.map((industry) => ({
                  label: industry.name,
                  value: industry.id,
                })),
              } as FieldConfig<CareerPreference>
            }
            control={control}
          />
          <FormField
            field={
              {
                name: "relocation",
                label:
                  "willing to relocate to another city or country if I find the right opportunity?",
                type: "checkbox",
              } as FieldConfig<CareerPreference>
            }
            control={control}
          />

          {/* personal info */}
        </div>
        <div className="space-y-4 rounded-base border border-gray-200 bg-white p-5 shadow-soft">
          <h5 className="text-xl font-semibold text-main md:mt-4 lg:w-1/2">
            What is your preferred workplace settings?
          </h5>
          <div className="flex w-full gap-4">
            <div className="flex-1">
              <FormField
                field={
                  {
                    name: "jobEmploymentTypesIds",
                    type: "radio",
                    multiple: true,
                    label: "Type of Employment",
                    options: employmentTypes?.data.map((type) => ({
                      label: type.name,
                      value: type.id,
                    })),
                  } as FieldConfig<CareerPreference>
                }
                control={control}
              />
            </div>
            <div className="flex-1">
              <FormField
                field={
                  {
                    name: "jobWorkPlace",
                    type: "radio",
                    label: "Work Place",
                    options: jobWorkPlaceOptions.map((item) => ({
                      label: item.label,
                      value: item.id,
                    })),
                  } as FieldConfig<CareerPreference>
                }
                control={control}
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-full">
              <FormField
                field={
                  {
                    name: "country.code",
                    type: "search-select",
                    label: "Country",
                    resetFields: ["state.code", "city"],
                    textFieldProps: {
                      placeholder: "Select country",
                    },
                    options: countries.data.map((country) => ({
                      value: country.isoCode,
                      label: country.name,
                    })),
                    onChange: (value) =>
                      setValue(
                        "country.name",
                        countries.data.find(
                          (country) => country.isoCode === value,
                        )?.name || "",
                      ),
                  } as FieldConfig<CareerPreference>
                }
                control={control}
              />
            </div>
            <div className="w-full">
              <FormField
                field={
                  {
                    name: "state.code",
                    type: "search-select",
                    label: "State",
                    dependsOn: "country.code",
                    textFieldProps: {
                      placeholder: "Select state",
                    },
                    onChange: (value) =>
                      setValue(
                        "state.name",
                        states.data.find((state) => state.isoCode === value)
                          ?.name || "",
                      ),
                    options: states.data.map((state) => ({
                      value: state.isoCode,
                      label: state.name,
                    })),
                    gridProps: { xs: 6, md: 4 },
                  } as FieldConfig<CareerPreference>
                }
                control={control}
              />
            </div>
          </div>
        </div>

        {(isDirty || isLoading) && (
          <div className="sticky bottom-2 z-30 flex justify-end rounded-base border border-gray-200 bg-white p-3 shadow-soft md:static md:justify-start md:p-5">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !isValid}
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              onClick={() => reset()}
              variant="text"
              size="large"
              className="ml-2"
            >
              Reset
            </Button>
          </div>
        )}
      </form>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => resetApi()}
      >
        <Alert
          onClose={() => resetApi()}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const CareerPreferencePage = () => {
  const { data: session, status } = useSession();
  const sessionUser = session?.user;
  const { data: careerPreference, loading } = useFetch<CareerPreference>(
    sessionUser?.id
      ? API_GET_CAREER_PREFERENCES_BY_SEEKER_ID + sessionUser.id
      : null,
    {
      defaultLoading: true,
    },
  );

  if (status === "loading" || loading)
    return (
      <div className="flex h-full min-h-[70vh] items-center justify-center">
        <CircularProgress />
        <h6 className="ml-4">Loading...</h6>
      </div>
    );
  if (status === "unauthenticated") return notFound();

  const defaultValues: Partial<CareerPreference> = {
    id: careerPreference?.id,
    seekerId: sessionUser?.id || null,
    jobEmploymentTypesIds: careerPreference?.jobEmploymentTypesIds || [],
    industriesIds: careerPreference?.industriesIds || [],
    availableForHiringDate: careerPreference?.availableForHiringDate || "",
    relocation: careerPreference?.relocation || false,
    jobWorkPlace: careerPreference?.jobWorkPlace || null,
    country: careerPreference?.country || { code: "", name: "" },
    state: careerPreference?.state || { code: "", name: "" },
  };

  return <CareerPreferenceForm defaultValues={defaultValues} />;
};

export default CareerPreferencePage;
