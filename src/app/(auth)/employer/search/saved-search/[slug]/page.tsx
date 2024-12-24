"use client";
import {
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Menu,
  Snackbar,
  Divider,
} from "@mui/material";
import FilterSections from "@/components/UI/filter";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import { doctorsBase, filterSections, folders } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import DoctorCard from "@/components/UI/DoctorCard";
import { Delete, Mail } from "@mui/icons-material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Image from "next/image";
import { notFound } from "next/navigation";

type TapType = "all" | "locked" | "unlocked" | "shortListed";
const ApplicantsPage = ({ params }: { params: { slug: string } }) => {
  const folderId = params.slug;
  console.log("🚀 ~ ApplicantsPage ~ folderId:", folderId);
  const folder = folders.find((f) => f.id === parseInt(folderId));
  console.log("🚀 ~ ApplicantsPage ~ folder:", folder);
  const [doctors, setDoctors] = useState(doctorsBase);
  const [selectedTab, setSelectedTab] = useState<TapType>("all");
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [availableApplicants, setAvailableApplicants] = useState<string[]>(
    doctors.filter((x) => x.available).map((x) => x.id),
  );
  const [shortListed, setShortListed] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [K in keyof typeof filterSections]: (typeof filterSections)[K][number]["value"][];
  }>({
    "Residency (Location)": [],
    "Education Level": [],
    "Years Of Experience": [],
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

  // add to available
  const addToAvailable = () => {
    if (!selectedApplicants.length) return;
    setAvailableApplicants((pv) =>
      pv.concat(selectedApplicants.filter((id) => !pv.includes(id))),
    );
  };
  if (!folder) return notFound;
  return (
    <Box className="flex min-h-screen w-full flex-row bg-white p-2">
      {/* Left Column: Filter Section */}
      <FilterSections
        className="scroll-bar-hidden sticky top-[107px] hidden max-h-[calc(100vh-114px)] w-1/5 overflow-y-scroll pb-[16px] pt-[101px] lg:block"
        sections={filterSections}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        searchKeys={["Residency (Location)"]}
      />
      {/* Right Column: Results Section */}
      <Box className="w-full p-2 md:p-4 lg:w-[80%]">
        <div className="mb-5 flex w-full gap-3 pl-[32px]">
          <Image
            src={"/images/folder.png"}
            alt="save"
            className="object-contain"
            width={24}
            height={24}
          />
          <h2 className="text-2xl font-bold">{folder.name}</h2>
        </div>

        <Box className="flex justify-between pl-[32px]">
          <div className="max-w-[calc(100vw-64px)]">
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
                    All CV Search ({doctorsBase.length})
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
                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <Mail color="primary" className="h-5 w-5" />
                    Invite to Apply
                  </MenuItem>
                  <Divider className="!m-0" />
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      addToAvailable();
                    }}
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <LockOpenIcon color="primary" className="h-5 w-5" />
                    Unlock Profile
                  </MenuItem>
                  <Divider className="!m-0" />
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      addToShortListed();
                    }}
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <StarIcon color="primary" className="h-5 w-5" />
                    Add to Shortlist
                  </MenuItem>
                  <Divider className="!m-0" />
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      removeFromShortListed();
                    }}
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <StarBorderOutlinedIcon
                      color="warning"
                      className="h-5 w-5"
                    />
                    remove from Shortlist
                  </MenuItem>
                  <Divider className="!m-0" />
                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <Delete className="h-5 w-5" color="error" />
                    Delete
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
    </Box>
  );
};

export default ApplicantsPage;
