"use client";
import {
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Menu,
  Snackbar,
} from "@mui/material";
import FilterSections from "@/components/UI/filter";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import FilterDrawer from "./FilterDrawer";
import { doctorsBase, filterSections } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import DoctorCard from "./DoctorCard";

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
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items per page
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page

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
        className="scroll-bar-hidden hidden lg:block"
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
      <Box className="w-full p-2 md:p-4 lg:w-[80%]">
        <div className="w-full">
          <h2 className="mb-5 text-3xl font-bold text-[#185D43]">
            Clinical Pharmacist in Damam, Saudi Arabia
          </h2>
        </div>

        <Box className="flex justify-between">
          <div className="max-w-[calc(100vw-32px)]">
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
                    All Applicants ({doctorsBase.length})
                  </span>
                }
              />
              <Tab
                value="locked"
                label={
                  <span className="flex items-center gap-1 normal-case">
                    Locked ({doctorsBase.length - availableApplicants.length})
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
        <CustomPagination
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={doctors.length} // Pass the total items count
        />
      </Box>
      <Snackbar
        open={showCopyAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopyAlert(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <FilterDrawer handleFilterChange={handleFilterChange} />
    </Box>
  );
};

export default ApplicantsPage;
