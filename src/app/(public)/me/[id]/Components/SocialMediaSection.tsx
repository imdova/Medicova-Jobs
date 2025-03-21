"use client";
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
import Link from "next/link";
import { FieldConfig } from "@/types";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_SEEKER } from "@/api/seeker";
import { TAGS } from "@/api";
import FormModal from "@/components/form/FormModal/FormModal";

type SocialMediaSectionProps = {
  user: UserProfile;
  isMe: boolean;
  isLocked: boolean;
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
  },
  {
    name: "twitter",
    label: "Twitter",
    type: "text",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    type: "text",
  },
  {
    name: "website",
    label: "Website",
    type: "text",
  },
];

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  user,
  isMe,
  isLocked,
}) => {
  const socialLinks = user?.socialLinks;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [fields, setFields] = useState(userFields);

  const { isLoading, error, update, reset } = useUpdateApi<UserProfile>((e) => {
    setIsModalOpen(false);
  });

  const open = () => setIsModalOpen(true);
  const close = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleUpdate = async (formData: Partial<UserProfile>) => {
    await update(
      API_UPDATE_SEEKER,
      {
        body: { id: user?.id, socialLinks: formData } as UserProfile,
      },
      TAGS.profile,
    );
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
        name: inputValue.trim().toLowerCase(),
        label: inputValue.trim(),
        type: "text",
        required: false,
      },
    ];
    const duplicate = fields.some(
      (field) => field.name === inputValue.trim().toLowerCase(),
    );
    if (duplicate) {
      shake(inputValue.trim().toLowerCase());
    }
    if (inputValue && !duplicate) {
      setFields(newFields);
      setInputValue("");
    }
  };
  const removeLastField = (fieldName: string) => {
    setFields((pv) => pv.filter((field) => field.name !== fieldName));
  };
  function shake(name: string) {
    setFields(fields.map(field => field.name === name ? { ...field, textFieldProps:{className:"animate-shake border-red-400"} } : field));
    setTimeout(() => {
      setFields(fields.map(field => field.name === name ? { ...field, textFieldProps:{className:""} } : field));
    }, 500);
  }
  return (
    <div className="relative mb-5 rounded-base border border-gray-200 bg-white p-4 shadow-soft md:p-5">
      <div className="flex items-center justify-between">
        <h6 className="mb-2 text-xl font-semibold text-main">Social Links</h6>
        {isMe && (
          <IconButton
            onClick={open}
            className="rounded border border-solid border-gray-200 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </div>
      <FormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleUpdate}
        error={error?.message}
        loading={isLoading}
        fields={fields}
        title="Social Media Links"
        removeField={fields.length > 1 ? removeLastField : undefined}
        initialValues={socialLinks || {}}
      >
        <div className="border-t border-gray-200 p-4">
          <label className="font-semibold">Add New Link</label>
          <div className="flex items-end gap-2">
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
              className="h-[42px] w-[42px] rounded-base border border-solid border-gray-300 p-2"
            >
              <Add />
            </IconButton>
          </div>
        </div>
      </FormModal>
      {!socialLinks || Object.keys(socialLinks).length === 0 ? (
        <p className="text-secondary">No social media links found.</p>
      ) : isLocked ? (
        <p className="text-secondary">This Social Media links are private.</p>
      ) : (
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
      )}
    </div>
  );
};

export default SocialMediaSection;
