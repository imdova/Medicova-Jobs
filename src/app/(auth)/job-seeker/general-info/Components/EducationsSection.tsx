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
import education from "@/components/icons/education.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
          Educations
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
          onClick={() => handleOpenModal("Add Educations", getEducationFields)}
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
        {educationData.slice(0, visibleItems).map((item, index) => (
          <Grid
            container
            key={index}
            spacing={2}
            sx={{
              justifyContent: "center",
              marginTop: index < educationData.length - 1 ? 2 : 0,
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
                      src={education}
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
                          fontSize: { xs: "14px", sm: "18px" },
                        }}
                      >
                        {item.institution}
                      </Typography>
                      <Typography sx={{ fontWeight: "400", color: "#7C8493" }}>
                        {item.degree}
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
                {educationData[index + 1] && (
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
                        src={education}
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
                          {educationData[index + 1].institution}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "400", color: "#7C8493" }}
                        >
                          {educationData[index + 1].degree}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "400", color: "#7C8493" }}
                        >
                          {educationData[index + 1].years}
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
                            {educationData[index + 1].location}
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
              ? `Show less educations${remainingItems > 1 ? "s" : ""}`
              : `Show ${remainingItems} more education${remainingItems > 1 ? "s" : ""}`}
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default EducationsSection;
