"use client";

import { TAGS } from "@/api";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types";
import { useEffect } from "react";
import FormModal from "@/components/form/FormModal/FormModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import {
  API_CREATE_SEEKER_COURSE,
  API_DELETE_SEEKER_COURSE,
  API_UPDATE_SEEKER_COURSE,
} from "@/api/seeker";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<CertificationData>;
  seekerId?: string;
};

const CourseModal = ({
  isOpen,
  onClose,
  initialValues,
  seekerId,
}: PostJobModalProps) => {
  const { isLoading, error, update, reset } = useUpdateApi(handleClose);
  const { isLoading: isDeleting, update: onDelete } = useUpdateApi(handleClose);

  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleClose() {
    reset();
    onClose();
  }
  const fields: FieldConfig<CertificationData>[] = [
    {
      name: "title",
      type: "text",
      label: "Course Title",
      textFieldProps: {
        placeholder:
          "e.g., Advanced Cardiac Life Support (ACLS), Medical Terminology",
      },
      required: true,
    },
    {
      name: "provider",
      type: "text",
      label: "Course Provider",
      gridProps: { xs: 6 },
      textFieldProps: {
        placeholder: "e.g., American Heart Association, Coursera, WHO",
      },
      required: true,
    },
    {
      name: "issueDate",
      type: "date",
      label: "Issue Date",
      gridProps: { xs: 6 },
      textFieldProps: {
        placeholder: "e.g., 2000-06-18",
      },
      required: true,
    },
    {
      name: "description",
      type: "text",
      label: "Course Description",
      textFieldProps: {
        placeholder:
          "Briefly describe what the course covered, e.g., emergency procedures, patient care, healthcare technology.",
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

  const onSubmit = async (formData: Partial<CertificationData>) => {
    const body = {
      ...formData,
      seekerId: seekerId,
    };
    if (body.id) {
      await update(API_UPDATE_SEEKER_COURSE, { body }, TAGS.courses);
    } else {
      await update(
        API_CREATE_SEEKER_COURSE,
        { method: "POST", body },
        TAGS.courses,
      );
    }
  };

  const deleteHandler = async (data: CertificationData) => {
    await onDelete(
      API_DELETE_SEEKER_COURSE + data.id,
      {
        method: "DELETE",
      },
      TAGS.courses,
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
      deleteButtonText="Delete Course"
      title="Add Course"
      initialValues={initialValues}
    />
  );
};

export default CourseModal;
