import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface NewUserModalProps {
  open: boolean;
  onClose: () => void;
}

const NewUserModal: React.FC<NewUserModalProps> = ({ open, onClose }) => {
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
          maxWidth: "500px",
          width: "90%",
          maxHeight: "90dvh",
          overflowY: "auto",
          backgroundColor: "#fff",
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
            New User
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "rgba(227, 72, 23, 1)" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Content */}
        <Box>
          {/* Upload Section */}
          <Box
            sx={{
              textAlign: "center",
              border: "2px dashed rgba(214, 221, 235, 1)",
              borderRadius: "8px",
              p: 2,
              mb: 3,
              position: "relative",
            }}
          >
            {/* Hidden File Input */}
            <input
              type="file"
              id="upload-photo"
              style={{
                position: "absolute",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              accept="image/png, image/jpeg, image/jpg"
            />

            {/* Text Content */}
            <Typography
              component="span"
              sx={{
                color: "rgba(46, 174, 125, 1)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Upload a photo
            </Typography>{" "}
            Or drag and drop
            <Typography
              sx={{ color: "rgba(124, 132, 147, 1)", fontSize: "12px" }}
            >
              JPG, JPEG, PNG less than 1MB
            </Typography>
          </Box>


          {/* Input Fields */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {/* Full Name */}
            <Box>
              <InputLabel
                sx={{
                  marginBottom: 0.2,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Full Name
              </InputLabel>
              <TextField
                placeholder="Enter name"
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

            {/* Email */}
            <Box>
              <InputLabel
                sx={{
                  marginBottom: 0.2,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Email
              </InputLabel>
              <TextField
                placeholder="Enter Email"
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
                Job Title
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

            {/* Phone Number */}
            <Box>
              <InputLabel
                sx={{
                  marginBottom: 0.2,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Phone Number
              </InputLabel>
              <TextField
                placeholder="Enter phone number"
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

            {/* Password */}
            <Box>
              <InputLabel
                sx={{
                  marginBottom: 0.2,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Password
              </InputLabel>
              <TextField
                placeholder="Enter new password"
                type="password"
                fullWidth
                helperText="Minimum 8 characters"
                sx={{
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Permission Buttons */}
          {/* Permission Section */}
          <Box sx={{ mt: 3 }}>
            {/* Title Above Buttons */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                textAlign: "start",
                mb: 2,
              }}
            >
              Permission
            </Typography>

            {/* Permission Buttons */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#2EAE7D",
                  color: "#2EAE7D",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Full Control
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#2EAE7D",
                  color: "#2EAE7D",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Manage Jobs
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#2EAE7D",
                  color: "#2EAE7D",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                View Applicants
              </Button>
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
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewUserModal;
