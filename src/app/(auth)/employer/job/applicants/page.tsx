"use client";
import {
  Box,
  Tabs,
  Tab,
  Avatar,
  Button,
  Select,
  MenuItem,
  Typography,
  Pagination,
  Stack,
  IconButton,
  Menu,
  Snackbar,
} from "@mui/material";
import FilterSections from "@/components/UI/filter";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";

type Experience = {
  name: string;
  country: string;
  startDate: string;
  endDate: string;
};

type Education = {
  name: string;
  country: string;
  specialty: string;
  degree: string;
  startDate: string;
  endDate: string;
};

type ContactInfo = {
  whatsapp: string;
  phoneNumber: string;
  email: string;
};

type Doctor = {
  id: string;
  image: string;
  name: string;
  location: string;
  specialty: string;
  yearsOfExperience: number;
  consultant: boolean;
  field: string;
  contactInfo: ContactInfo;
  experience: Experience[];
  education: Education[];
  available: boolean;
};

const doctorsBase: Doctor[] = [
  {
    id: "doc-001", // Unique ID
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    name: "Sarah Johnson",
    location: "New York, USA",
    specialty: "Cardiology",
    yearsOfExperience: 15,
    consultant: true,
    field: "Cardiology",
    available: true,
    contactInfo: {
      whatsapp: "+1 555-123-4567",
      phoneNumber: "+1 555-987-6543",
      email: "sarah.johnson@example.com",
    },
    experience: [
      {
        name: "Senior Cardiologist",
        country: "USA",
        startDate: "2010",
        endDate: "Present",
      },
      {
        name: "Cardiology Resident",
        country: "USA",
        startDate: "2007",
        endDate: "2010",
      },
    ],
    education: [
      {
        name: "Harvard Medical School",
        country: "USA",
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "2000",
        endDate: "2006",
      },
    ],
  },
  {
    id: "doc-002", // Unique ID
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Michael Brown",
    location: "London, UK",
    specialty: "Cardiology",
    yearsOfExperience: 20,
    available: false,
    consultant: true,
    field: "Cardiology",
    contactInfo: {
      whatsapp: "+44 7700-123456",
      phoneNumber: "+44 7700-987654",
      email: "michael.brown@example.com",
    },
    experience: [
      {
        name: "Head of Cardiology",
        country: "UK",
        startDate: "2010",
        endDate: "Present",
      },
      {
        name: "Cardiology Fellow",
        country: "UK",
        startDate: "2005",
        endDate: "2010",
      },
    ],
    education: [
      {
        name: "University of Oxford",
        country: "UK",
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "1995",
        endDate: "2003",
      },
    ],
  },
  {
    id: "doc-003", // Unique ID
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    name: "Aisha Khan",
    location: "Dubai, UAE",
    specialty: "Cardiology",
    yearsOfExperience: 10,
    available: false,
    consultant: true,
    field: "Cardiology",
    contactInfo: {
      whatsapp: "+971 50-123-4567",
      phoneNumber: "+971 50-987-6543",
      email: "aisha.khan@example.com",
    },
    experience: [
      {
        name: "Consultant Cardiologist",
        country: "UAE",
        startDate: "2015",
        endDate: "Present",
      },
    ],
    education: [
      {
        name: "Dubai Medical College",
        country: "UAE",
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "2005",
        endDate: "2012",
      },
    ],
  },
  {
    id: "doc-004", // Unique ID
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Ramesh Patel",
    location: "Mumbai, India",
    specialty: "Cardiology",
    yearsOfExperience: 12,
    consultant: true,
    available: false,
    field: "Cardiology",
    contactInfo: {
      whatsapp: "+91 98765-43210",
      phoneNumber: "+91 98765-12345",
      email: "ramesh.patel@example.com",
    },
    experience: [
      {
        name: "Senior Consultant",
        country: "India",
        startDate: "2011",
        endDate: "Present",
      },
    ],
    education: [
      {
        name: "All India Institute of Medical Sciences",
        country: "India",
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "2003",
        endDate: "2010",
      },
    ],
  },
  {
    id: "doc-005", // Unique ID
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Emma Wilson",
    location: "Sydney, Australia",
    specialty: "Cardiology",
    yearsOfExperience: 18,
    consultant: true,
    available: false,
    field: "Cardiology",
    contactInfo: {
      whatsapp: "+61 400-123-456",
      phoneNumber: "+61 400-654-321",
      email: "emma.wilson@example.com",
    },
    experience: [
      {
        name: "Consultant Cardiologist",
        country: "Australia",
        startDate: "2005",
        endDate: "Present",
      },
    ],
    education: [
      {
        name: "University of Sydney",
        country: "Australia",
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "1995",
        endDate: "2001",
      },
    ],
  },
  // Add 5 more doctors here in a similar structure
];

