"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { UseFormReturn } from "react-hook-form";
import { FieldConfig, Option } from "@/types";
import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { CheckboxField } from "@/components/form/FormModal/FormField/CheckboxField";
import { Female, Male } from "@mui/icons-material";
import CategorySelect from "./CategorySelect";
import {
  gendersOptions,
  maritalStatusOptions,
  nationalitiesOptions,
} from "@/constants";
import { Gender } from "@/constants/enums/gender.enum";
import LocationSelect from "@/components/form/selections/LocationSelect";
import { isValidPhoneNumber } from "@/util/forms";

interface ProfileFormProps {
  formMethods: UseFormReturn<Partial<UserProfile>>;
}

const genderIcons: Record<keyof typeof Gender, React.ReactNode> = {
  MALE: (
    <Male className="h-7 w-7 text-blue-500 group-aria-selected:text-white" />
  ),
  FEMALE: (
    <Female className="h-7 w-7 text-pink-500 group-aria-selected:text-white" />
  ),
  ANY: null,
};

const ProfileForm: React.FC<ProfileFormProps> = ({ formMethods }) => {
  const { control } = formMethods;

  const [isMyWhatsApp, setIsMyWhatsApp] = useState(true);

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsMyWhatsApp(isChecked);
  };
  return (
    <div className="w-full space-y-3 rounded-base border border-gray-200 bg-white p-5 shadow-soft">
      <h5 className="text-xl font-semibold text-main md:mt-4">
        Your Personal Info
      </h5>
      <div className="flex gap-4 md:w-1/2">
        {/* Phone Number */}
        <div className="w-full">
          <FormField
            field={{
              label: "Phone Number*",
              name: "phone",
              type: "phone",
              rules: {
                validate: (value) =>
                  isValidPhoneNumber(value || "") ||
                  "Please enter a valid phone number",
              },
            }}
            control={control}
          />
        </div>
        <div className="flex-1">
          {!isMyWhatsApp && (
            <FormField
              field={
                {
                  label: "WhatsApp Number",
                  name: "whatsapp",
                  type: "phone",
                  rules: {
                    validate: (value) =>
                      isValidPhoneNumber(value || "") ||
                      "Please enter a valid phone number",
                  },
                } as FieldConfig<UserProfile>
              }
              control={control}
            />
          )}
        </div>
      </div>
      <CheckboxField
        field={{
          name: "any",
          label: "My Phone Number is my whats app number",
          type: "checkbox",
        }}
        controllerField={{
          value: isMyWhatsApp,
          onChange: onCheckboxChange,
        }}
      />
      <div className="md:w-1/2">
        <FormField
          field={
            {
              name: "birthDate",
              type: "date",
              label: "Date of Birth*",
              dateFieldProps: {
                maxDate: dayjs().subtract(16, "years"),
              },
            } as FieldConfig<UserProfile>
          }
          control={control}
        />
      </div>
      <div className="md:w-1/2">
        <FormField
          field={{
            name: "gender",
            type: "radio",
            label: "Gender",
            options: gendersOptions.map((x) => ({
              ...x,
              icon: genderIcons[x.value as keyof typeof Gender],
            })),
          }}
          control={control}
        />
      </div>
      <div className="md:w-1/2">
        <FormField
          field={{
            name: "nationality",
            type: "search-select",
            label: "Nationality",
            options: nationalitiesOptions,
          }}
          control={control}
        />
      </div>
      <div className="md:w-1/2">
        <FormField
          field={
            {
              name: "maritalStatus",
              type: "radio",
              label: "Marital Status",
              options: maritalStatusOptions,
            } as FieldConfig<UserProfile>
          }
          control={control}
        />
      </div>
      <div className="md:w-1/2">
        <FormField
          field={
            {
              name: "hasDrivingLicence",
              type: "radio",
              label: "Do you have a driving license?",
              options: [
                { label: "yes", value: true },
                { label: "no", value: false },
              ] as Option<Record<any, any>>[],
            } as FieldConfig<UserProfile>
          }
          control={control}
        />
      </div>
      {/* Location */}
      <LocationSelect formMethods={formMethods} />
      <CategorySelect formMethods={formMethods} />
    </div>
  );
};

export default ProfileForm;
