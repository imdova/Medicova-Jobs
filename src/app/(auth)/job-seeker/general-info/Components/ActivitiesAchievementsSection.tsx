"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Button,
  Box,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Image from "next/image";
import activities from "@/components/images/activities.png";
import AddModal from "./Modals/AddModal";

const ActivitiesAchievementsSection: React.FC = () => {
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

  const getActivitiesAchievementsFields = (): JSX.Element[] => [
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
        placeholder="e.g., Award for Excellence in Medical Research"
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
        Issuing organization/Provider
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
            I am currently working on this role
          </Typography>
        }
      />
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
        placeholder="Enter a brief description of the activity or achievement e.g."
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
          Activities / Achievements
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
            src={activities}
            alt="Activities"
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
            Your volunteering and student activities.
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
              handleOpenModal(
                "Activities & Achievements ",
                getActivitiesAchievementsFields,
              )
            }
          >
            Add Activities / Achievements
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

export default ActivitiesAchievementsSection;
