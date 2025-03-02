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
    // TODO: add Is dirty handing
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
        window.location.reload();
    }


    return (
        <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <div className="px-2 md:px-0 mb-8 flex gap-4 flex-col md:flex-row">
                <div className="flex-1">
                    <div className="mb-4 rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-soft">
                        <MainInformation control={control} errors={errors} />
                        <SectorSelection control={control} watch={watch} setValue={setValue} />
                    </div>
                    <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-soft">
                        <CompanyOwnership control={control} errors={errors} />
                        <CompanyContactInputs control={control} errors={errors} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="md:w-80">
                    <div className="mb-4 rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-soft">
                        <h5 className=" text-2xl font-semibold text-main md:mt-4">
                            Company Images
                        </h5>
                        <CompanyImage company={company} />
                    </div>
                    <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-soft">
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

            <div className="sticky bottom-2 z-30 md:static flex justify-end rounded-base border-gray-100 bg-white p-3 border md:p-5 shadow-soft">
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
