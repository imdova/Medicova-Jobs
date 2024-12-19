"use client";
import React, { useState } from "react";
import { Typography, Grid, Card, Button, Box } from "@mui/material";
import Image from "next/image";
import activities from "@/components/images/activities.png";
import AddNewExperience from "./Modals/AddNewExperience";


const ActivitiesSection: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
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
          Activities
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
            onClick={handleOpenModal}
          >
            Add Activities
          </Button>
          <AddNewExperience open={openModal} onClose={handleCloseModal} />
        </Box>
      </Card>
    </Grid>
  );
};

export default ActivitiesSection;
