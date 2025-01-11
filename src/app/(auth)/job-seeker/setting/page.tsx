"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ProfileForm from "./Components/ProfileForm";
import HeaderSection from "./Components/HeaderSection";
import AvailabilityForm from "./Components/AvailabilityForm";
import CareerPreferenceForm from "./Components/CareerPreferenceForm";
import Link from "next/link";

type TabsType =
  | "Profile"
  | "Career preference"
  | "Login Details"
  | "Notifications";
const tabs: TabsType[] = [
  "Profile",
  "Career preference",
  "Login Details",
  "Notifications",
];

const SettingsPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { act } = searchParams as {
    act: TabsType;
  };
  const initialTabValue = tabs.map(x => x.toLocaleLowerCase()).indexOf(act) > 0 ? tabs.map(x => x.toLocaleLowerCase()).indexOf(act) : 0;
  const [tabValue, setTabValue] = useState(initialTabValue);
  const activeTab: TabsType = tabs[tabValue];
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
 
  return (
    <Box sx={{ p: { xs: 1, md: 4 } }}>
      {/* Page Header */}
      {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Settings
        </Typography>
        <Button variant="outlined">Back to homepage</Button>
      </Box> */}
      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          mb: 4,
          borderBottom: "1px solid #ddd",
        }}
      >
        {tabs.map((item, index) => (
          <Tab
            key={index}
            label={item}
            component={Link}
            href={`/job-seeker/setting?act=${item.toLowerCase()}`}
            className="normal-case text-lg font-semibold"
          />
        ))}
      </Tabs>
      {/* Tab Panels */}
      {activeTab === "Profile" && <ProfileInfo />}
      {activeTab === "Career preference" && <CareerReferenceTab />}
      {activeTab === "Login Details" && <LoginDetails />}
      {activeTab === "Notifications" && <NotificationsSettings />}
      {/* Close Account */}
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        <Button
          sx={{
            color: "rgba(255, 101, 80, 1)",
            textTransform: "capitalize",
            fontWeight: "600",
          }}
          endIcon={<InfoIcon />}
        >
          Close Account
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;

const LoginDetails: React.FC = () => {
  return (
    <Box>
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
    </Box>
  );
};

const NotificationsSettings: React.FC = () => {
  return (
    <div>
      <div>
        <h6 className="mb-1 text-xl font-semibold text-main">
          Basic Information
        </h6>
        <p className="text-secondary">
          This is notifications preferences that you can update anytime
        </p>
      </div>
      <Divider className="my-6" />

      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <h6 className="text-xl font-semibold text-main">Notifications</h6>
          <p className="max-w-[300px] text-secondary">
            Customize your preferred notifications settings
          </p>
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox className="p-2 py-0" defaultChecked />}
              className="mb-4 flex max-w-[350px] items-start"
              label={
                <div>
                  <h6 className="text-xl font-semibold text-main">
                    Applications
                  </h6>
                  <p className="text-secondary">
                    These are notifications for jobs that you have applied for
                  </p>
                </div>
              }
            />
            <FormControlLabel
              control={<Checkbox className="p-2 py-0" />}
              className="mb-4 flex max-w-[350px] items-start"
              label={
                <div>
                  <h6 className="text-xl font-semibold text-main">Jobs</h6>
                  <p className="text-secondary">
                    These are notifications for job openings that suit your
                    profile
                  </p>
                </div>
              }
            />
            <FormControlLabel
              control={<Checkbox className="p-2 py-0" />}
              className="mb-4 flex max-w-[350px] items-start"
              label={
                <div>
                  <h6 className="text-xl font-semibold text-main">
                    Recommendations
                  </h6>
                  <p className="text-secondary">
                    These are notifications for personalized recommendations
                    from our recruiters
                  </p>
                </div>
              }
            />
          </FormGroup>
          <Button variant="contained">Update Email</Button>
        </div>
      </div>
    </div>
  );
};

const ProfileInfo: React.FC = () => {
  return (
    <div>
      <HeaderSection />
      <AvailabilityForm />
      <ProfileForm />
    </div>
  );
};



const CareerReferenceTab: React.FC = () => {
  return (
    <div>
      <AvailabilityForm />
      <CareerPreferenceForm />
    </div>
  );
};
