"use client";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Company, UserState } from "@/types";
import {
  createCompany,
  getCompanyById,
  getTypeById,
  updateCompany,
} from "@/lib/actions/employer.actions";
import { useSession } from "next-auth/react";
import LocationSelection from "./LocationSelection";
import SectorSelection from "./SectorSelection";
import { hasDataChanged } from "@/util";
import { usePrompt } from "@/hooks/usePrompt";
import MainInformation from "./Main-Information";
import CompanyOwnership from "./CompanyOwnership";
import CompanyContactInputs from "./CompanyContacInputs";

const initialCompany: Company = {
  id: "",
  name: "",
  about: "",
  isPrivate: true,
  isProfitable: true,
  status: "active",
  countryCode: "",
  stateCode: "",
  city: "",
  size: null,
  phone: "",
  email: "",
  yearFounded: "",
  typeId: "",
};

const CompanyInfoForm: React.FC = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [data, setData] = useState<Company>(initialCompany);
  const [isDirty, setIsDirty] = useState(false); // Tracks if the form has unsaved changes.

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
    if (!phone) {
      error.phone = "Phone number is required";
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
  usePrompt("You have unsaved changes. Leave screen?", isDirty); // Prompts the user if they attempt to leave with unsaved changes.
  useEffect(() => {
    if (company && data) {
      setIsDirty(hasDataChanged(company, data));
    }
  }, [data, company]);

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
    const result = await createCompany(data);
    if (result.success && result.data) {
      const newCompany = result.data;
      setData(newCompany); // Set the form data with the fetched company data
      setCompany(newCompany);
      setIsDirty(false);
      update({
        companyId: newCompany.id,
      });
      reloadSession();
      setLoading(false);
      console.log("Company created successfully");
    } else {
      setLoading(false);
      setError(result.message);
    }
  };
  const handleUpdate = async () => {
    const result = await updateCompany(data);
    if (result.success && result.data) {
      const newCompany = result.data;
      setData(newCompany); // Set the form data with the fetched company data
      setCompany(newCompany);
      setIsDirty(false);
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
        setIsDirty(false);
      }
    } catch (error) {
      console.error("Failed to fetch company data", error);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchCompanyData(companyId);
    }
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
    <form
      className="rounded-base border-gray-100 bg-white p-3 md:border md:p-5 md:shadow-lg"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* <Alert severity="warning" sx={{ mb: 2 }}>
                You cannot save an empty value for a question!
              </Alert> */}
      {/* Main Information Form Fields */}
      <MainInformation
        data={data}
        handleChange={handleChange}
        errors={errors}
      />

      {/* Company Sector and Company Type Selectors */}
      <SectorSelection data={data} setData={setData} errors={errors} />

      {/* Location Selection */}
      <LocationSelection data={data} setData={setData} errors={errors} />

      {/* Company Ownership Form Fields */}
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

      <p className="text-center text-red-500">{error}</p>
      {/* Centered Save Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={loading || (company?.id ? !isDirty : false)}
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
