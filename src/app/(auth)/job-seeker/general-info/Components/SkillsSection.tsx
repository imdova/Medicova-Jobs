import React from "react";
import { Typography, Grid, Card, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const SkillsSection: React.FC = () => {
  const keywords = ["Communication", "Teamwork", "Problem Solving", "Leadership"];
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
        {/* Buttons container */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          {/* Add Button */}
          <IconButton
            sx={{
              color: "#185D43",
              border: "1px solid #D6DDEB",
              borderRadius: "4px",
              padding: "6px",
            }}
          >
            <AddIcon />
          </IconButton>
          {/* Edit Button */}
          <IconButton
            sx={{
              color: "#00A884",
              border: "1px solid #D6DDEB",
              borderRadius: "4px",
              padding: "6px",
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>

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
            Skills
          </Typography>

          {/* Communication Typography with Background Color */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {keywords.map((keyword, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#F8F8FD",
                  padding: "8px",
                  borderRadius: "4px",
                  maxWidth: "max-content",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    color: "#185D43",
                  }}
                >
                  {keyword}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default SkillsSection;
