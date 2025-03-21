"use client";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FieldConfig } from "@/types";
import ClampedText from "@/components/UI/ClampedText";
import EmptyCard from "@/components/UI/emptyCard";
import FormModal from "@/components/form/FormModal/FormModal";
import { TAGS } from "@/api";
import { API_UPDATE_SEEKER } from "@/api/seeker";
import useUpdateApi from "@/hooks/useUpdateApi";

const fields: FieldConfig[] = [
  {
    name: "about",
    type: "textEditor",
  }, 
];

const AboutSeeker: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error, update, reset } = useUpdateApi<UserProfile>();
  const open = () => setIsModalOpen(true);
  const onClose = () => {
    setIsModalOpen(false);
    reset();
  };

  if (!isMe && user.about?.length === 0) {
    return null;
  }
  const handleUpdate = async (formData: Partial<UserProfile>) => {
    await update(
      API_UPDATE_SEEKER,
      {
        body: { id: user.id, ...formData },
      },
      TAGS.profile,
    );
    setIsModalOpen(false);
  };
  return (
    <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      {isMe && (
        <FormModal
          open={isModalOpen}
          onClose={onClose}
          error={error?.message}
          loading={isLoading}
          onSubmit={handleUpdate}
          fields={fields}
          title="Introduce Yourself to Employers"
          description="Highlight your skills, experience, and commitment. Let potential employers know why you are the right fit to make a difference in their team!"
          initialValues={{ about: user.about }}
        >
          <p className="my-2 rounded bg-primary-100 p-2 px-4 text-sm font-normal text-secondary">
            <strong className="text-main">Note:</strong> Please avoid sharing
            any contact information or external links in this section.
          </p>
        </FormModal>
      )}

      <div className="flex items-center justify-between">
        <h5 className="mb-2 text-xl font-semibold text-main">About</h5>
        {isMe && (
          <IconButton
            className="rounded border border-solid border-gray-200 p-2"
            onClick={open}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
      {user.about ? (
        <ClampedText className="px-2 text-secondary  " lines={3} lineHeight={20}>
          <div
            className="prose text-wrap"
            dangerouslySetInnerHTML={{ __html: user.about }}
          />
        </ClampedText>
      ) : isMe ? (
        <EmptyCard
          src={"/images/activities.png"}
          description={" Your About Section is empty."}
          buttonText="Write About Yourself"
          onClick={open}
        />
      ) : null}
    </div>
  );
};

export default AboutSeeker;
