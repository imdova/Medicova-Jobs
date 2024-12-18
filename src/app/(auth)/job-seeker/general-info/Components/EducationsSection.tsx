"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  IconButton,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const educationData = [
  {
    institution: "Harvard University",
    degree: "Postgraduate degree, Applied Psychology",
    years: "2010 - 2012",
    photoUrl: "https://via.placeholder.com/100",
  },
  {
    institution: "Stanford University",
    degree: "Bachelor's degree, Computer Science",
    years: "2015 - 2019",
    photoUrl: "https://via.placeholder.com/100",
  },
  {
    institution: "MIT",
    degree: "PhD, Biomedical Engineering",
    years: "2018 - 2022",
    photoUrl: "https://via.placeholder.com/100",
  },
  {
    institution: "MIT",
    degree: "PhD, Biomedical Engineering",
    years: "2018 - 2022",
    photoUrl: "https://via.placeholder.com/100",
  },
  {
    institution: "MIT",
    degree: "PhD, Biomedical Engineering",
    years: "2018 - 2022",
    photoUrl: "https://via.placeholder.com/100",
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
        >
          <AddIcon />
        </IconButton>

        {/* Title and Description */}
        {educationData.slice(0, visibleItems).map((item, index) => (
          <Grid
            container
            key={index}
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center", // Centers the content horizontally
              marginBottom: index < educationData.length - 1 ? 2 : 0,
            }}
          >
            {/* Left Photo (Avatar) centered */}
            <Grid
              item
              xs={12}
              sm="auto"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                alt="Education"
                sx={{
                  width: { xs: 80, sm: 100 }, // Adjust size for different screen sizes
                  height: { xs: 80, sm: 100 },
                  borderRadius: 1,
                }}
                src={item.photoUrl}
              />
            </Grid>

            {/* Text Section */}
            <Grid item xs={12} sm>
              <Box
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  padding: { xs: 1, sm: 3 },
                }}
              >
                <Typography
                  sx={{
                    marginBottom: 1,
                    fontWeight: "600",
                    color: "#25324B",
                    fontSize: { xs: "14px", sm: "16px" }, // Adjust font size for smaller screens
                  }}
                >
                  {item.institution}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "400",
                    color: "#7C8493",
                  }}
                >
                  {item.degree}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    color: "#7C8493",
                  }}
                >
                  {item.years}
                </Typography>
              </Box>
            </Grid>

            {/* Edit Button at the right end */}
            <Grid item xs="auto">
              <IconButton
                sx={{
                  color: "#00A884",
                  border: "1px solid #D6DDEB",
                  borderRadius: "4px",
                  padding: "6px",
                  marginBottom: { xs: 1, sm: 4 }, // Adjust spacing for smaller screens
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>

            {/* Divider between items */}
            {index < educationData.length - 1 && (
              <Grid item xs={12}>
                <Divider sx={{ marginY: 2, borderColor: "#D6DDEB" }} />
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
