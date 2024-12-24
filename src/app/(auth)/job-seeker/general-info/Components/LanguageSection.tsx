import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TranslateIcon from "@mui/icons-material/Translate";

// Data array for languages and proficiency levels
const languageData = [
  { language: "Arabic", proficiency: "Native" },
  { language: "English", proficiency: "Fluent" },
];

const LanguageSection: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card sx={{ padding: "16px", marginY: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "rgba(0, 0, 0, 0.8)" }}
          >
            Languages
          </Typography>
          <Box sx={{ display: "flex"}}>
            <IconButton
              size="small"
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 0,
                color: "rgba(46, 174, 125, 1)",
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          {languageData.map((item, index) => (
            <React.Fragment key={item.language}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#7C8493",
                }}
              >
                <TranslateIcon sx={{ color: "#2EAE7D" }} />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "500", color: "#000" }}
                >
                  {item.language} :
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.proficiency}
                </Typography>
              </Box>
              {index < languageData.length - 1 && <Divider sx={{ marginY: 0.1 }} />}
            </React.Fragment>
          ))}
        </Box>
      </Card>
    </Grid>
  );
};

export default LanguageSection;
