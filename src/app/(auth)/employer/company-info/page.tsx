"use client";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Company, UserState } from "@/types";
import {
  createCompany,
  getCompanyById,
  updateCompany,
} from "@/lib/actions/employer.actions";
import { useSession } from "next-auth/react";
import LocationSelection from "./LocationSelection";
import SectorSelection from "./SectorSelection";
import { hasDataChanged } from "@/util";
import MainInformation from "./Main-Information";
import CompanyOwnership from "./CompanyOwnership";
import CompanyContactInputs from "./CompanyContacInputs";
import CompanyImage from "./CompanyImage";

const CompanyInfoForm: React.FC = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [data, setData] = useState<Company>({
    isPrivate: true,
    isProfitable: true,
  } as Company);

  const { data: session, status, update } = useSession();
  const user = session?.user as UserState;
  const companyId = user?.companyId;

  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    typeId: "",
    name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = <K extends keyof Company>(
    name: K,
    value: Company[K],
  ) => {
    setErrors({ ...errors, [name]: "" });
    setData({ ...data, [name]: value });
  };

  const validateForm = () => {
    const { email, phone, typeId, name } = data;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const error = {
      email: "",
      name: "",
      phone: "",
      typeId: "",
    };

    if (!emailRegex.test(email || "")) {
      error.email = "Enter a valid email address";
    }
    if (phone && phone.length < 10) {
      error.phone = "Phone number is invalid";
    }
    if (!name) {
      error.name = "name is required";
    }
    if (!typeId) {
      error.typeId = "Type is required";
    }

    setErrors(error);
    return Object.keys(error).every(
      (key) => error[key as keyof typeof error] === "",
    );
  };

  // Effect to determine if the form data has been modified.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (validateForm()) {
      setLoading(true);
      if (companyId) {
        handleUpdate();
      } else {
        handleCreate();
      }
    }
  };

  const handleCreate = async () => {
    const result = await createCompany(data, user?.id || "");
    if (result.success && result.data) {
      const newCompany = result.data;
      setData(newCompany); // Set the form data with the fetched company data
      setCompany(newCompany);
      update({
        companyId: newCompany.id,
        companyName: newCompany.name,
        companyPhoto: newCompany.logo,
      });
      reloadSession();
      setLoading(false);
      window.location.href = "/co/" + newCompany.id;
      console.log("Company created successfully");
    } else {
      setLoading(false);
      setError(result.message);
    }
  };
  const handleUpdate = async () => {
    const result = await updateCompany(data);
    if (result.success && result.data) {
      const updatedCompany = result.data;
      setData(updatedCompany); // Set the form data with the fetched company data
      setCompany(updatedCompany);
      update({
        companyName: updatedCompany.name,
        companyPhoto: updatedCompany.logo,
        companyEmail: updatedCompany.email,
      });
      setLoading(false);
      console.log("Company Updated successfully");
    } else {
      setLoading(false);
      setError(result.message);
    }
  };

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const fetchCompanyData = async (id: string) => {
    setFormLoading(true);
    try {
      const result = await getCompanyById(id);
      if (result.success && result.data) {
        const newCompany = result.data;
        setData(newCompany); // Set the form data with the fetched company data
        setCompany(newCompany);
      }
    } catch (error) {
      console.error("Failed to fetch company data", error);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    if (companyId && !company) {
      fetchCompanyData(companyId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  if (formLoading || status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
        <h6 className="ml-4">Loading...</h6>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-8 flex gap-4">
        <div className="flex-1">
          <div className="mb-4 rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
            <MainInformation
              data={data}
              handleChange={handleChange}
              errors={errors}
            />
            <SectorSelection data={data} setData={setData} errors={errors} />
          </div>
          <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
            <CompanyOwnership
              data={data}
              handleChange={handleChange}
              errors={errors}
            />

            {/* Company Contact Information Form Fields */}
            <CompanyContactInputs
              data={data}
              handleChange={handleChange}
              errors={errors}
            />
          </div>
        </div>
        <div className="w-80">
          <div className="mb-4 rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
            <h5 className="mb-4 text-2xl font-semibold text-main md:mt-4">
              Company Images
            </h5>
            <CompanyImage />
          </div>
          {/* <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg"></div> */}
          <div className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg">
            <h5 className="mb-8 text-2xl font-semibold text-main md:mt-4">
              Company Location
            </h5>
            <LocationSelection data={data} setData={setData} errors={errors} />
          </div>
        </div>
      </div>

      <p className="text-center text-red-500">{error}</p>
      {/* Centered Save Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          className="text-lg"
        >
          {loading
            ? "Loading..."
            : company?.id
              ? "Update Company"
              : "Create Company"}
        </Button>
      </div>
    </form>
  );
};

export default CompanyInfoForm;
