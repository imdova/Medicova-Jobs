"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddModal from "./Modals/AddModal";
import Image from "next/image";
import courses from "@/components/icons/courses.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
        <Typography
          variant="h3"
          sx={{
            marginBottom: 1,
            fontWeight: "700",
            color: "#03353C",
          }}
        >
          Courses and Certificates
        </Typography>
        {/* Add Button positioned at the top right */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#00A884",
            border: "1px solid #D6DDEB",
            borderRadius: "4px",
            padding: "6px",
          }}
          onClick={() => handleOpenModal("Add Educations", getCoursesFields)}
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
        {coursesData.slice(0, visibleItems).map((item, index) => (
          <Grid
            container
            key={index}
            spacing={2}
            sx={{
              justifyContent: "center",
              marginTop: index < coursesData.length - 1 ? 2 : 0,
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
                <Grid item xs={12}>
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
                      src={courses}
                      alt="Courses"
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
                        {item.institution}
                      </Typography>
                      <Typography sx={{ fontWeight: "400", color: "#7C8493" }}>
                        {item.course}
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
                {coursesData[index + 1] && (
                  <Grid item xs={12}>
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
                        src={courses}
                        alt="Courses"
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
                          {coursesData[index + 1].institution}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "400", color: "#7C8493" }}
                        >
                          {coursesData[index + 1].course}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "400", color: "#7C8493" }}
                        >
                          {coursesData[index + 1].years}
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
                            {coursesData[index + 1].location}
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
              color: "#00A884",
              border: "1px solid #D6DDEB",
            }}
            onClick={handleToggle}
          >
            {isExpanded
              ? `Show less courses${remainingItems > 1 ? "s" : ""}`
              : `Show ${remainingItems} more course${remainingItems > 1 ? "s" : ""}`}
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default CoursesSection;
