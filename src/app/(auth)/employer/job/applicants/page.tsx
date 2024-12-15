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
  FormControlLabel,
  Radio,
  Stack,
  IconButton,
} from "@mui/material";
import FilterSections from "@/components/UI/filter";
import { useState } from "react";
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
};

const doctors: Doctor[] = [
  {
    id: "doc-001", // Unique ID
    image: "https://example.com/image1.jpg",
    name: "Dr. Sarah Johnson",
    location: "New York, USA",
    specialty: "Cardiology",
    yearsOfExperience: 15,
    consultant: true,
    field: "Cardiology",
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
    image: "https://example.com/image2.jpg",
    name: "Dr. Michael Brown",
    location: "London, UK",
    specialty: "Cardiology",
    yearsOfExperience: 20,
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
    image: "https://example.com/image3.jpg",
    name: "Dr. Aisha Khan",
    location: "Dubai, UAE",
    specialty: "Cardiology",
    yearsOfExperience: 10,
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
    image: "https://example.com/image4.jpg",
    name: "Dr. Ramesh Patel",
    location: "Mumbai, India",
    specialty: "Cardiology",
    yearsOfExperience: 12,
    consultant: true,
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
    image: "https://example.com/image5.jpg",
    name: "Dr. Emma Wilson",
    location: "Sydney, Australia",
    specialty: "Cardiology",
    yearsOfExperience: 18,
    consultant: true,
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

const ApplicantsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);

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

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleFilterChange = (key: string, value: any) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box className="flex flex-row w-full bg-white min-h-screen md:p-5 p-2">
      {/* Left Column: Filter Section */}
      <Box
        className="scroll-bar-hidden"
        sx={{
          width: "20%",
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
          width: "80%",
          padding: "16px",
        }}
      >
        <div className="w-full">
          <h2 className="font-bold text-[#185D43] text-3xl mb-5">
            Clinical Pharmacist in Damam, Saudi Arabia
          </h2>
        </div>

        <Box className="flex justify-between">
          <Tabs
            sx={{
              marginBottom: "20px",
              "& .MuiTabs-indicator": {
                backgroundColor: "#185D43", // Active tab indicator color
              },
              "& .MuiTab-root": {
                textTransform: "none",
                color: "rgba(0, 0, 0, 0.5)",
                minWidth: "125px", // Increased width for each tab
                fontSize: "15px", // Increased font size for each tab
              },
              "& .Mui-selected": {
                color: "#185D43!important",
                fontWeight: "bold",
              },
            }}
            value={selectedTab}
            onChange={handleTabChange}
          >
            <Tab
              label={
                <span className="flex items-center normal-case">
                  All Applicants (100)
                </span>
              }
            />
            <Tab
              label={
                <span className="flex items-center gap-1 normal-case">
                  Locked (20)
                  <LockIcon className="text-red-500 w-5 h-5 " />
                </span>
              }
            />
            <Tab
              label={
                <span className="flex items-center gap-1 normal-case ">
                  Unlocked (30)
                  <LockOpenIcon className="text-[#2EAE7D] w-5 h-5 " />
                </span>
              }
            />
            <Tab
              label={
                <span className="flex items-center gap-1  normal-case  ">
                  Shortlisted (10)
                  <StarIcon className="text-[#2EAE7D] w-5 h-5 " />
                </span>
              }
            />
          </Tabs>

          <Select
            className="h-12"
            value="time-desc"
            onChange={(e) => console.log(e.target.value)}
          >
            <MenuItem value="time-desc">Newest</MenuItem>
            <MenuItem value="time-asc">Oldest</MenuItem>
          </Select>
        </Box>
        <div className="flex justify-between mb-4 items-center">
          <div className="flex gap-5 items-center">
            <button
              onClick={toggleSelectAll}
              className="h-fit rounded-md bg-[#DEF0EB]"
            >
              {isAllSelect ? (
                <DeselectIcon className="w-6 h-6 m-2" />
              ) : (
                <SelectAllIcon className="w-6 h-6 m-2" />
              )}
            </button>
            <div className="h-fit rounded-md bg-[#DEF0EB] p-2 px-4">
              <p className="inline-block">Action</p>
              <ExpandMoreIcon className="w-6 h-6 ml-2 inline-block" />
            </div>
          </div>
          <div className="h-fit rounded-md bg-[#DEF0EB] p-2 px-4">
            <p className="inline-block w-16">Export</p>
            <ExpandMoreIcon className="w-6 h-6 ml-2 inline-block" />
          </div>
        </div>
        {/* Applicant Cards */}
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            {...doctor}
            setSelectedApplicants={setSelectedApplicants}
            selectedApplicants={selectedApplicants}
          />
        ))}
        {/* Pagination */}
        <Pagination count={10} className="mt-4" />
      </Box>
    </Box>
  );
};

