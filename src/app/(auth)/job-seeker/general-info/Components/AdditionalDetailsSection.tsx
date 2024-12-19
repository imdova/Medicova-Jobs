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
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TranslateIcon from "@mui/icons-material/Translate";

const AdditionalDetailsSection: React.FC = () => {
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
            Additional Details
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
          {/* Email Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#7C8493",
            }}
          >
            <EmailIcon />
            <Typography
              variant="body1"
              sx={{ fontWeight: "400", color: "rgba(124, 132, 147, 1)" }}
            >
              Email
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            jakegyll@email.com
          </Typography>

          <Divider sx={{ marginY: 0.1 }} />
          {/* Phone Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#7C8493",
            }}
          >
            <PhoneIphoneIcon />
            <Typography variant="body1" sx={{ fontWeight: "400" }}>
              Phone
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            +44 1245 572 135
          </Typography>
          <Divider sx={{ marginY: 0.1 }} />
          {/* Languages Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#7C8493",
            }}
          >
            <TranslateIcon />
            <Typography variant="body1" sx={{ fontWeight: "400" }}>
              Languages
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Arabic, English, French
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default AdditionalDetailsSection;
