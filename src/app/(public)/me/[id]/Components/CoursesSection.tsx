"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
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
import courses from "@/components/icons/courses.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Add, LocationOnOutlined } from "@mui/icons-material";

const coursesData = [
  {
    institution: "Harvard University",
    course: "Postgraduate degree, Applied Psychology",
    years: "2010 - 2012",
    location: "Cambridge, MA",
  },
  {
    institution: "Stanford University",
    course: "Bachelor's degree, Computer Science",
    years: "2015 - 2019",
    location: "Stanford, CA",
  },
  {
    institution: "MIT",
    course: "PhD, Biomedical Engineering",
    years: "2018 - 2022",
    location: "Cambridge, MA",
  },
  {
    institution: "Oxford University",
    course: "Master's degree, Artificial Intelligence",
    years: "2020 - 2022",
    location: "Oxford, UK",
  },
  {
    institution: "University of California, Berkeley",
    course: "Bachelor's degree, Data Science",
    years: "2016 - 2020",
    location: "Berkeley, CA",
  },
];

const CoursesSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(2); // Initially show 2 items
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the list is expanded

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleItems(2); // Show only 2 items if expanded
    } else {
      setVisibleItems(coursesData.length); // Show all items if collapsed
    }
    setIsExpanded(!isExpanded); // Toggle expanded state
  };

  // Calculate how many more items are left to show
  const remainingItems = coursesData.length - visibleItems;

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [fields, setFields] = useState<JSX.Element[]>([]);

  const handleOpenModal = (title: string, getFields: () => JSX.Element[]) => {
    setModalTitle(title);
    setFields(getFields());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">
          Courses and Certificates
        </h3>
        <IconButton
          onClick={() => handleOpenModal("Add Educations", getCoursesFields)}
          className="rounded border border-solid border-gray-300 p-2"
        >
          <Add />
        </IconButton>
      </div>
      <AddModal
        open={openModal}
        onClose={handleCloseModal}
        modalTitle={modalTitle}
        fields={fields}
      />

      {/* Title and Description */}
      <div className="my-2 grid grid-cols-1 gap-2">
        {coursesData.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-base border p-2"
          >
            <Image
              src={courses}
              alt="Experience"
              width={70}
              height={70}
              className=""
            />
            <div className="flex-1">
              <h6 className="text-lg font-semibold text-main">
                {item.institution}
              </h6>
              <p className="text-sm text-secondary">{item.institution}</p>
              <p className="text-sm text-secondary">{item.years}</p>
              <div className="flex text-sm text-secondary">
                <LocationOnOutlined className="-ml-1 text-base" />
                <p className="text-sm text-secondary">{item.location}</p>
              </div>
            </div>
            <IconButton>
              <EditIcon />
            </IconButton>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      <div className="flex items-center justify-center">
        <Button variant="text" className="mt-2 p-0" onClick={handleToggle}>
          {isExpanded
            ? `Show less experiences${remainingItems > 1 ? "s" : ""}`
            : `Show ${remainingItems} more experience${remainingItems > 1 ? "s" : ""}`}
        </Button>
      </div>
    </div>
  );
};

export default CoursesSection;

const getCoursesFields = (): JSX.Element[] => [
  <Box key="title">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Title *
    </InputLabel>
    <TextField
      placeholder="Course/Certificate name e.g., Advanced Cardiac Surgery"
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

  <Box key="organization">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Issuing organization/Provider*
    </InputLabel>
    <TextField
      placeholder="e.g., American Heart Association"
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

  <Box key="courseLevel">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Specialty/Category*
    </InputLabel>
    <Select
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        height: "40px",
        fontSize: "14px",
      }}
      required
      defaultValue="Cardiology"
    >
      <MenuItem value="cardiology">Cardiology</MenuItem>
    </Select>
  </Box>,

  <Box
    key="IssueDate"
    sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
  >
    <Box>
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        Issue date*
      </InputLabel>
      <Select
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          height: "40px",
          fontSize: "14px",
        }}
        defaultValue="Month"
      >
        <MenuItem value="Month" disabled sx={{ color: "#888" }}>
          Month
        </MenuItem>
        {[
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
        ].map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </Box>

    <Box>
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        Year*
      </InputLabel>
      <Select
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          height: "40px",
          fontSize: "14px",
        }}
        required
        defaultValue="Year"
      >
        <MenuItem value="Start Year" disabled>
          Year
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

  <Box
    key="CompletionDate"
    sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
  >
    <Box>
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        Completion Date*
      </InputLabel>
      <Select
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          height: "40px",
          fontSize: "14px",
        }}
        defaultValue="Month"
      >
        <MenuItem value="Month" disabled sx={{ color: "#888" }}>
          Month
        </MenuItem>
        {[
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
        ].map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </Box>

    <Box>
      <InputLabel
        sx={{
          marginBottom: 0.2,
          fontWeight: 600,
          color: "#000",
          fontSize: "14px",
        }}
      >
        Year*
      </InputLabel>
      <Select
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          height: "40px",
          fontSize: "14px",
        }}
        required
        defaultValue="Year"
      >
        <MenuItem value="Start Year" disabled>
          Year
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

  <Box key="description">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Description
    </InputLabel>
    <TextField
      placeholder="A brief description of the course or certificate."
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        "& .MuiOutlinedInput-root": {
          height: "70px",
          fontSize: "14px",
        },
      }}
    />
  </Box>,
];
