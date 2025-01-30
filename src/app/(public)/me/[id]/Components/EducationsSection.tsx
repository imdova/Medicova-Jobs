"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddModal from "./Modals/AddModal";
import Image from "next/image";
import education from "@/components/icons/education.png";
import { Add, LocationOnOutlined } from "@mui/icons-material";
import { FieldConfig, UserState } from "@/types";
import EmptyCard from "@/components/UI/emptyCard";
import { expandItems } from "@/lib/auth/utils";
import DynamicFormModal from "@/components/form/DynamicFormModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";

interface Education {
  seekerId: string;
  inistitute: string;
  degree: string;
  countryCode: string;
  startYear: number;
  endYear: number;
  grade: string;
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

const fields: FieldConfig<Education>[] = [
  {
    name: "inistitute",
    type: "text",
    label: "College and University name",
    textFieldProps: { placeholder: "Enter Job Title" },
    required: true,
  },
  {
    name: "degree",
    type: "select",
    textFieldProps: { placeholder: "What is your degree" },
    options: [
      { value: "Bachelors", label: "Bachelors" },
      { value: "Masters", label: "Masters" },
      { value: "PhD", label: "PhD" },
    ],
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
    name: "grade",
    type: "select",
    textFieldProps: { placeholder: "What is your grade" },
    options: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
      { value: "E", label: "E" },
      { value: "F", label: "F" },
      { value: "G", label: "G" },
      { value: "H", label: "H" },
      { value: "I", label: "I" },
      { value: "J", label: "J" },
      { value: "K", label: "K" },
      { value: "L", label: "L" },
      { value: "M", label: "M" },
    ],
  },
];

const INITIAL_VISIBLE_ITEMS = 2;

const EducationsSection: React.FC<{
  user: UserState;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const educationData: Education[] = [];
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the list is expanded
  const toggle = () => setIsExpanded(!isExpanded);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: { [key: string]: string }) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
    setLoading(true);
  };

  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const remainingItems = educationData.length - INITIAL_VISIBLE_ITEMS;
  if (!isMe && educationData.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">Educations</h3>
        {isMe && (
          <IconButton
            onClick={open}
            className="rounded border border-solid border-gray-300 p-2"
          >
            <Add />
          </IconButton>
        )}
      </div>
      <DynamicFormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleSubmit}
        fields={[
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
        title="Add Education to Your Profile"
      />
      {/* Title and Description */}
      {educationData.length > 0 ? (
        <div className="my-2 grid grid-cols-1 gap-2">
          {expandItems(educationData, INITIAL_VISIBLE_ITEMS, isExpanded).map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-base border p-2"
              >
                <Image
                  src={education}
                  alt="Experience"
                  width={70}
                  height={70}
                  className=""
                />
                <div className="flex-1">
                  <h6 className="text-lg font-semibold text-main">
                    {item.inistitute}
                  </h6>
                  <p className="text-sm text-secondary">{item.degree}</p>
                  <p className="text-sm text-secondary">{item.endYear}</p>
                  <div className="flex text-sm text-secondary">
                    <LocationOnOutlined className="-ml-1 text-base" />
                    <p className="text-sm text-secondary">{item.countryCode}</p>
                  </div>
                </div>
                {isMe && (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                )}
              </div>
            ),
          )}
        </div>
      ) : isMe ? (
        <EmptyCard
          src={"/images/activities.png"}
          description={"Your Educations will appear here."}
          buttonText="Add Educations"
          onClick={open}
        />
      ) : null}

      {/* Show More / Show Less Button */}
      {educationData.length > INITIAL_VISIBLE_ITEMS ? (
        <div className="flex items-center justify-center">
          <Button variant="text" className="mt-2 p-0" onClick={toggle}>
            {isExpanded
              ? `Show less experiences${remainingItems > 1 ? "s" : ""}`
              : `Show ${remainingItems} more experience${remainingItems > 1 ? "s" : ""}`}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default EducationsSection;

const getEducationFields = (): JSX.Element[] => [
  <Box key="collageName">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      College and University name *
    </InputLabel>
    <TextField
      placeholder="Faculty of Medicine, Cairo University"
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          fontSize: "14px",
        },
      }}
    />
  </Box>,

  <Box key="degreeLevel">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Degree Level *
    </InputLabel>
    <Select
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        height: "40px",
        fontSize: "14px",
      }}
      required
      defaultValue="Bachelor's Degree"
    >
      <MenuItem value="Bachelor's Degree">Bachelors Degree</MenuItem>
    </Select>
  </Box>,

  <Box key="country">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Country *
    </InputLabel>
    <Select
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        height: "40px",
        fontSize: "14px",
      }}
      required
      defaultValue="Egypt"
    >
      <MenuItem value="Egypt">Egypt</MenuItem>
    </Select>
  </Box>,

  <Box
    key="dateYear"
    sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
  >
    {/* Start Year */}
    <Box>
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        Start Year *
      </InputLabel>
      <Select
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          height: "40px",
          fontSize: "14px",
        }}
        required
        defaultValue="Start Year"
      >
        <MenuItem value="Start Year" disabled>
          Start Year
        </MenuItem>
        {Array.from(
          { length: new Date().getFullYear() - 1980 + 1 },
          (_, index) => 1980 + index,
        ).map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Box>

    {/* End Year */}
    <Box>
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        End Year *
      </InputLabel>
      <Select
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          height: "40px",
          fontSize: "14px",
        }}
        required
        defaultValue="End Year"
      >
        <MenuItem value="End Year" disabled>
          End Year
        </MenuItem>
        {Array.from(
          { length: new Date().getFullYear() - 1980 + 1 },
          (_, index) => 1980 + index,
        ).map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Box>
  </Box>,

  <Box key="grade">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Grade *
    </InputLabel>
    <Select
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        height: "40px",
        fontSize: "14px",
      }}
      required
      defaultValue="very good"
    >
      <MenuItem value="very good">very good</MenuItem>
    </Select>
  </Box>,
];