const filterSections = {
  "Residency (Location)": [
    { label: "All", count: 5, value: "all" },
    { label: "Egypt", count: 3, value: "egypt" },
    { label: "Qatar", count: 2, value: "Qatar" },
  ],
  "Education Level": [
    { label: "All", count: 250, value: "all" },
    { label: "Technical Institute", count: 50, value: "institute" },
    { label: "Bachelor’s Degree", count: 100, value: "bachelor" },
    { label: "Doctorate Degree", count: 70, value: "doctorate" },
    { label: "Fellowship", count: 30, value: "fellowship" },
  ],
  "Years Of Experience": [
    { label: "All", count: 150, value: "all" },
    { label: "1-3", count: 50, value: "1-3" },
    { label: "3-5", count: 40, value: "3-5" },
    { label: "5-10", count: 30, value: "5-10" },
    { label: "+10", count: 30, value: "10+" },
  ],
};
type TapType = "all" | "locked" | "unlocked" | "shortListed";
const ApplicantsPage: React.FC = () => {
  const [doctors, setDoctors] = useState(doctorsBase);
  const [selectedTab, setSelectedTab] = useState<TapType>("all");
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [availableApplicants, setAvailableApplicants] = useState<string[]>(
    doctors.filter((x) => x.available).map((x) => x.id),
  );
  const [shortListed, setShortListed] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    residency: "",
    education: "",
    experience: 0,
  });
  const isAllSelect = selectedApplicants.length === doctors.length;
  const toggleSelectAll = () => {
    if (isAllSelect) {
      setSelectedApplicants([]);
    } else {
      setSelectedApplicants(doctors.map((x) => x.id));
    }
  };

  const handleTabChange = (
    _event: React.ChangeEvent<{}>,
    newValue: TapType,
  ) => {
    setSelectedTab(newValue);
    switch (newValue) {
      case "all":
        setDoctors(doctorsBase);
        break;
      case "locked":
        const lockedDoctor = doctorsBase.filter(
          (obj) => !availableApplicants.includes(obj.id),
        );
        setDoctors(lockedDoctor);
        break;
      case "unlocked":
        const unLockedDoctor = doctorsBase.filter((obj) =>
          availableApplicants.includes(obj.id),
        );
        setDoctors(unLockedDoctor);
        break;
      case "shortListed":
        const shortListedDoctors = doctorsBase.filter((obj) =>
          shortListed.includes(obj.id),
        );
        setDoctors(shortListedDoctors);
        break;
      default:
        setDoctors(doctorsBase);
        break;
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  // actions
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // - // short list action
  const removeFromShortListed = () => {
    if (!selectedApplicants.length) return;
    setShortListed((pv) => pv.filter((id) => !selectedApplicants.includes(id)));
  };
  const addToShortListed = () => {
    if (!selectedApplicants.length) return;
    setShortListed((pv) =>
      pv.concat(selectedApplicants.filter((id) => !pv.includes(id))),
    );
  };

  // export
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const exportOpen = Boolean(exportAnchorEl);
  const exportHandleClick = (event: any) => {
    setExportAnchorEl(event.currentTarget);
  };
  const exportHandleClose = () => {
    setExportAnchorEl(null);
  };
  return (
    <Box className="flex min-h-screen w-full flex-row bg-white">
      {/* Left Column: Filter Section */}
      <Box
        className="scroll-bar-hidden"
        sx={{
          width: "20%",
          display: { xs: "none", md: "block" },
          position: "sticky",
          mt: "66px",
          top: "190px",
          overflowY: "scroll",
          maxHeight: "calc(100vh - 180px)",
          paddingBottom: "16px",
        }}
      >
        <FilterSections
          sections={filterSections}
          onFilterChange={handleFilterChange}
          searchKeys={["Residency (Location)"]}
        />
      </Box>

      {/* Right Column: Results Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: "8px", md: "16px" },
        }}
      >
        <div className="w-full">
          <h2 className="mb-5 text-3xl font-bold text-[#185D43]">
            Clinical Pharmacist in Damam, Saudi Arabia
          </h2>
        </div>

        <Box className="flex justify-between">
          <div className="max-w-[calc(100vw-40px)]">
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="responsive tabs example"
              sx={{
                overflowX: { xs: "auto", sm: "visible" }, // Horizontal scroll for small screens
              }}
            >
              <Tab
                value="all"
                label={
                  <span className="flex items-center normal-case">
                    All Applicants ({doctors.length})
                  </span>
                }
              />
              <Tab
                value="locked"
                label={
                  <span className="flex items-center gap-1 normal-case">
                    Locked ({doctors.length - availableApplicants.length})
                    <LockIcon className="h-5 w-5 text-red-500" />
                  </span>
                }
              />
              <Tab
                value="unlocked"
                label={
                  <span className="flex items-center gap-1 normal-case">
                    Unlocked ({availableApplicants.length})
                    <LockOpenIcon className="h-5 w-5 text-[#2EAE7D]" />
                  </span>
                }
              />
              <Tab
                value="shortListed"
                label={
                  <span className="flex items-center gap-1 normal-case">
                    Shortlisted ({shortListed.length})
                    <StarIcon className="h-5 w-5 text-[#2EAE7D]" />
                  </span>
                }
              />
            </Tabs>
          </div>

          <Select
            className="hidden h-12 md:flex"
            value="time-desc"
            onChange={(e) => console.log(e.target.value)}
          >
            <MenuItem value="time-desc">Newest</MenuItem>
            <MenuItem value="time-asc">Oldest</MenuItem>
          </Select>
        </Box>
        <div className="mb-4 mt-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={toggleSelectAll}
              className="h-fit rounded-md bg-[#DEF0EB]"
            >
              {isAllSelect ? (
                <DeselectIcon className="m-2 h-6 w-6" />
              ) : (
                <SelectAllIcon className="m-2 h-6 w-6" />
              )}
            </button>
            {selectedApplicants.length > 0 && (
              <div>
                <button
                  onClick={handleClick}
                  aria-controls={open ? "Action-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  className="h-fit rounded-md bg-[#DEF0EB] p-2 px-4 duration-300 hover:bg-[#cae0da]"
                >
                  <p className="inline-block">Action</p>
                  <ExpandMoreIcon className="ml-2 inline-block h-6 w-6" />
                </button>
                <Menu
                  id="Action-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  className="mt-2"
                >
                  <MenuItem onClick={handleClose} className="hover:bg-gray-200">
                    delete
                  </MenuItem>
                  <MenuItem onClick={handleClose} className="hover:bg-gray-200">
                    edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      addToShortListed();
                    }}
                    className="hover:bg-gray-200"
                  >
                    Add to shortlist
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      removeFromShortListed();
                    }}
                    className="text-red-500 hover:bg-gray-200"
                  >
                    remove from shortlist
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={exportHandleClick}
              aria-controls={exportOpen ? "export-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={exportOpen ? "true" : undefined}
              className="h-fit rounded-md bg-[#DEF0EB] p-2 px-4 duration-300 hover:bg-[#cae0da]"
            >
              <p className="inline-block w-16">Export</p>
              <ExpandMoreIcon className="ml-2 inline-block h-6 w-6" />
            </button>
            <Menu
              id="export-menu"
              anchorEl={exportAnchorEl}
              open={exportOpen}
              onClose={exportHandleClose}
              className="mt-2"
            >
              <MenuItem className="hover:bg-gray-200">PDF</MenuItem>
              <MenuItem className="hover:bg-gray-200">Excel (CSV)</MenuItem>
            </Menu>
          </div>
        </div>
        {/* Applicant Cards */}
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            doctor={doctor}
            shortListed={shortListed}
            setShortListed={setShortListed}
            setSelectedApplicants={setSelectedApplicants}
            availableApplicants={availableApplicants}
            setAvailableApplicants={setAvailableApplicants}
            selectedApplicants={selectedApplicants}
          />
        ))}
        {/* Pagination */}
        <Pagination count={10} className="mt-4" />
      </Box>
      <Snackbar
        open={showCopyAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopyAlert(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default ApplicantsPage;

interface DoctorCardProps {
  doctor: Doctor;
  selectedApplicants: string[];
  availableApplicants: string[];
  shortListed: string[];
  setShortListed: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedApplicants: React.Dispatch<React.SetStateAction<string[]>>;
  setAvailableApplicants: React.Dispatch<React.SetStateAction<string[]>>;
}

// import StarIcon from "@mui/icons-material/Star";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MessageIcon from "@mui/icons-material/Message";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";

import DownloadIcon from "@mui/icons-material/Download";

import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
// import StarIcon from "@mui/icons-material/Star";

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  availableApplicants,
  shortListed,
  setShortListed,
  setAvailableApplicants,
  selectedApplicants,
  setSelectedApplicants,
}) => {
  const isSelected = selectedApplicants.includes(doctor.id);
  const isAvailable = availableApplicants.includes(doctor.id);
  const isShortListed = shortListed.includes(doctor.id);

  const toggleSelect = () =>
    setSelectedApplicants((pv) => toggleId(pv, doctor.id));

  const toggleShortListed = () =>
    setShortListed((pv) => toggleId(pv, doctor.id));

  const unlock = () => {
    setAvailableApplicants((pv) => [...pv, doctor.id]);
  };
  return (
    <Box className="mb-4 flex">
      <button
        onClick={toggleSelect}
        className={`${
          isSelected ? "border-[#2EAE7D] bg-[#2EAE7D]" : "border-[#D6DDEB]"
        } mr-2 h-[24px] min-w-[24px] rounded-sm border-2 md:h-[32px] md:min-w-[32px]`}
      >
        {isSelected && <CheckIcon className="m-auto h-5 w-5 text-white" />}
      </button>

      <div className="flex w-full flex-col rounded-md border bg-white p-2 shadow-md md:p-5">
        <div className="flex w-full flex-wrap justify-between gap-5 sm:flex-nowrap">
          <div className="flex gap-5">
            <div>
              <Avatar
                src={
                  doctor.image ||
                  "https://randomuser.me/api/portraits/men/4.jpg"
                }
                alt={doctor.name}
                sx={{ width: { xs: 50, md: 100 }, height: { xs: 50, md: 100 } }}
              />
              <p className="mt-2 max-w-[100px] text-center text-xs text-black/50">
                applied 6 days ago
              </p>
            </div>
            <div>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography
                  variant="h2"
                  sx={{
                    color: "#185D43",
                    fontWeight: "600",
                    fontSize: { xs: "16px", md: "22px" },
                  }}
                >
                  {doctor.name}
                </Typography>
                {isAvailable ? (
                  <LockOpenIcon className="h-5 w-5 text-[#2EAE7D]" />
                ) : (
                  <LockIcon className="h-5 w-5 text-red-500" />
                )}
              </Stack>
              <div className="my-1 flex max-w-[450px] flex-wrap gap-2 text-black/70">
                <div className="flex items-center gap-2">
                  <LocationOnIcon
                    color="primary"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <p className="text-xs md:text-base">
                    Nasr City, Cairo, Egypt
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <PeopleAltIcon
                    color="primary"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <p className="text-xs md:text-base">Doctors</p>
                </div>
                <div className="flex items-center gap-2">
                  <WorkspacePremiumIcon
                    color="primary"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <p className="text-xs md:text-base">10 years Experience</p>
                </div>
                <div className="flex items-center gap-2">
                  <SchoolIcon
                    color="primary"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <p className="text-xs md:text-base">Doctorate Degree</p>
                </div>
                <div className="flex items-center gap-2">
                  <PersonIcon
                    color="primary"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <p className="text-xs md:text-base">Consultant</p>
                </div>
                <div className="flex items-center gap-2">
                  <MedicalServicesIcon
                    color="primary"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <p className="text-xs md:text-base">Cardiology</p>
                </div>
              </div>
              <div className="my-2 flex flex-wrap items-center rounded bg-[#ECF7F3] p-1 py-2 md:mb-4 md:flex-nowrap md:px-4">
                <h6 className="text-sm font-semibold md:text-base">
                  Contact Info :
                </h6>
                <div className="flex flex-wrap justify-between">
                  <div className="mr-4 flex min-w-[80px] items-center">
                    <LocalPhoneIcon
                      color="primary"
                      className="h-4 w-4 md:h-5 md:w-5"
                    />
                    {isAvailable ? (
                      <span className="mx-1 h-fit text-sm md:text-base">
                        {doctor.contactInfo.phoneNumber}
                      </span>
                    ) : (
                      <div className="col-span-1 row-span-1 grid h-fit">
                        <span className="z-10 col-start-1 row-start-1 bg-white/20 px-2 text-sm backdrop-blur-[3px] md:text-base"></span>
                        <span className="col-start-1 row-start-1 select-none px-2 text-sm md:text-base">
                          this is dumy number
                        </span>
                      </div>
                    )}

                    <IconButton disabled={!isAvailable} className="p-0 md:p-2">
                      <ContentCopyIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </IconButton>
                  </div>
                  <div className="flex items-center">
                    <EmailIcon
                      color="primary"
                      className="h-4 w-4 md:h-5 md:w-5"
                    />
                    {isAvailable ? (
                      <span className="mx-1 h-fit text-sm md:text-base">
                        {doctor.contactInfo.email}
                      </span>
                    ) : (
                      <div className="col-span-1 row-span-1 grid h-fit">
                        <span className="z-10 col-start-1 row-start-1 bg-white/20 px-2 text-sm backdrop-blur-[3px] md:text-base"></span>
                        <span className="col-start-1 row-start-1 select-none px-2 text-sm md:text-base">
                          this is dummy email.com
                        </span>
                      </div>
                    )}
                    <IconButton disabled={!isAvailable} className="p-0 md:p-2">
                      <ContentCopyIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-2 sm:w-auto sm:flex-col">
            <div className="flex justify-between gap-2">
              <IconButton
                disabled={!isAvailable}
                size="small"
                color="primary"
                sx={{
                  border: 1,
                  padding: "6px",
                  borderColor: "grey.300",
                  borderRadius: 0,
                  "&:hover": { border: 1, borderColor: "primary.main" },
                }}
              >
                <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6" />
              </IconButton>
              <IconButton
                disabled={!isAvailable}
                size="small"
                color="primary"
                sx={{
                  border: 1,
                  padding: "6px",
                  borderColor: "grey.300",
                  borderRadius: 0,
                  "&:hover": { border: 1, borderColor: "primary.main" },
                }}
              >
                <MessageIcon className="h-5 w-5 md:h-6 md:w-6" />
              </IconButton>
              <IconButton
                onClick={toggleShortListed}
                size="small"
                color="primary"
                sx={{
                  border: 1,
                  padding: "6px",
                  borderColor: "grey.300",
                  borderRadius: 0,
                  "&:hover": { border: 1, borderColor: "primary.main" },
                }}
              >
                {isShortListed ? (
                  <StarIcon className="h-5 w-5 md:h-6 md:w-6" />
                ) : (
                  <StarBorderOutlinedIcon className="h-5 w-5 md:h-6 md:w-6" />
                )}
              </IconButton>
            </div>
            {isAvailable ? (
              <Button
                variant="outlined"
                className="w-full text-sm md:text-base"
                startIcon={<DownloadIcon className="h-5 w-5 md:h-6 md:w-6" />}
              >
                Download CV
              </Button>
            ) : (
              <Button
                variant="contained"
                className="w-full"
                onClick={unlock}
                startIcon={<VpnKeyOutlinedIcon />}
              >
                Unlock Profile
              </Button>
            )}
          </div>
        </div>
        <div className="hidden flex-col items-center gap-2 bg-[#F8F8FD] p-5 md:flex">
          {doctor.experience.map((exp, index) => (
            <div
              className="flex w-full max-w-[700px] items-center gap-4"
              key={`${doctor.id}-exp-${index}`}
            >
              <div className="flex w-[65%] items-center gap-3">
                <WorkOutlineOutlinedIcon color="primary" />
                <p className="font-semibold">{exp.name}</p>
              </div>
              <div className="w-fit rounded-md bg-white px-4 py-2 text-xs text-black/80">
                {exp.country}
              </div>
              <div>
                <p className="text-sm text-black/30">
                  ({exp.startDate} - {exp.endDate})
                </p>
              </div>
            </div>
          ))}

          {/* Education */}
          {doctor.education.map((edu, index) => (
            <div
              className="flex w-full max-w-[700px] items-center gap-4"
              key={`${doctor.id}-edu-${index}`}
            >
              <div className="flex w-[65%] items-center gap-3">
                <SchoolIcon color="primary" />
                <div>
                  <p className="font-semibold">{edu.name}</p>
                  <p className="text-sm text-gray-500">
                    {edu.degree} in {edu.specialty}
                  </p>
                </div>
              </div>
              <div className="w-fit rounded-md bg-white px-4 py-2 text-xs text-black/80">
                {edu.country}
              </div>
              <div>
                <p className="text-sm text-black/30">
                  ({edu.startDate} - {edu.endDate})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

function toggleId(ids: string[], id: string): string[] {
  // Check if the ID already exists in the array
  if (ids.includes(id)) {
    // If it exists, remove it
    return ids.filter((existingId) => existingId !== id);
  } else {
    // If it doesn't exist, add it
    return [...ids, id];
  }
}
