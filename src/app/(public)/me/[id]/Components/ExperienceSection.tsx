"use client";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import experiencesImage from "@/components/icons/briefcase.png";
import EditIcon from "@mui/icons-material/Edit";
import { Add, LocationOnOutlined } from "@mui/icons-material";
import { FieldConfig, UserProfile, UserState } from "@/types";
import EmptyCard from "@/components/UI/emptyCard";
import { expandItems } from "@/lib/auth/utils";
import DynamicFormModal from "@/components/form/DynamicFormModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
// import { fetchIndustries } from "@/store/slices/industrySlice";

export interface ExperienceData {
  company: string;
  position: string;
  years: string;
  location: string;
}

const years = Array.from(
  { length: new Date().getFullYear() - 1980 + 1 },
  (v, k) => k + 1980,
).reverse();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const fields: FieldConfig[] = [
  {
    name: "jobTitle",
    type: "text",
    label: "Job Title",
    textFieldProps: { placeholder: "Enter Job Title" },
    required: true,
  },
  {
    name: "company",
    type: "text",
    label: "Company/Organization",
    textFieldProps: { placeholder: "Enter Company" },
  },
  {
    name: "startYear",
    type: "select",
    gridProps: { xs: 12, sm: 6 },
    textFieldProps: { placeholder: "Start Year" },
    options: years.map((year) => ({
      value: year.toString(),
      label: year.toString(),
    })),
    required: true,
  },
  {
    name: "startMonth",
    type: "select",
    gridProps: { xs: 12, sm: 6 },
    textFieldProps: { placeholder: "Start Month" },
    options: months.map((month) => ({
      value: month,
      label: month,
    })),
    required: true,
  },
  {
    name: "endYear",
    type: "select",
    gridProps: { xs: 12, sm: 6 },
    textFieldProps: { placeholder: "End Year" },
    options: years.map((year) => ({
      value: year.toString(),
      label: year.toString(),
    })),
    required: true,
  },
  {
    name: "endMonth",
    type: "select",
    gridProps: { xs: 12, sm: 6 },
    textFieldProps: { placeholder: "End Month" },
    options: months.map((month) => ({
      value: month,
      label: month,
    })),
    required: true,
  },
  {
    name: "currentlyWorking",
    label: "I currently work there",
    type: "checkbox",
    hideFieldNames: ["endYear", "endMonth"], // Multiple fields to hide
  },
];

const INITIAL_VISIBLE_ITEMS = 2;
const ExperienceSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  // const { industries } = useAppSelector((state) => state.industry);
  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const experiences: ExperienceData[] = [];
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded(!isExpanded);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: { [key: string]: string }) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
    setLoading(true);
  };

  const remainingItems = experiences.length - INITIAL_VISIBLE_ITEMS;

  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // if (industries.data.length === 0) {
    //   dispatch(fetchIndustries());
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!isMe && experiences.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
      {/* <DynamicFormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleSubmit}
        fields={[
          {
            name: "industry",
            type: "select",
            textFieldProps: { placeholder: "Select Industry" },
            options: industries.data.map((industry) => ({
              value: industry.id,
              label: industry.name,
            })),
            required: true,
          },
          ...fields,
          {
            name: "country",
            type: "select",
            textFieldProps: { placeholder: "Select Country" },
            options: countries.data.map((country) => ({
              value: country.isoCode,
              label: country.name,
            })),
            required: true,
          },
        ]}
        title="Add Experience to Your Profile"
      /> */}
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">Experience</h3>
        {isMe && (
          <IconButton
            onClick={open}
            className="rounded border border-solid border-gray-300 p-2"
          >
            <Add />
          </IconButton>
        )}
      </div>

      {experiences.length > 0 ? (
        <div className="my-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {expandItems(experiences, INITIAL_VISIBLE_ITEMS, isExpanded).map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-base border p-2"
              >
                <Image
                  src={experiencesImage}
                  alt="Experience"
                  width={70}
                  height={70}
                  className=""
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h6 className="text-lg font-semibold text-main">
                      {item.company}
                    </h6>
                    {isMe && (
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    )}
                  </div>
                  <p className="text-sm text-secondary">{item.position}</p>
                  <p className="text-sm text-secondary">{item.years}</p>
                  <div className="flex text-sm text-secondary">
                    <LocationOnOutlined className="-ml-1 text-base" />
                    <p className="text-sm text-secondary">{item.location}</p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      ) : isMe ? (
        <EmptyCard
          src={"/images/activities.png"}
          description={"Your Experiences will appear here."}
          buttonText="Add Experience"
          onClick={open}
        />
      ) : null}

      {/* Show More / Show Less Button */}
      {experiences.length > INITIAL_VISIBLE_ITEMS ? (
        <div className="flex items-center justify-center">
          <Button className="mt-2 p-0" variant="text" onClick={toggle}>
            {isExpanded
              ? `Show less experiencess${remainingItems > 1 ? "s" : ""}`
              : `Show ${remainingItems} more experiences${remainingItems > 1 ? "s" : ""}`}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ExperienceSection;
