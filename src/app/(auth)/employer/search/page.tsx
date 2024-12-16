"use client";
import {
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Menu,
  Snackbar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import FilterSections from "@/components/UI/filter";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import { doctorsBase as doctors, searchFilters } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import DoctorCard from "@/components/UI/DoctorCard";
import FilterDrawer from "@/components/UI/FilterDrawer";
import { Search } from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const ApplicantsPage: React.FC = () => {
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

  return (
    <Box className="flex min-h-screen w-full flex-row bg-white">
      {/* Left Column: Filter Section */}
      <Box
        className="scroll-bar-hidden hidden h-full lg:block"
        sx={{
          width: "20%",
          position: "sticky",
          top: "107px",
          paddingTop: "101px",
          overflowY: "scroll",
          maxHeight: "calc(100vh - 114px)",
          paddingBottom: "16px",
        }}
      >
        <FilterSections
          sections={searchFilters}
          onFilterChange={handleFilterChange}
          searchKeys={["Residency (Location)"]}
        />
      </Box>

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
                  borderRadius: "4px",
                },
                minWidth: 200,
              }}
            />
            <Button variant="contained">Search</Button>
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

            {selectedApplicants.length > 0 && (
              <>
                <IconButton size="small">
                  <BookmarkIcon color="primary" className="h-6 w-6" />
                </IconButton>
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
                      className="hover:bg-gray-200"
                    >
                      delete
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className="hover:bg-gray-200"
                    >
                      edit
                    </MenuItem>
                  </Menu>
                </div>
              </>
            )}
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
