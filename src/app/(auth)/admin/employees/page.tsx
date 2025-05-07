"use client";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import AddNewEmployee from "./AddNewEmployee";
import Image from "next/image";
import Link from "next/link";
import { Eye, LayoutList, Settings, Trash } from "lucide-react";
import { ToggleButton } from "@/components/UI/ToggleButton";
import CellOptions from "@/components/UI/CellOptions";
import DynamicTable from "@/components/tables/DTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
type Applicant = {
  id: string;
  fullName: string;
  email: string;
  dateApplied: string;
  phone: string;
  address: string;
  department: string;
  title: string;
  role: string;
  age: number;
  status: string;
  degree: string;
  experience: string;
  avatarUrl: string;
};
//applicants dummy data
const dummyApplicants: Applicant[] = [
  {
    id: "1",
    fullName: "said ahmed",
    email: "saidahm@gmail.com",
    dateApplied: "13 July, 2021",
    phone: "+201144789587",
    address: "Cairo, Egypt",
    department: "Marketing",
    title: "Account Manager",
    role: "admin",
    age: 30,
    status: "remote",
    degree: "Bachelor of Business",
    experience: "2Y",
    avatarUrl: "/avatars/avatar1.jpg",
  },
  {
    id: "2",
    fullName: "hassan ahmed",
    email: "hassan23@gmail.com",
    dateApplied: "13 July, 2021",
    phone: "+201144789587",
    address: "Egypt",
    department: "Doctor",
    title: "Cardiology",
    role: "General",
    age: 30,
    status: "2Y",
    degree: "Bachelor of Nursing",
    experience: "2Y",
    avatarUrl: "/avatars/avatar2.jpg",
  },
  {
    id: "3",
    fullName: "ola ali",
    email: "oliali@gmail.com",
    dateApplied: "13 July, 2021",
    phone: "+201144789587",
    address: "Egypt",
    department: "Doctor",
    title: "Cardiology",
    role: "General",
    age: 30,
    status: "2Y",
    degree: "Bachelor of Dentistry",
    experience: "2Y",
    avatarUrl: "/avatars/avatar3.jpg",
  },
  {
    id: "4",
    fullName: "aya moiner",
    email: "ayamoin@gmail.com",
    dateApplied: "13 July, 2021",
    phone: "+201144789587",
    address: "Egypt",
    department: "Doctor",
    title: "Cardiology",
    role: "General",
    age: 30,
    status: "2Y",
    degree: "Masters of Orthodontic",
    experience: "2Y",
    avatarUrl: "/avatars/avatar4.jpg",
  },
];

