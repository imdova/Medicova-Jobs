"use client";
import { TAGS } from "@/api";
import {
  API_GET_COMPANY_SECTORS,
  API_GET_COMPANY_TYPES_BY_SECTOR,
} from "@/api/admin";
import { API_UPDATE_COMPANY } from "@/api/employer";
import FormModal from "@/components/form/FormModal/FormModal";
import ShareMenu from "@/components/UI/ShareMenu";
import useFetch from "@/hooks/useFetch";
import { useLocationData } from "@/hooks/useLocationData";
import useUpdateApi from "@/hooks/useUpdateApi";
import { Company, FieldConfig, Sector } from "@/types";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface EmployerHeaderSectionProps {
  isEmployee: boolean;
  company: Company;
}

const EditCompanySection: React.FC<EmployerHeaderSectionProps> = ({
  company,
  isEmployee,
}) => {
  const { update: updateSession } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error, update, reset } =
    useUpdateApi<Company>(handleSuccess);

  // sector selection
  const [sector, setSector] = useState<Sector | null>(null);
  const { data: sectorsData } = useFetch<PaginatedResponse<Sector>>(
    API_GET_COMPANY_SECTORS,
    {},
    (sectors) =>
      setSector(
        sectors.data?.find(
          (sector) => sector.id === company?.companySectorId,
        ) || null,
      ),
  );
  const { data: typesData } = useFetch<PaginatedResponse<Sector>>(
    sector ? API_GET_COMPANY_TYPES_BY_SECTOR + sector.id : null,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );

  const sectors = sectorsData?.data || [];
  const types = typesData?.data || [];

  // location selection
  const [countryCode, setCountryCode] = useState(company?.country?.code || "");
  const { countries, states } = useLocationData(countryCode);

  const handleUpdate = async (formData: Partial<Company>) => {
    const {
      name,
      title,
      city,
      companySectorId,
      companyTypeId,
      state: formState,
      country: formCountry,
    } = formData;
    const sector =
      sectors.find((sector) => sector.id === companySectorId) || null;
    const type = types.find((type) => type.id === companyTypeId) || null;
    const country =
      countries.find((country) => country.isoCode === formCountry?.code) ||
      null;
    const state =
      states.find((state) => state.isoCode === formState?.code) || null;
    const body = {
      id: company?.id,
      companySectorId: sector?.id,
      companySectorName: sector?.name,
      companyTypeId: type?.id,
      companyTypeName: type?.name,
      country: { code: country?.isoCode, name: country?.name },
      state: { code: state?.isoCode, name: state?.name },
      name,
      title,
      city,
    } as Company;
    await update(API_UPDATE_COMPANY, { body }, TAGS.company);
  };

  const open = () => setIsModalOpen(true);
  const onClose = () => {
    setIsModalOpen(false);
    reset();
    setCountryCode(company?.country?.code || "");
    setSector(
      sectors?.find((sector) => sector.id === company?.companySectorId) || null,
    );
  };

  async function handleSuccess(updatedCompany: Company) {
    onClose();
    await updateSession({
      companyName: updatedCompany.name,
    });
  }
  const fields: FieldConfig[] = [
    {
      name: "name",
      type: "text",
      label: "Company Name",
      textFieldProps: {
        placeholder: "Enter the Name of Your Company",
      },
      gridProps: { xs: 12, md: 6 },
      rules: {
        minLength: { value: 2, message: "Name must be at least 2 characters" },
      },
    },
    {
      name: "title",
      type: "text",
      label: "Company Title",
      textFieldProps: {
        placeholder: "Enter Your Company Title",
      },
      rules: {
        minLength: { value: 2, message: "Title must be at least 2 characters" },
      },
    },
    {
      name: "companySectorId",
      type: "select",
      label: "Sector",
      textFieldProps: {
        placeholder: "Select Your Company Sector",
      },
      resetFields: ["companyTypeId"],
      required: true,
      onChange: (value) =>
        setSector(sectors?.find((sector) => sector.id === value) || null),
      options: sectors.map((sector) => ({
        value: sector.id,
        label: sector.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "companyTypeId",
      type: "select",
      label: "type",
      dependsOn: "companySectorId",
      required: true,
      textFieldProps: {
        placeholder: "Select Company Type",
      },
      options: types.map((type) => ({ value: type.id, label: type.name })),
      gridProps: { xs: 6 },
    },
    {
      name: "country.code",
      type: "search-select",
      label: "Country",
      resetFields: ["state.code"],
      textFieldProps: {
        placeholder: "Select country",
      },
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value) => setCountryCode(value),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "state.code",
      type: "search-select",
      label: "State",
      dependsOn: "country.code",
      textFieldProps: {
        placeholder: "Select state",
      },
      options: states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      textFieldProps: {
        placeholder: "Enter City",
      },
      gridProps: { xs: 12, md: 4 },
      rules: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  const initialValues: Partial<Company> = {
    name: company?.name,
    title: company?.title,
    companySectorId: company?.companySectorId,
    companyTypeId: company?.companyTypeId,
    state: company?.state || null,
    country: company?.country || null,
    city: company?.city,
  };
  return (
    <div className="col-span-12 sm:col-span-3">
      {isEmployee && (
        <FormModal
          open={isModalOpen}
          error={error?.message}
          loading={isLoading}
          onClose={onClose}
          onSubmit={handleUpdate}
          fields={fields}
          title="Company Main Information"
          initialValues={initialValues}
        />
      )}
      <div className="flex h-full flex-col items-center justify-center gap-2 sm:items-end">
        {/* Edit Button */}
        {isEmployee && (
          <IconButton onClick={open}>
            <Edit />
          </IconButton>
        )}
        {/* Share Button */}
        <ShareMenu path={`/co/${company.username}`} />
      </div>
    </div>
  );
};

export default EditCompanySection;
