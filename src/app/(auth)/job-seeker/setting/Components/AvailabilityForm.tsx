"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/form/FormModal/FormField/FormField";

interface AvailabilityFormProps {
  formMethods: UseFormReturn<UserProfile>;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ formMethods }) => {
  const { control } = formMethods;
  return (
    <div className="flex items-center justify-between bg-primary-100 p-[16px] text-start">
      {/* Title and Description */}
      <div>
        <FormField
          field={{
            name: "isImmediate",
            label: "Available for immediate hiring",
            type: "checkbox",
          }}
          control={control}
        />
        <p className="text-secondary">
          Let companies know you can start immediately by adding the Immediate
          start badge to your profile
        </p>
      </div>
    </div>
  );
};

export default AvailabilityForm;
