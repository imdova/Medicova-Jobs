"use client";
import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Link from "next/link";
import { Company, FieldConfig } from "@/types";
import { Edit } from "@mui/icons-material";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_COMPANY_USER_NAME } from "@/api/employer";
import { useSession } from "next-auth/react";
import FormModal from "@/components/form/FormModal/FormModal";
import { useRouter } from "next/navigation";

const userNameField: FieldConfig[] = [
  {
    name: "username",
    type: "text",
    required: true,
    textFieldProps: {
      label: "User Name",
      placeholder: "Enter User Name",
      InputProps: {
        startAdornment: <InputAdornment position="start">co/</InputAdornment>,
      },
    },
    rules: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters long",
      },
      maxLength: {
        value: 50,
        message: "Username cannot exceed 50 characters",
      },
      pattern: {
        value: /^[a-z0-9-_]+$/,
        message:
          "Username must contain only lowercase letters, numbers, hyphens, or underscores (no spaces or uppercase)",
      },
    },
  },
];

const CompanyPublicLink: React.FC<{ company: Company }> = ({ company }) => {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error, update, reset } =
    useUpdateApi<Company>(handleSuccess);
  const open = () => setIsModalOpen(true);
  const close = () => {
    setIsModalOpen(false);
    reset();
  };

  async function handleSuccess(updatedCompany: Company) {
    close();
    await updateSession({
      companyUserName: updatedCompany.username,
    });
    router.replace(`/co/${updatedCompany.username}`, { scroll: false });
  }

  const handleUpdate = async (formData: Partial<Company>) => {
    await update(API_UPDATE_COMPANY_USER_NAME, {
      body: { id: company.id, username: formData.username } as Company,
    });
  };

  return (
    <div className="mb-5 rounded-base border border-gray-100 bg-white p-3 shadow-soft md:p-5">
      {/* Title and Description */}
      <FormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleUpdate}
        error={error?.message}
        loading={isLoading}
        fields={userNameField}
        title="Enter Your user Name"
        initialValues={{ username: company.username }}
      />

      <div className="flex items-start justify-between">
        <h6 className="mb-2 text-2xl font-semibold text-main">
          Company Public Profile
        </h6>
        <IconButton
          onClick={open}
          className="rounded border border-solid border-gray-200 p-2"
        >
          <Edit />
        </IconButton>
      </div>
      {/* <div className="flex items-center justify-between">
        <label className="text-lg font-semibold text-main">
          Public Company Page
        </label>
        <Switch color="primary" defaultChecked />
      </div> */}
      <div className="my-1 flex items-center justify-between rounded-base bg-primary-100 p-2 py-3">
        <div>
          <p className="text-sm text-secondary">
            Your company&apos;s public profile URL:
          </p>
          <Link
            href={`https://www.medicova.net/co/${company.username}`}
            className="text-sm text-primary underline"
          >
            co/{company.username}
          </Link>
        </div>
      </div>
      {/* Centered Typography with Background */}
      {/* <p className="mt-1 rounded-base bg-primary-100 p-2 text-sm text-secondary">
        Optimize your profile for SEO by enabling visibility options and keeping
        your company details up-to-date to attract top talent.
      </p> */}
    </div>
  );
};

export default CompanyPublicLink;
