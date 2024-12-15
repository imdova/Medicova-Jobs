import {
  Box,
  Button,
  Typography,
  Avatar,
  Divider,
  Stack,
  MenuItem,
  FormControl,
  TextField,
  Select,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const candidatesPage = () => {
  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3, // Increase the gap for uniform spacing
          marginBottom: 4,
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 1,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Input Field with Icon */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Job Candidates CV's"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
            },
            minWidth: 200,
          }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2EAE7D",
            color: "white",
            textTransform: "none",
            minWidth: 150,
            padding: "15px 15px",
            ":hover": {
              backgroundColor: "#249c6d",
            },
          }}
        >
          CV Search
        </Button>
      </Box>
      {/* Candidate Cards */}
      <Box sx={{ padding: 2 }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Candidate Info */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start", // Align items to the top
                gap: 2,
              }}
            >
              <Avatar
                src="/images/logo.png"
                alt="Candidate"
                sx={{ width: 90, height: 90 }}
              />
              {/* Full-Width Box for Candidate Details */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h2"
                  sx={{ color: "#185D43", fontWeight: "600", fontSize: "22px" }}
                >
                  Jake Gyll
                </Typography>
                <Stack
                  direction="row"
                  sx={{ marginY: "10px", color: "rgba(0, 0, 0, 0.7)" }}
                  gap={2}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon color="primary" />
                    <Typography variant="body1">
                      Nasr City, Cairo, Egypt
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PeopleAltIcon color="primary" />
                    <Typography variant="body1">56 years old</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WorkspacePremiumIcon color="primary" />
                    <Typography variant="body1">10 years Experience</Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  sx={{ marginY: "10px", color: "rgba(0, 0, 0, 0.7)" }}
                  gap={2}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SchoolIcon color="primary" />
                    <Typography variant="body1">Doctorate Degree</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon color="primary" />
                    <Typography variant="body1">56 years old</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MedicalServicesIcon color="primary" />
                    <Typography variant="body1">10 years Experience</Typography>
                  </Box>
                </Stack>
              </Box>
              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Center the icon button and label
                  gap: 1,
                }}
              >
                {/* Icon Button with Label */}
                <IconButton
                  sx={{
                    backgroundColor: "rgba(46, 174, 125, 0.1)",
                    color: "#2EAE7D",
                    padding: "10px",
                    ":hover": {
                      backgroundColor: "rgba(46, 174, 125, 0.2)",
                    },
                  }}
                >
                  <BookmarkIcon color="primary" />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2EAE7D",
                  color: "white",
                  textTransform: "none",
                  padding: "8px 16px",
                  height: "fit-content", // Align button with content
                }}
              >
                Invite to Apply
              </Button>
            </Box>

            <Divider sx={{ marginY: 2 }} />

            {/* Centered Job History */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                textAlign: "start", // Optional for text alignment
              }}
            >
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Cardiology Consultant (2020 - 2024) - Egypt
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Cardiology Specialist at Saudi German Hospital (2014 - 2020) -
                Saudi Arabia
              </Typography>
              <Typography variant="body2">
                Doctorate Degree in Interventional Cardiology (2013) - Egypt
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default candidatesPage;
