"use client";
import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import experience from "@/components/icons/briefcase.png";
import EditIcon from "@mui/icons-material/Edit";
import AddModal from "./Modals/AddModal";
import { Add, LocationOnOutlined } from "@mui/icons-material";

const experienceData = [
  {
    company: "Google",
    position: "Senior Software Engineer",
    years: "2015 - 2020",
    location: "Mountain View, CA", // Company location
  },
  {
    company: "Facebook",
    position: "Frontend Developer",
    years: "2020 - 2022",
    location: "Menlo Park, CA", // Company location
  },
  {
    company: "Amazon",
    position: "UX Designer",
    years: "2012 - 2015",
    location: "Seattle, WA", // Company location
  },
  {
    company: "Apple",
    position: "iOS Developer",
    years: "2018 - 2021",
    location: "Cupertino, CA", // Company location
  },
  {
    company: "Tesla",
    position: "Software Architect",
    years: "2022 - Present",
    location: "Palo Alto, CA", // Company location
  },
];

const ExperienceSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleItems(2);
    } else {
      setVisibleItems(experienceData.length);
    }
    setIsExpanded(!isExpanded);
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [fields, setFields] = useState<JSX.Element[]>([]);

  const handleOpenModal = (title: string, getFields: () => JSX.Element[]) => {
    setModalTitle(title);
    setFields(getFields());
    setOpenModal(true);
  };

  // Calculate how many more items are left to show
  const remainingItems = experienceData.length - visibleItems;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">Experience</h3>
        <IconButton
          onClick={() =>
            handleOpenModal("Add Experiences", getExperienceFields)
          }
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
      <div className="my-2 grid grid-cols-1 gap-2 md:grid-cols-2">
        {experienceData.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-base border p-2"
          >
            <Image
              src={experience}
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
                <IconButton>
                  <EditIcon />
                </IconButton>
              </div>
              <p className="text-sm text-secondary">{item.position}</p>
              <p className="text-sm text-secondary">{item.years}</p>
              <div className="flex text-sm text-secondary">
                <LocationOnOutlined className="-ml-1 text-base" />
                <p className="text-sm text-secondary">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      <div className="flex items-center justify-center">
        <Button className="mt-2 p-0" variant="text" onClick={handleToggle}>
          {isExpanded
            ? `Show less experiences${remainingItems > 1 ? "s" : ""}`
            : `Show ${remainingItems} more experience${remainingItems > 1 ? "s" : ""}`}
        </Button>
      </div>
    </div>
  );
};

export default ExperienceSection;

const getExperienceFields = (): JSX.Element[] => [
  <Box key="industry">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Industry *
    </InputLabel>
    <Select
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        height: "40px",
        fontSize: "14px",
      }}
      required
      defaultValue="Healthcare professionals"
    >
      <MenuItem value="Healthcare professionals">
        Healthcare professionals
      </MenuItem>
    </Select>
  </Box>,

  <Box key="jobTitle">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Job Title *
    </InputLabel>
    <TextField
      placeholder="Enter Job Title"
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

  <Box key="company">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Company/Organization *
    </InputLabel>
    <TextField
      placeholder="Enter Company"
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

  <Box
    key="dateMonth"
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
        Start Date
      </InputLabel>
      <Select
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          height: "40px",
          fontSize: "14px",
        }}
        defaultValue="Start Month"
      >
        <MenuItem value="Start Month" disabled sx={{ color: "#888" }}>
          Start Month
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
        End Date
      </InputLabel>
      <Select
        fullWidth
        sx={{
          backgroundColor: "rgba(214, 221, 235, 0.18)",
          height: "40px",
          fontSize: "14px",
        }}
        defaultValue="End Month"
      >
        <MenuItem value="End Month" disabled sx={{ color: "#888" }}>
          End Month
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
  </Box>,

  <Box
    key="dateYear"
    sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
  >
    <Box>
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

    <Box>
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

  <Box key="currentWork">
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: "rgba(46, 174, 125, 1)",
            "&.Mui-checked": {
              color: "rgba(46, 174, 125, 1)",
            },
            "& .MuiSvgIcon-root": {
              fontSize: 34,
            },
          }}
        />
      }
      label={
        <Typography sx={{ color: "#515B6F", fontWeight: "700" }}>
          I currently work there
        </Typography>
      }
    />
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
];
