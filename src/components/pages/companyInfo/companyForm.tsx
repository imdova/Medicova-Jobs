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

const CompanyInfoForm: React.FC<{ company: Company }> = ({ company }) => {
    const { update: updateSession } = useSession();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        defaultValues: company,
    });
    const { isLoading, error, update } =
        useUpdateApi<Company>(handleSuccess);

    const handleUpdate = async (formData: Partial<Company>) => {
        await update(API_UPDATE_COMPANY, {
            body: formData,
        }, TAGS.company);
    };

    async function handleSuccess(updatedCompany: Company) {
        await updateSession({
            companyName: updatedCompany.name,
            companyPhoto: updatedCompany.avatar,
            companyEmail: updatedCompany.email,
            companyUserName: updatedCompany.username,
        });
    }


    return (
        <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <div className="mb-8 flex gap-4">
                <div className="flex-1">
                    <div className="mb-4 rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
                        <MainInformation control={control} errors={errors} />
                        <SectorSelection control={control} watch={watch} setValue={setValue} errors={errors} />
                    </div>
                    <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
                        <CompanyOwnership control={control} errors={errors} />
                        <CompanyContactInputs control={control} errors={errors} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-80">
                    <div className="mb-4 rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
                        <h5 className="mb-4 text-2xl font-semibold text-main md:mt-4">
                            Company Images
                        </h5>
                        <CompanyImage company={company} />
                    </div>
                    <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
                        <h5 className="mb-8 text-2xl font-semibold text-main md:mt-4">
                            Company Location
                        </h5>
                        <LocationSelection control={control} errors={errors} setValue={setValue} watch={watch} />
                    </div>
                </div>
            </div>

            {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                    {error.message}
                </Typography>
            )}

            <div className="flex justify-center rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    size="large"
                    startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                    {isLoading ? "Processing..." : "Update Company"}
                </Button>
            </div>
        </form>
    );
};
export default CompanyInfoForm;
