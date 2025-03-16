"use client";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FieldConfig } from "@/types";
import ClampedText from "@/components/UI/ClampedText";
import EmptyCard from "@/components/UI/emptyCard";
import DynamicFormModal from "@/components/form/DynamicFormModal";
import TextEditor from "@/components/editor/editor";

const fields: FieldConfig[] = [
  {
    name: "about",
    type: "textEditor",
    component: TextEditor,
  },
];

const AboutSeeker: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: { [key: string]: string }) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
    setLoading(true);
  };

  if (!isMe && user.about?.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <DynamicFormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleSubmit}
        fields={fields}
        title="Introduce Yourself to Employers"
        description="Highlight your skills, experience, and commitment. Let potential employers know why you are the right fit to make a difference in their team!"
        initialValues={{ about: user.about }}
      >
        <p className="mt-2 rounded bg-primary-100 p-2 text-sm font-normal text-secondary">
          <strong className="text-main">Note:</strong> Please avoid sharing any
          contact information or external links in this section.
        </p>
      </DynamicFormModal>

      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">About</h3>
        {isMe && (
          <IconButton
            className="rounded border border-solid border-gray-300 p-2"
            onClick={open}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
      {user.about ? (
        <ClampedText className="px-2 text-secondary" lines={3}>
          {user.about}
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
