"use client";
import {
  Tabs,
  Tab,
  Select,
  MenuItem,
  Menu,
  Snackbar,
  Divider,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import { doctorsBase, filterSections } from "@/constants";
import DoctorCard from "@/components/UI/DoctorCard";
import { Delete, Mail } from "@mui/icons-material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Doctor, JobData, UserState } from "@/types";

type TapType = "all" | "locked" | "unlocked" | "shortListed";
const JobApplicantsResult: React.FC<{
  job: JobData;
  doctors: UserState[];
}> = ({ job, doctors }) => {
  const [selectedTab, setSelectedTab] = useState<TapType>("all");
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);

  const [shortListed, setShortListed] = useState<string[]>([]);

  const isAllSelect = selectedApplicants.length === doctors.length;
  const toggleSelectAll = () => {
    if (isAllSelect) {
      setSelectedApplicants([]);
    } else {
      setSelectedApplicants(doctors.map((x) => x.id || ""));
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

  return (
    <div className="w-full p-2 md:p-4 lg:w-[80%]">
      <div className="w-full pl-[39px]">
        <h2 className="mb-5 text-3xl font-bold text-main">{job.title}</h2>
      </div>

      <div className="flex justify-between pl-[39px]">
        <div className="max-w-[calc(100vw-72px)]">
          <Tabs
            value={selectedTab}
            onChange={(event, value) => setSelectedTab(value)}
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
                  {/* Locked ({doctorsBase.length - availableApplicants.length}) */}
                  Locked (0)
                  <LockIcon className="h-5 w-5 text-red-500" />
                </span>
              }
            />
            <Tab
              value="unlocked"
              label={
                <span className="flex items-center gap-1 normal-case">
                  Unlocked (0)
                  <LockOpenIcon className="h-5 w-5 text-primary" />
                </span>
              }
            />
            <Tab
              value="shortListed"
              label={
                <span className="flex items-center gap-1 normal-case">
                  Shortlisted ({shortListed.length})
                  <StarIcon className="h-5 w-5 text-primary" />
                </span>
              }
            />
          </Tabs>
        </div>
        <FormControl className="hidden min-w-32 md:block">
          <InputLabel id="sort-by-select-label">Sort by</InputLabel>
          <Select
            className="flex h-12"
            value=""
            label="Sort by"
            labelId="sort-by-select-label"
            id="sort-by-select-label"
            onChange={(e) => console.log(e.target.value)}
          >
            <MenuItem value="time-desc">Newest</MenuItem>
            <MenuItem value="time-asc">Oldest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="mb-4 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSelectAll}
            className="h-[32px] w-[32px] bg-primary-100"
          >
            {isAllSelect ? (
              <DeselectIcon className="m-auto h-6 w-6" />
            ) : (
              <SelectAllIcon className="m-auto h-6 w-6" />
            )}
          </button>
          {selectedApplicants.length > 0 && (
            <div>
              <button
                onClick={handleClick}
                aria-controls={open ? "Action-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className="h-fit rounded-md bg-primary-100 p-2 px-4 duration-300 hover:bg-primary hover:text-primary-foreground"
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
                    // addToAvailable();
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
                  <StarBorderOutlinedIcon color="warning" className="h-5 w-5" />
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
            className="h-fit rounded-md bg-primary-100 p-2 px-4 duration-300 hover:bg-primary hover:text-primary-foreground"
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
          availableApplicants={[]} // Replace with actual availableApplicants state
          setAvailableApplicants={() => {}} // Replace with actual setAvailableApplicants function
          selectedApplicants={selectedApplicants}
        />
      ))}

      {/* Pagination */}
      <Snackbar
        open={showCopyAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopyAlert(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default JobApplicantsResult;

const filterDoctors = (
  doctors: Doctor[],
  activeTab: TapType,
  availableApplicants: string[],
  shortListed: string[],
) => {
  switch (activeTab) {
    case "all":
      return doctors;
    case "locked":
      return doctors.filter((obj) => !availableApplicants.includes(obj.id));
    case "unlocked":
      return doctors.filter((obj) => availableApplicants.includes(obj.id));
    case "shortListed":
      return doctors.filter((obj) => shortListed.includes(obj.id));
    default:
      return doctors;
  }
};
