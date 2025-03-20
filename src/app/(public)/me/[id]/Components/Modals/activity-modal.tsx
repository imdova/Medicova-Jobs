"use client";

import { TAGS } from "@/api";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types";
import { useEffect } from "react";
import FormModal from "@/components/form/FormModal/FormModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  API_CREATE_SEEKER_ACTIVITY,
  API_CREATE_SEEKER_EDUCATION,
  API_DELETE_SEEKER_ACTIVITY,
  API_DELETE_SEEKER_EDUCATION,
  API_UPDATE_SEEKER_ACTIVITY,
  API_UPDATE_SEEKER_EDUCATION,
} from "@/api/seeker";
import { educationOptions } from "@/constants/job";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<ActivityData>;
  seekerId?: string;
};

const ActivityModal = ({
  isOpen,
  onClose,
  initialValues,
  seekerId,
}: ModalProps) => {
  const { isLoading, error, update, reset } = useUpdateApi(handleClose);
  const { isLoading: isDeleting, update: onDelete } = useUpdateApi(handleClose);

  function handleClose() {
    reset();
    onClose();
  }
  const fields: FieldConfig<ActivityData>[] = [
    {
      name: "title",
      type: "text",
      label: "Activity Title*",
      textFieldProps: {
        placeholder: "Enter the title of the course",
      },
      required: true,
    },
    {
      name: "provider",
      type: "text",
      label: "Provider*",
      textFieldProps: {
        placeholder: "Enter the name of the provider",
      },
      required: true,
    },

    {
      name: "issueDate",
      type: "date",
      label: "Issue Date*",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        placeholder: "Select the issue date",
      },
      required: true,
    },
    {
      name: "completionDate",
      type: "date",
      label: "Completion Date*",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        placeholder: "Select the completion date",
      },
      required: true,
    },
    {
      name: "isPresent",
      label: "I currently work there",
      type: "checkbox",
      resetFields: ["completionDate"],
      hideFieldNames: ["completionDate"], // Multiple fields to hide
    },
    {
      name: "description",
      type: "text",
      label: "Activity description (Optional)",
      textFieldProps: {
        placeholder: "Enter a description of the activity",
        sx: {
          "& .MuiOutlinedInput-root": {
            p: 0,
            borderRadius: "10px",
            height: "auto",
          },
        },
        multiline: true,
        minRows: 4,
        maxRows: 14,
      },
    },
  ];

  const onSubmit = async (formData: Partial<ActivityData>) => {
    const body = {
      ...formData,
      seekerId: seekerId,
    };
    if (body.id) {
      await update(API_UPDATE_SEEKER_ACTIVITY, { body }, TAGS.activity);
    } else {
      await update(
        API_CREATE_SEEKER_ACTIVITY,
        { method: "POST", body },
        TAGS.education,
      );
    }
  };

  const deleteHandler = async (data: ActivityData) => {
    await onDelete(
      API_DELETE_SEEKER_ACTIVITY + data.id,
      {
        method: "DELETE",
      },
      TAGS.education,
    );
  };

  return (
    <FormModal
      open={isOpen}
      error={error?.message}
      loading={isLoading}
      deleteLoading={isDeleting}
      onClose={handleClose}
      onDelete={initialValues?.id ? deleteHandler : undefined}
      onSubmit={onSubmit}
      fields={fields}
      deleteButtonText="Delete Activity"
      title="Add Activity"
      initialValues={initialValues}
    />
  );
};

export default ActivityModal;
