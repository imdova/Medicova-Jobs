import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  LinearProgress,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

// Data array for sections
const languageData = [
  { title: "Arabic", percentage: 100 },
  { title: "English", percentage: 70 },
  { title: "French", percentage: 35 },
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
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              size="small"
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 0,
                color: "rgba(46, 174, 125, 1)",
              }}
            >
              <AddIcon />
            </IconButton>
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
          {languageData.map((language, index) => (
            <React.Fragment key={language.title}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "500", color: "#03353C" }}
                >
                  {language.title}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={language.percentage}
                      sx={{
                        height: 12,
                        borderRadius: 4,
                        backgroundColor: "rgba(214, 221, 235, 0.18)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "rgba(46, 174, 125, 1)",
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "500", color: "#515B6F" }}
                  >
                    {language.percentage}%
                  </Typography>
                </Box>
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
