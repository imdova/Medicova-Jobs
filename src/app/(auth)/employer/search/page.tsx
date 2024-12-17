"use client";
import {
  Box,
  MenuItem,
  Menu,
  Snackbar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import FilterSections from "@/components/UI/filter";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import { doctorsBase as doctors, searchFilters } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import {
  Add,
  Delete,
  LockOpenOutlined,
  Mail,
  Search,
} from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CandideCard from "./CandideCard";
import Image from "next/image";

const ApplicantsPage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [availableApplicants, setAvailableApplicants] = useState<string[]>(
    doctors.filter((x) => x.available).map((x) => x.id),
  );
  const [savedList, setSavedList] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [K in keyof typeof searchFilters]: (typeof searchFilters)[K][number]["value"];
  }>({
    "Residency (Location)": "",
    city: "",
    nationality: "",
    industry: "",
    category: "",
    "Education Level": "",
    "Years Of Experience": "",
    gender: "",
    age: "",
  });
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items per page
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page

  const isAllSelect = selected.length === doctors.length;
  const toggleSelectAll = () => {
    if (isAllSelect) {
      setSelected([]);
    } else {
      setSelected(doctors.map((x) => x.id));
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

  // save to folder
  const [saveAnchorEl, setSaveAnchorEl] = useState(null);
  const saveOpen = Boolean(saveAnchorEl);
  const handleSaveClick = (event: any) => {
    setSaveAnchorEl(event.currentTarget);
  };
  const handleSaveClose = () => {
    setSaveAnchorEl(null);
  };

  // - // short list action
  const removeFromSavedList = () => {
    if (!selected.length) return;
    setSavedList((pv) => pv.filter((id) => !selected.includes(id)));
  };
  const saveToList = () => {
    if (!selected.length) return;
    setSavedList((pv) => pv.concat(selected.filter((id) => !pv.includes(id))));
  };

  const toggleSelect = () => {
    if (areArraysEqual(selected, savedList)) {
      removeFromSavedList();
    } else {
      saveToList();
    }
  };

  const addToAvailable = () => {
    if (!selected.length) return;
    setAvailableApplicants((pv) =>
      pv.concat(selected.filter((id) => !pv.includes(id))),
    );
  };

  return (
    <Box className="flex min-h-screen w-full flex-row bg-white">
      {/* Left Column: Filter Section */}
      <FilterSections
        className="scroll-bar-hidden sticky top-[107px] hidden max-h-[calc(100vh-114px)] w-1/5 overflow-y-scroll pb-[16px] pt-[101px] lg:block"
        sections={searchFilters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        searchKeys={["Residency (Location)", "nationality"]}
      />
      {/* Right Column: Results Section */}
      <Box className="w-full p-2 md:p-4 lg:w-[80%]">
        <div className="h-[80px] w-full">
          <div className="flex gap-2">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Job Candidates CV's"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                },
                minWidth: 200,
              }}
            />
            <Button variant="contained" className="w-1/5">
              Search
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-500">Showing 2500 Results</p>
        </div>

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

            {selected.length > 0 && (
              <>
                <div>
                  <IconButton
                    onClick={handleSaveClick}
                    aria-controls={saveOpen ? "save-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={saveOpen ? "true" : undefined}
                    size="medium"
                  >
                    <BookmarkIcon color="primary" className="h-8 w-8" />
                  </IconButton>
                  <Menu
                    id="save-menu"
                    anchorEl={saveAnchorEl}
                    open={saveOpen}
                    onClose={handleSaveClose}
                    className="mt-2"
                  >
                    <MenuItem
                      onClick={handleSaveClose}
                      className="flex items-center gap-4 hover:bg-gray-200"
                    >
                      <Image
                        src={"/images/folder.png"}
                        alt="save"
                        width={24}
                        height={24}
                      />
                      Add New Folder
                      <Add className="h-5 w-5 rounded-full bg-green-500 text-white" />
                    </MenuItem>
                    <MenuItem
                      onClick={handleSaveClose}
                      className="flex items-center gap-4 hover:bg-gray-200"
                    >
                      <Image
                        src={"/images/folder.png"}
                        alt="save"
                        width={24}
                        height={24}
                      />
                      Save in existing folder
                    </MenuItem>
                  </Menu>
                </div>
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
                      <LockOpenOutlined color="primary" className="h-5 w-5" />
                      Unlock Profile
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
              </>
            )}
          </div>
        </div>
        {/* Applicant Cards */}
        {doctors.map((doctor, index) => (
          <CandideCard
            key={index}
            doctor={doctor}
            savedList={savedList}
            setSavedList={setSavedList}
            setSelected={setSelected}
            availableApplicants={availableApplicants}
            selected={selected}
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

function areArraysEqual<T>(array1: T[], array2: T[]): boolean {
  return array1.every((id) => array2.includes(id));
}
