import React from "react";
import { Typography, Grid, Card, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon

const AboutCompany: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          padding: "16px",
          textAlign: "start",
          position: "relative", // Allow positioning of the button
        }}
      >
        {/* Edit Button positioned at the top right */}
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
          <EditIcon />
        </IconButton>

        {/* Title and Description */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              marginBottom: 2,
              textAlign: "left",
              fontWeight: "700",
              color: "#03353C",
            }}
          >
            About Me
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              color: "#185D43",
              maxWidth: "90%",
            }}
          >
            I’m a Medical Ambassador + I am dedicated to transforming healthcare
            access and education in underserved communities. My passion for
            promoting health equity drives me to bridge the gap between medical
            professionals and those in need. Through community outreach,
            education, and advocacy, I strive to empower individuals with the
            knowledge and resources they require for better health outcomes.
            Together, we can build a future where quality healthcare is a right,
            not a privilege.
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default AboutCompany;
