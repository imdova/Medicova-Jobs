"use client";

import { Button, CircularProgress, Typography } from "@mui/material";
import { Company } from "@/types";
import { useSession } from "next-auth/react";
import MainInformation from "@/components/pages/companyInfo/Main-Information";
import LocationSelection from "@/components/pages/companyInfo/LocationSelection";
import SectorSelection from "@/components/pages/companyInfo/SectorSelection";
import CompanyOwnership from "@/components/pages/companyInfo/CompanyOwnership";
import CompanyContactInputs from "@/components/pages/companyInfo/CompanyContacInputs";
import CompanyImage from "@/components/pages/companyInfo/CompanyImage";
import { API_UPDATE_COMPANY } from "@/api/employer";
import useUpdateApi from "@/hooks/useUpdateApi";
import { useForm } from "react-hook-form";
import { TAGS } from "@/api";
import useIsLeaving from "@/hooks/useIsLeaving";
import React from "react";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";

const CompanyInfoForm: React.FC<{ company: Company }> = ({ company }) => {
  const { update: updateSession } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: company,
  });

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const { isLoading, error, update } = useUpdateApi<Company>(handleSuccess);

  const handleUpdate = async (formData: Partial<Company>) => {
    await update(API_UPDATE_COMPANY, {
      body: formData,
    },TAGS.company);
    // reset the form
    reset(formData);
  };

  async function handleSuccess(updatedCompany: Company) {
    await updateSession({
      companyName: updatedCompany.name,
      companyEmail: updatedCompany.email,
    });
    // window.location.reload();
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
            <div className="mb-4 rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-soft">
              <MainInformation control={control} errors={errors} />
              <SectorSelection
                control={control}
                watch={watch}
                setValue={setValue}
              />
            </div>
            <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-soft">
              <CompanyOwnership control={control} errors={errors} />
              <CompanyContactInputs control={control} errors={errors} />
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-80">
            <div className="mb-4 rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-soft">
              <h5 className="text-2xl font-semibold text-main md:mt-4">
                Company Images
              </h5>
              <CompanyImage company={company} />
            </div>
            <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-soft">
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
          <div className="sticky bottom-2 z-30 flex justify-end rounded-base border border-gray-100 bg-white p-3 shadow-soft md:static md:justify-start md:p-5">
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
    </>
  );
};
export default CompanyInfoForm;