export default ApplicantsPage;

interface DoctorCardProps extends Doctor {
  selectedApplicants: string[];
  setSelectedApplicants: React.Dispatch<React.SetStateAction<string[]>>;
}

// import StarIcon from "@mui/icons-material/Star";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MessageIcon from "@mui/icons-material/Message";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";

import DownloadIcon from "@mui/icons-material/Download";

import WorkIcon from "@mui/icons-material/Work";

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  selectedApplicants,
  setSelectedApplicants,
}) => {
  const toggleSelect = () =>
    setSelectedApplicants((prev) =>
      prev.includes(id)
        ? prev.filter((doctorId) => doctorId !== id)
        : [...prev, id]
    );
  const isSelected = selectedApplicants.includes(id);
  return (
    <Box className="flex mb-4">
      <button
        onClick={toggleSelect}
        className={`${
          isSelected ? "bg-[#2EAE7D] border-[#2EAE7D]" : "border-[#D6DDEB]"
        } min-w-[32px] h-[32px] rounded-sm mr-2    border-2`}
      >
        {isSelected && <CheckIcon className="text-white w-5 h-5 m-auto" />}
      </button>

      <div className="border w-full rounded-md shadow-md bg-white">
        <div className="flex flex-col p-5">
          <div className=" flex gap-5 justify-between w-full">
            <div className="flex gap-5">
              <div>
                <Avatar
                  src="https://randomuser.me/api/portraits/men/4.jpg"
                  alt="Candidate"
                  sx={{ width: 100, height: 100 }}
                />
                <p className="text-black/50 text-[12px] max-w-[100px] mt-2 text-center">
                  applied 6 days ago
                </p>
              </div>
              <div>
                <Typography
                  variant="h2"
                  sx={{ color: "#185D43", fontWeight: "600", fontSize: "22px" }}
                >
                  Jake Gyll
                </Typography>
                <Stack
                  direction="row"
                  sx={{ marginY: "5px", color: "rgba(0, 0, 0, 0.7)" }}
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
                  sx={{ marginY: "5px", color: "rgba(0, 0, 0, 0.7)" }}
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
                <div className="flex gap-2 px-4 md:gap-6 justify-between items-center bg-[#F8F8FD]">
                  <h6 className="font-semibold">Contact Info :</h6>
                  <div>
                    <LocalPhoneIcon className="text-[#2EAE7D]" />
                    <span className="mx-1">201220707190 </span>
                    <IconButton>
                      <ContentCopyIcon />
                    </IconButton>
                  </div>
                  <div>
                    <EmailIcon className="text-[#2EAE7D]" />
                    <span className="mx-1">ahmedhabib@gmail.com</span>
                    <IconButton>
                      <ContentCopyIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-between">
                <button
                  type="button"
                  className=" border w-10 text-[#6A727A] h-10 border-[#D6DDEB] hover:text-[#185D43] hover:border-[#185D43]"
                >
                  <WhatsAppIcon className=" m-2" />
                </button>
                <button
                  type="button"
                  className=" border w-10 text-[#6A727A] h-10 border-[#D6DDEB] hover:text-[#185D43] hover:border-[#185D43]"
                >
                  <MessageIcon className=" m-2" />
                </button>
                <button
                  type="button"
                  className=" border w-10 text-[#6A727A] h-10 border-[#D6DDEB] hover:text-[#185D43] hover:border-[#185D43]"
                >
                  <StarBorderOutlinedIcon className=" m-2" />
                </button>
              </div>
              <Button
                variant="outlined"
                className="w-full"
                startIcon={<DownloadIcon />}
              >
                Download CV
              </Button>
            </div>
          </div>
          <div className="flex flex-col h-20 p-5 bg-[#F8F8FD]">
            {/* <div className="flex justify-between items-center">
              <WorkIcon className="text-[#2EAE7D]" />
              <p className="font-semibold">Cardiology Consultant</p>
              <div className="bg-white border px-4 py-2"> EGYPT </div>
              <p>(2020 - 2024)</p>
            </div>
            <div className="flex">
              <SchoolIcon /> <p>Cardiology Consultant</p>{" "}
              <div> flag Egypt with border and white bg </div>{" "}
              <p>(2020 - 2024)</p>{" "}
            </div> */}
          </div>
        </div>
      </div>
    </Box>
  );
};
