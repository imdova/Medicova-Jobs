"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  InputLabel,
  TextField,
} from "@mui/material";

const LoginDetailsPage: React.FC = () => {
  return (
    <div>
      {/* Update Email Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <h6 className="mb-1 text-xl font-bold text-main">
            Basic Information
          </h6>
          <p className="text-secondary">
            This is login information that you can update anytime.
          </p>
        </CardContent>
        <Divider sx={{ my: 2, width: "90%", mx: "auto" }} />{" "}
        {/* Centered Divider */}
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "start",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            {/* Left Section */}
            <Box>
              <h6 className="mb-1 text-xl font-bold text-main">Update Email</h6>
              <p className="text-secondary">
                Update your email address to make sure it is safe
              </p>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: "250px",
              }}
            >
              <h6 className="mb-1 text-xl font-bold text-main">
                jakegyll@email.com
              </h6>
              <p className="mb-2 text-secondary">
                Your email address is verified.
              </p>
              <InputLabel
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Update Email
              </InputLabel>
              <TextField
                sx={{
                  maxWidth: "340px",
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
                fullWidth
                name="email"
                placeholder="Enter your new email"
              />
              <Button
                variant="contained"
                sx={{
                  width: "155px",
                  marginTop: 2,
                  height: "46px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
              >
                Update Email
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* New Password Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "start",
              alignItems: "flex-start",
              gap: 9,
            }}
          >
            {/* Left Section */}
            <Box>
              <h6 className="mb-1 text-xl font-bold text-main">New Password</h6>
              <p className="text-secondary">
                Manage your password to make sure it is safe
              </p>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: "250px",
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Old Password
              </InputLabel>
              <TextField
                sx={{
                  maxWidth: "340px",
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
                fullWidth
                name="password"
                type="password"
                placeholder="Enter your old password"
              />
              <InputLabel
                sx={{
                  marginTop: 2,
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                New Password
              </InputLabel>
              <TextField
                sx={{
                  maxWidth: "340px",
                  backgroundColor: "rgba(214, 221, 235, 0.18)",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
                fullWidth
                name="password"
                type="password"
                placeholder="Enter your new password"
              />
              <Button
                variant="contained"
                sx={{
                  width: "155px",
                  marginTop: 2,
                  height: "46px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginDetailsPage;
