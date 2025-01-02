"use client";
import React, { useState } from "react";
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

const educationData = [
  {
    institution: "Harvard University",
    degree: "Postgraduate degree, Applied Psychology",
    years: "2010 - 2012",
    location: "Cambridge, MA", // Add location
  },
  {
    institution: "Stanford University",
    degree: "Bachelor's degree, Computer Science",
    years: "2015 - 2019",
    location: "Stanford, CA", // Add location
  },
  {
    institution: "MIT",
    degree: "PhD, Biomedical Engineering",
    years: "2018 - 2022",
    location: "Cambridge, MA", // Add location
  },
  {
    institution: "MIT",
    degree: "PhD, Biomedical Engineering",
    years: "2018 - 2022",
    location: "Cambridge, MA", // Add location
  },
  {
    institution: "MIT",
    degree: "PhD, Biomedical Engineering",
    years: "2018 - 2022",
    location: "Cambridge, MA", // Add location
  },
];

const EducationsSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(2); // Initially show 2 items
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the list is expanded

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleItems(2); // Show only 2 items if expanded
    } else {
      setVisibleItems(educationData.length); // Show all items if collapsed
    }
    setIsExpanded(!isExpanded); // Toggle expanded state
  };

  // Calculate how many more items are left to show
  const remainingItems = educationData.length - visibleItems;

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
        <h3 className="mb-2 text-2xl font-bold text-main">Educations</h3>
        <IconButton
          onClick={() => handleOpenModal("Add Educations", getEducationFields)}
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
        {educationData.slice(0, visibleItems).map((item, index) => (
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
                {item.institution}
              </h6>
              <p className="text-sm text-secondary">{item.degree}</p>
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
