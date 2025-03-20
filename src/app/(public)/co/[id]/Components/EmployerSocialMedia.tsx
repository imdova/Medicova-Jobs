'use client'
import React, { KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import {
  Add,
  Edit,
  Instagram,
  Language,
  LinkedIn,
  LinkOutlined,
  Twitter,
} from "@mui/icons-material";
import DynamicFormModal from "@/components/form/DynamicFormModal";
import { Company, FieldConfig } from "@/types";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_COMPANY } from "@/api/employer";
import { TAGS } from "@/api";
import Link from "next/link";


type Props = {
  data?: Company; // Optional prop
  isEmployee?: boolean;
};

const socialMediaIcons: { [key: string]: JSX.Element } = {
  instagram: <Instagram sx={{ color: "rgba(241, 9, 234, 1)" }} />,
  twitter: <Twitter sx={{ color: "rgba(91, 146, 250, 1)" }} />,
  linkedin: <LinkedIn sx={{ color: "rgba(0, 119, 181, 1)" }} />,
  website: <Language sx={{ color: "rgba(46, 174, 125, 1)" }} />,
};

const userFields: FieldConfig[] = [
  {
    name: "instagram",
    label: "Instagram",
    type: "text",
    required: false,
  },
  {
    name: "twitter",
    label: "Twitter",
    type: "text",
    required: false,
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    type: "text",
    required: false,
  },
  {
    name: "website",
    label: "Website",
    type: "text",
    required: false,
  },
];

const EmployerSocialMedia: React.FC<Props> = ({ data, isEmployee }) => {
  const companyId = data?.id;
  const socialLinks = data?.socialLinks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [fields, setFields] = useState(userFields);

  const { isLoading, error, update, reset } = useUpdateApi<Company>((e) => {
    setIsModalOpen(false)
  });


  const open = () => setIsModalOpen(true);
  const close = () => { setIsModalOpen(false); reset(); };

  const handleUpdate = async (formData: Partial<Company>) => {
    await update(API_UPDATE_COMPANY, {
      body: { id: companyId, socialLinks: formData } as Company,
    }, TAGS.company);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addNewField();
    }
  };

  const addNewField = () => {
    const newFields: FieldConfig[] = [
      ...fields,
      {
        name: inputValue.trim(),
        label: inputValue.trim(),
        type: "text",
        required: false,
      },
    ];
    setFields(newFields);
    setInputValue("");
  };

  return (
    <div className="relative mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-soft md:p-5">
      <div className="flex justify-between items-center">
        <h6 className="mb-2 text-2xl font-semibold text-main">Social Links</h6>
        {isEmployee && (
          <IconButton
            onClick={open}
            className="rounded border border-solid border-gray-200 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </div>
      <DynamicFormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleUpdate}
        error={error?.message}
        loading={isLoading}
        fields={fields}
        title="Social Media Links"
        initialValues={socialLinks}
      >
        <div className="flex justify-between gap-2">
          <TextField
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"Add New Link"}
            className="w-full"
          />
          <IconButton
            onClick={addNewField}
            className="rounded-base border border-solid border-gray-300 p-2"
          >
            <Add />
          </IconButton>
        </div>
      </DynamicFormModal>
      {!socialLinks || Object.keys(socialLinks).length === 0 ? <p className="text-center text-gray-600">No social media links found.</p> : <div className="flex gap-4">
        {Object.entries(socialLinks).map(
          ([key, link]) =>
            link && (
              <Link
                href={link}
                key={key}
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialMediaIcons[key.toLowerCase()] || (
                  <LinkOutlined sx={{ color: "rgba(128, 128, 128, 1)" }} />
                )}
              </Link>
            ),
        )}
      </div>}
    </div>
  );
};

export default EmployerSocialMedia