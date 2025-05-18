"use client";

import { Button, CircularProgress, Typography } from "@mui/material";
import { Company } from "@/types";
import { useSession } from "next-auth/react";
import MainInformation from "@/components/pages/companyInfo/Main-Information";
import LocationSelection from "@/components/pages/companyInfo/LocationSelection";
import SectorSelection from "@/components/pages/companyInfo/SectorSelection";
import CompanyOwnership from "@/components/pages/companyInfo/CompanyOwnership";
import CompanyImage from "@/components/pages/companyInfo/CompanyImage";
import { API_UPDATE_COMPANY } from "@/api/employer";
import useUpdateApi from "@/hooks/useUpdateApi";
import { Path, useForm } from "react-hook-form";
import { TAGS } from "@/api";
import useIsLeaving from "@/hooks/useIsLeaving";
import React from "react";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import { getNestedValue } from "@/util/forms";

const defaultKeys: Path<Company>[] = [
  "avatar",
  "banner1",
  "banner2",
  "banner3",
  "name",
  "title",
  "about",
  "companySectorId",
  "companySectorName",
  "companyTypeId",
  "companyTypeName",
  "isPrivate",
  "isProfitable",
  "size",
  "yearFounded",
  "state.code",
  "state.name",
  "country.code",
  "country.name",
  "city",
];
function getDefaultValues<T>(
  array: Path<T>[],
  initialValues?: T,
  isNullable = false,
): T {
  const result = array.reduce((acc, path) => {
    const parts = String(path).split(".");
    let current = acc;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }

    const lastPart = parts[parts.length - 1];
    const value = initialValues
      ? getNestedValue(initialValues, path) || (isNullable ? null : "")
      : isNullable
        ? null
        : "";
    current[lastPart] = value;

    return acc;
  }, {} as any);

  return result as T;
}

const CompanyInfoForm: React.FC<{ company: Company }> = ({ company }) => {
  const { update: updateSession } = useSession();
  const {
    isLoading,
    error,
    update,
    reset: resetApi,
  } = useUpdateApi<Company>(handleSuccess);
  const defaultValues = getDefaultValues<Company>(defaultKeys, company);
  const formMethods = useForm({ defaultValues });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
  } = formMethods;

  const handleReset = (values: Company) => {
    reset(values);
    resetApi(values);
  };

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const handleUpdate = async (formData: Company) => {
    const body = getDefaultValues<Company>(defaultKeys, formData, true);
    body.id = company.id;
    update(API_UPDATE_COMPANY, { body }, TAGS.company);
  };

  async function handleSuccess(updatedCompany: Company) {
    await updateSession({
      companyName: updatedCompany.name,
      companyEmail: updatedCompany.email,
      companyPhoto: updatedCompany.avatar,
    });
    const newDefaultValues = getDefaultValues<Company>(
      defaultKeys,
      updatedCompany,
    );
    handleReset(newDefaultValues);
  }

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
      <form onSubmit={handleSubmit(handleUpdate)} noValidate>
        <div className="mb-8 flex flex-col gap-4 px-2 md:flex-row md:px-0">
          <div className="flex-1">
            <div className="mb-4 rounded-base border-gray-200 bg-white p-3 md:border md:p-5 md:shadow-soft">
              <MainInformation formMethods={formMethods} />
              <SectorSelection
                control={control}
                watch={watch}
                setValue={setValue}
              />
            </div>
            <div className="rounded-base border-gray-200 bg-white p-3 md:border md:p-5 md:shadow-soft">
              <CompanyOwnership control={control} errors={errors} />
              {/* <CompanyContactInputs control={control} errors={errors} /> */}
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-80">
            <div className="mb-4 rounded-base border-gray-200 bg-white p-3 md:border md:p-5 md:shadow-soft">
              <h5 className="text-2xl font-semibold text-main md:mt-4">
                Company Images
              </h5>
              <CompanyImage company={company} />
            </div>
            <div className="rounded-base border-gray-200 bg-white p-3 md:border md:p-5 md:shadow-soft">
              <h5 className="mb-8 text-2xl font-semibold text-main md:mt-4">
                Company Location
              </h5>
              <LocationSelection
                control={control}
                errors={errors}
                setValue={setValue}
                watch={watch}
              />
            </div>
          </div>
        </div>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error.message}
          </Typography>
        )}

        {(!company.name || isDirty || isLoading) && (
          <div className="sticky bottom-2 z-30 flex justify-end rounded-base border border-gray-200 bg-white p-3 shadow-soft md:static md:justify-start md:p-5">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            {isDirty && (
              <Button
                onClick={() => handleReset(defaultValues)}
                variant="text"
                size="large"
                className="ml-2"
              >
                Reset
              </Button>
            )}
          </div>
        )}
      </form>
    </>
  );
};
export default CompanyInfoForm;
