'use client'
import React, { KeyboardEvent, useState } from "react";
import { Box, IconButton, Button, TextField } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import post from "@/components/images/post.svg";
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
import { updateCompany } from "@/lib/actions/employer.actions";
import PostJobModal from "./Modals/post-job-modal";

export const PostYourFirstJob: React.FC<{ company: Company }> = ({
  company,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);
  return (
    <div className="relative mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <PostJobModal company={company} isOpen={isModalOpen} onClose={onClose} />
      <div className="flex flex-col items-center gap-2">
        {/* Centered Image */}
        <Image
          src={post}
          alt="Login Cover"
          width={50}
          height={50}
          priority={true}
        />

        {/* Typography below the Image */}
        <p className="mb-2 text-center font-semibold text-secondary">
          To find better candidates, make your job description detailed, use
          relevant keywords, and add screening questions to your job post.
        </p>
      </div>

      {/* Centered Button */}
      <div className="flex justify-center">
        <Button onClick={onOpen} variant="contained">
          Post a job for free
        </Button>
      </div>
    </div>
  );
};

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

export const EmployerSocialMedia: React.FC<Props> = ({ data, isEmployee }) => {
  const companyId = data?.id;
  const socialLinks = data?.socialLinks || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(userFields);

  const handleSubmit = (data: { [key: string]: string }) => {
    setLoading(true);
    handleUpdate(data);
  };

  const handleUpdate = async (data: { [key: string]: string }) => {
    const result = await updateCompany({ id: companyId, socialLinks: data });
    if (result.success && result.data) {
      setLoading(false);
      console.log("Company Updated successfully");
    } else {
      setLoading(false);
    }
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

  // If the data object is empty or undefined
  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return isEmployee ? (
      <div className="relative mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
        <div className="flex items-center justify-between">
          <h6 className="mb-2 text-2xl font-semibold text-main">
            Social Links
          </h6>
          <IconButton
            onClick={() => setIsModalOpen(true)}
            className="rounded border border-solid border-gray-300 p-2"
          >
            <Edit />
          </IconButton>
        </div>
        <DynamicFormModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
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

        <p className="text-gray-500">No social media links provided.</p>
      </div>
    ) : null;
  }

  return (
    <div className="relative mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className="mb-2 text-2xl font-semibold text-main">Social Links</h6>
        {isEmployee && (
          <IconButton
            onClick={() => setIsModalOpen(true)}
            className="rounded border border-solid border-gray-300 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </Box>
      <DynamicFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
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
      <div className="flex gap-4">
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
      </div>
    </div>
  );
};
