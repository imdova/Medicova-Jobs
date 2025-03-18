"use client";
import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  IconButton,
  Button,
} from "@mui/material";
// import AddModal from "./Modals/AddModal";
import courses from "@/components/icons/courses.png";
import EmptyCard from "@/components/UI/emptyCard";
import { Add, Edit, LocationOnOutlined } from "@mui/icons-material";
import Image from "next/image";

type Activities = {
  institution: string;
  course: string;
  years: string;
  location: string;
};

const activitiesData: Activities[] = [
  // {
  //   institution: "Harvard University",
  //   course: "Postgraduate degree, Applied Psychology",
  //   years: "2010 - 2012",
  //   location: "Cambridge, MA",
  // },
];

const INITIAL_VISIBLE_ITEMS = 2;
const ActivitiesAchievementsSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS); // Initially show 2 items
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the list is expanded

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleItems(INITIAL_VISIBLE_ITEMS); // Show only 2 items if expanded
    } else {
      setVisibleItems(activitiesData.length); // Show all items if collapsed
    }
    setIsExpanded(!isExpanded); // Toggle expanded state
  };

  // Calculate how many more items are left to show
  const remainingItems = activitiesData.length - visibleItems;

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
  if (!isMe && activitiesData.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold text-main">
          Activities / Achievements
        </h3>
        {isMe && (
          <IconButton
            onClick={() =>
              handleOpenModal("Add Courses", getActivitiesAchievementsFields)
            }
            className="rounded border border-solid border-gray-300 p-2"
          >
            <Add />
          </IconButton>
        )}
      </div>
      {/* <AddModal
        open={openModal}
        onClose={handleCloseModal}
        modalTitle={modalTitle}
        fields={fields}
      /> */}
      {/* Title and Description */}
      {activitiesData.length > 0 ? (
        <div className="my-2 grid grid-cols-1 gap-2">
          {activitiesData.slice(0, visibleItems).map((item, index) => (
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
                <p className="text-sm text-secondary">
                  <LocationOnOutlined className="-ml-1 mb-[3px] h-4 w-4 text-secondary" />{" "}
                  {item.location}
                </p>
              </div>
              {isMe && (
                <IconButton>
                  <Edit />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      ) : isMe ? (
        <EmptyCard
          src={"/images/activities.png"}
          description={" Your volunteering and student activities."}
          buttonText="Add Activities / Achievements"
          onClick={() =>
            handleOpenModal(
              "Add Activities / Achievements",
              getActivitiesAchievementsFields,
            )
          }
        />
      ) : null}
      {/* Show More / Show Less Button */}
      {activitiesData.length > INITIAL_VISIBLE_ITEMS ? (
        <div className="flex items-center justify-center">
          <Button variant="text" className="mt-2 p-0" onClick={handleToggle}>
            {isExpanded
              ? `Show less experiences${remainingItems > 1 ? "s" : ""}`
              : `Show ${remainingItems} more experience${remainingItems > 1 ? "s" : ""}`}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ActivitiesAchievementsSection;
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