//applicants columns
const columns = [
  {
    key: "orderNum",
    header: "#",
    render: (_applicant: Applicant, index: number) => <span>{index + 1}</span>,
  },
  {
    key: "name",
    header: "Name",
    render: (applicant: Applicant) => (
      <div className="flex items-center gap-2">
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={applicant.avatarUrl ?? "/images/avatar-placeholder.png"}
          width={200}
          height={200}
          alt={applicant.fullName}
        />
        <div>
          <span className="text-sm font-medium">{applicant.fullName}</span>
          <Link
            href={`mailto:${applicant.email}`}
            className="block text-xs text-blue-700"
          >
            {applicant.email}
          </Link>
        </div>
      </div>
    ),
  },
  {
    key: "dateApplied",
    header: "Date Applied",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.dateApplied || "-"}</span>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.phone}</span>
    ),
  },
  {
    key: "address",
    header: "Address",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.address}</span>
    ),
  },
  {
    key: "department",
    header: "Department",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.department}</span>
    ),
  },
  {
    key: "title",
    header: "Title",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.title}</span>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.role}</span>
    ),
  },
  {
    key: "age",
    header: "Age",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.age}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.status}</span>
    ),
  },
  {
    key: "degree",
    header: "Degree",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.degree}</span>
    ),
  },
  {
    key: "experience",
    header: "Experience",
    render: (applicant: Applicant) => (
      <span className="text-sm">{applicant.experience}</span>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: (applicant: Applicant) => (
      <div className="flex items-center gap-4">
        <ToggleButton initialValue={applicant.status === "remote"} />
        <CellOptions
          item={applicant}
          options={[
            {
              label: "View",
              icon: <Eye className="h-4 w-4" />,
              action: () => console.log("Viewing", applicant),
            },
            {
              label: "Delete",
              icon: <Trash className="h-4 w-4 text-red-500" />,
              action: () => console.log("Deleting", applicant),
            },
          ]}
        />
      </div>
    ),
  },
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel" // Accessibility: Defines this as a tab panel
      hidden={value !== index} // Hide the panel if it doesn't match the active tab
      id={`simple-tabpanel-${index}`} // Unique ID for the panel
      aria-labelledby={`simple-tab-${index}`} // Links the panel to its corresponding tab
      {...other}
    >
      {/* Render children only when the panel is active */}
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function aProps(index: number) {
  return {
    id: `simple-tab-${index}`, // Unique ID for the tab
    "aria-controls": `simple-tabpanel-${index}`, // Links the tab to its corresponding panel
  };
}

const EmployessPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = dummyApplicants?.filter((applicant) => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !query ||
      applicant.fullName.toLowerCase().includes(query) ||
      applicant.email?.toLowerCase().includes(query) ||
      applicant?.department.toLowerCase().includes(query);

    return searchMatch;
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // endPoints
  const API_POST_NEW_EMPLOYERS_DATA = "/api/submit-form";

  return (
    <div className="px-4">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <div className="flex-1 rounded-xl border bg-white shadow-sm">
          <Box
            sx={{
              // Styles for the selected tab
              ".css-o37pu0-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                backgroundColor: "#2ba149", // Green background for selected tab
                borderRadius: "30px", // Rounded corners
                color: "white", // White text for selected tab
              },

              // General styles for all tabs
              ".css-o37pu0-MuiButtonBase-root-MuiTab-root": {
                minHeight: 0, // Remove extra height from tabs
                fontSize: 10,
                minWidth: 60,
              },
              // Styles for the Tabs container
              ".css-5i28le-MuiTabs-root": {
                minHeight: 0, // Remove extra height from tabs container
              },
            }}
          >
            {/* Tabs container */}
            <Tabs
              value={value} // Current selected tab index
              onChange={handleChange} // Function to handle tab change
              aria-label="basic tabs example" // Accessibility label
              TabIndicatorProps={{
                style: { display: "none" }, // Hide the default indicator
              }}
              sx={{
                // Styling for all Tab components
                ".MuiTab-root": {
                  textTransform: "none", // Disable uppercase text
                },
              }}
            >
              {/* Individual tabs */}
              <Tab
                label={
                  <div className="flex items-center gap-1">
                    <LayoutList size={13} />
                    Employees List
                  </div>
                }
                {...aProps(0)}
              />{" "}
              {/* Tab 1 */}
              <Tab
                label={
                  <div className="flex items-center gap-1">
                    <Settings size={13} />
                    Setting
                  </div>
                }
                {...aProps(1)}
              />{" "}
              {/* Tab 2 */}
            </Tabs>
          </Box>
        </div>
        <Button
          onClick={handleOpenModal}
          className="flex w-full gap-2 rounded-md bg-primary p-2 sm:w-fit"
          size="small"
          variant="contained"
        >
          <Add />
          <span className="text-xs">New Employee</span>
        </Button>
        <AddNewEmployee
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          endPoint={API_POST_NEW_EMPLOYERS_DATA}
        />
      </div>
      <CustomTabPanel value={value} index={0}>
        <div className="rounded-xl border bg-white shadow-sm">
          <div>
            {/* Employers Table */}
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between"></div>
              <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <h2 className="text-xl font-semibold">
                  Total Employees : {dummyApplicants.length}
                </h2>
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Table */}
                <DynamicTable<Applicant>
                  columns={columns}
                  data={filteredEmployees || []}
                  minWidth={950}
                  selectable={true}
                  pagination
                  headerClassName="bg-green-600 text-white"
                  cellClassName="text-sm py-3 px-2"
                />
              </div>
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Setting
      </CustomTabPanel>
    </div>
  );
};

export default EmployessPage;
