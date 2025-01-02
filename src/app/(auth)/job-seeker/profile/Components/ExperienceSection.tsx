"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import AddModal from "./Modals/AddModal";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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

  // Function to return experience form fields
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

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          padding: "16px",
          textAlign: "start",
          position: "relative",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="mb-2 text-2xl font-bold text-main">Experience</h3>
        {/* Add Button positioned at the top right */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            border: "1px solid #D6DDEB",
            borderRadius: "4px",
            padding: "6px",
          }}
          onClick={() =>
            handleOpenModal("Add Experiences", getExperienceFields)
          }
        >
          <AddIcon />
        </IconButton>
        <AddModal
          open={openModal}
          onClose={handleCloseModal}
          modalTitle={modalTitle}
          fields={fields}
        />

        {/* Title and Description */}
        {experienceData.slice(0, visibleItems).map((item, index) => (
          <Grid
            container
            key={index}
            spacing={2}
            sx={{
              justifyContent: "center",
              marginTop: index < experienceData.length - 1 ? 2 : 0,
            }}
          >
            {/* Wrapper for each row (2 items per row) */}
            {index % 2 === 0 && (
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                {/* First Item */}
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      padding: 2,
                      border: "1px solid #D6DDEB",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      position: "relative", // Add this line to position the button
                    }}
                  >
                    {/* Left Photo (Image) */}
                    <Image
                      src={experience}
                      alt="Experience"
                      width={70}
                      height={50}
                      priority={true}
                      style={{
                        marginRight: "16px", // Add space between the image and the text
                      }}
                    />
                    {/* Text Section */}
                    <Box>
                      <Typography
                        sx={{
                          marginBottom: 1,
                          fontWeight: "600",
                          color: "#020202",
                          fontSize: { xs: "14px", sm: "18px" },
                        }}
                      >
                        {item.company}
                      </Typography>
                      <Typography sx={{ fontWeight: "400", color: "#7C8493" }}>
                        {item.position}
                      </Typography>
                      <Typography sx={{ fontWeight: "400", color: "#7C8493" }}>
                        {item.years}
                      </Typography>

                      {/* Location Section */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 1,
                        }}
                      >
                        <LocationOnIcon
                          sx={{ color: "#7C8493", marginRight: 1 }}
                        />
                        <Typography
                          sx={{ fontWeight: "400", color: "#7C8493" }}
                        >
                          {item.location}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Edit Icon Button */}
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "#00000080", // Set the color of the icon
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Grid>

                {/* Second Item */}
                {experienceData[index + 1] && (
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        padding: 2,
                        border: "1px solid #D6DDEB",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        position: "relative", // Add this line to position the button
                      }}
                    >
                      {/* Left Photo (Avatar) */}
                      <Image
                        src={experience}
                        alt="Education"
                        width={70}
                        height={50}
                        priority={true}
                        style={{
                          marginRight: "16px", // Add space between the image and the text
                        }}
                      />
                      {/* Text Section */}
                      <Box>
                        <Typography
                          sx={{
                            marginBottom: 1,
                            fontWeight: "600",
                            color: "#020202",
                            fontSize: { xs: "14px", sm: "16px" },
                          }}
                        >
                          {experienceData[index + 1].company}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "400", color: "#7C8493" }}
                        >
                          {experienceData[index + 1].position}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "400", color: "#7C8493" }}
                        >
                          {experienceData[index + 1].years}
                        </Typography>

                        {/* Location Section */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: 1,
                          }}
                        >
                          <LocationOnIcon
                            sx={{ color: "#7C8493", marginRight: 1 }}
                          />
                          <Typography
                            sx={{ fontWeight: "400", color: "#7C8493" }}
                          >
                            {experienceData[index + 1].location}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Edit Icon Button */}
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          color: "#00000080", // Set the color of the icon
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        ))}

        {/* Show More / Show Less Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              border: "1px solid #D6DDEB",
            }}
            onClick={handleToggle}
          >
            {isExpanded
              ? `Show less experiences${remainingItems > 1 ? "s" : ""}`
              : `Show ${remainingItems} more experience${remainingItems > 1 ? "s" : ""}`}
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default ExperienceSection;
