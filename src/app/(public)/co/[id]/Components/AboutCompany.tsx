'use client';
import { IconButton } from "@mui/material";
import { Edit, PendingActions } from "@mui/icons-material";
import ClampedText from "@/components/UI/ClampedText";
import EmptyCard from "@/components/UI/emptyCard";
import { Company, FieldConfig } from "@/types";
import { useState } from "react";
import DynamicFormModal from "@/components/form/DynamicFormModal";
import { updateCompany } from "@/lib/actions/employer.actions";

const fields: FieldConfig[] = [
  {
    name: "about",
    type: "text",
    textFieldProps: {
      placeholder: "Enter your company description",
      sx: {
        "& .MuiOutlinedInput-root": {
          p: 0,
          borderRadius: "10px",
          height: "auto",
        },
      },
      multiline: true,
      minRows: 4,
      maxRows: 4,
    },
  },
];

const AboutCompany: React.FC<{
  company?: Company;
  isEmployee: boolean;
}> = ({ company, isEmployee }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: { [key: string]: string }) => {
    setLoading(true);
    handleUpdate(data);
  };

  const handleUpdate = async (data: { [key: string]: string }) => {
    const result = await updateCompany({ id: company?.id, about: data.about });
    if (result.success && result.data) {
      setLoading(false);
      console.log("Company Updated successfully");
    } else {
      setLoading(false);
    }
  };

  if (!isEmployee && company?.about?.length === 0) {
    return null;
  }
  return (
    <div className="relative mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      {/* Title */}
      <DynamicFormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleSubmit}
        fields={fields}
        title="About Company "
        description="Add a brief company description for potential employees. This section is public."
        initialValues={{ about: company?.about }}
      />
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-main">About Company :</h3>
        {isEmployee && (
          <IconButton
            onClick={open}
            className="rounded border border-solid border-gray-300 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </div>
      {company?.about ? (
        <ClampedText className="px-2 text-secondary" lines={3}>
          <PendingActions className="-ml-1 mr-2 inline text-primary" />
          {company?.about}
        </ClampedText>
      ) : isEmployee ? (
        <EmptyCard
          src={"/images/activities.png"}
          description={" Tell us about your company."}
          buttonText="Add About Company"
          onClick={open}
        />
      ) : null}
    </div>
  );
};

export default AboutCompany;
