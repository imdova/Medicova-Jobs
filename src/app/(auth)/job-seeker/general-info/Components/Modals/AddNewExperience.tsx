import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AddNewExperienceProps {
  open: boolean;
  onClose: () => void;
}

const AddNewExperience: React.FC<AddNewExperienceProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "700px",
          width: "90%",
          maxHeight: "90dvh",
          overflowX: "hidden",
          backgroundColor: "#F8F8FD",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Add Experience
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "rgba(227, 72, 23, 1)" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr", // One column for other fields
            gap: 2,
          }}
        >
          {/* Industry */}
          <Box>
            <InputLabel
              sx={{
                marginBottom: 0.2,
                fontWeight: 600,
                color: "#000",
                fontSize: "14px",
              }}
            >
              Industry *
            </InputLabel>
            <Select
              fullWidth
              sx={{
                backgroundColor: "rgba(214, 221, 235, 0.18)",
                height: "40px",
                fontSize: "14px",
              }}
              required
              defaultValue="Healthcare professionals"
            >
              <MenuItem value="Healthcare professionals">
                Healthcare professionals
              </MenuItem>
            </Select>
          </Box>

          {/* Job Title */}
          <Box>
            <InputLabel
              sx={{
                marginBottom: 0.2,
                fontWeight: 600,
                color: "#000",
                fontSize: "14px",
              }}
            >
              Job Title *
            </InputLabel>
            <TextField
              placeholder="Enter Job Title"
              fullWidth
              sx={{
                backgroundColor: "rgba(214, 221, 235, 0.18)",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  fontSize: "14px",
                },
              }}
            />
          </Box>

          {/* Company */}
          <Box>
            <InputLabel
              sx={{
                marginBottom: 0.2,
                fontWeight: 600,
                color: "#000",
                fontSize: "14px",
              }}
            >
              Company/Organization *
            </InputLabel>
            <TextField
              placeholder="Enter Company"
              fullWidth
              sx={{
                backgroundColor: "rgba(214, 221, 235, 0.18)",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  fontSize: "14px",
                },
              }}
            />
          </Box>

          {/* Date Month */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // Two columns for Date fields
              gap: 2,
            }}
          >
            {/* Start Date */}
            <Box>
              <InputLabel
                sx={{
                  marginBottom: 0.2,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Start Date
              </InputLabel>
              <Select
                fullWidth
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  height: "40px",
                  fontSize: "14px",
                }}
                defaultValue="Start Month"
              >
                <MenuItem value="Start Month" disabled sx={{ color: "#888" }}>
                  Start Month {/* Placeholder */}
                </MenuItem>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* End Date */}
            <Box>
              <InputLabel
                sx={{
                  marginBottom: 0.2,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                End Date
              </InputLabel>
              <Select
                fullWidth
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  height: "40px",
                  fontSize: "14px",
                }}
                defaultValue="End Month"
              >
                <MenuItem value="End Month" disabled sx={{ color: "#888" }}>
                  End Month {/* Placeholder */}
                </MenuItem>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          {/* Date Year */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // Two columns for Date fields
              gap: 2,
            }}
          >
            {/* Start Date */}
            <Box>
              <Select
                fullWidth
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  height: "40px",
                  fontSize: "14px",
                }}
                required
                defaultValue="Start Year"
              >
                <MenuItem value="Start Year" disabled>
                  Start Year {/* Placeholder */}
                </MenuItem>
                {Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, index) => 1980 + index).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* End Date */}
            <Box>
              <Select
                fullWidth
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  height: "40px",
                  fontSize: "14px",
                }}
                required
                defaultValue="End Year"
              >
                <MenuItem value="End Year" disabled>
                  End Year {/* Placeholder */}
                </MenuItem>
                {Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, index) => 1980 + index).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          {/* Checkbox */}
          <Box>
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
                  I currently work there
                </Typography>
              }
            />
          </Box>
          {/* Country */}
          <Box>
            <InputLabel
              sx={{
                marginBottom: 0.2,
                fontWeight: 600,
                color: "#000",
                fontSize: "14px",
              }}
            >
              Country *
            </InputLabel>
            <Select
              fullWidth
              sx={{
                backgroundColor: "rgba(214, 221, 235, 0.18)",
                height: "40px",
                fontSize: "14px",
              }}
              required
              defaultValue="Egypt"
            >
              <MenuItem value="Egypt">
                Egypt
              </MenuItem>
            </Select>
          </Box>
        </Box>


        {/* Add Button */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            sx={{
              width: "204.16px",
              height: "46px",
              background: "linear-gradient(180deg, #2EAE7D, #134834)",
              color: "#fff",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal >
  );
};

export default AddNewExperience;
