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
} from "@mui/material";
import Image from "next/image";
import experience from "@/components/images/experience.png";
import AddModal from "./Modals/AddModal";

const ExperienceSection: React.FC = () => {
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
          padding: { xs: 2, sm: 4 },
          position: "relative",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Title aligned to the start */}
        <Typography
          variant="h3"
          sx={{
            marginBottom: 1,
            fontWeight: "700",
            color: "#03353C",
          }}
        >
          Experience
        </Typography>

        {/* Centered Content */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          {/* Image */}
          <Image
            src={experience}
            alt="Experience"
            width={180}
            height={180}
            style={{
              marginBottom: 16,
              maxWidth: "100%",
              height: "auto",
            }}
            priority
          />

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: "400",
              color: "#185D43",
              marginBottom: 2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Add and stand out to get more opportunities tailored to your
            preferences.
          </Typography>

          {/* Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00A884",
              fontWeight: "600",
              color: "#fff",
              paddingX: 4,
              paddingY: 1.2,
              fontSize: { xs: "0.8rem", sm: "1rem" },
              "&:hover": {
                backgroundColor: "#00795c",
              },
            }}
            onClick={() =>
              handleOpenModal("Add Work Experience", getExperienceFields)
            }
          >
            Add Work Experience
          </Button>
          <AddModal
            open={openModal}
            onClose={handleCloseModal}
            modalTitle={modalTitle}
            fields={fields}
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default ExperienceSection;
