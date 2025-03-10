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
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import { doctorsBase as doctors, searchFilters } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import { Add, Delete, Mail, Search } from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Image from "next/image";
import InviteModal from "@/components/UI/invite-to-apply-modal";
import FolderModal from "@/components/UI/folder-modal";
import AddToFolderModal from "@/components/UI/add-to-folder-modal";
import CandideCard from "@/components/UI/CandideCard";
import { Doctor } from "@/types";
import SearchInput from "@/components/UI/search-Input";

const CvResults: React.FC<{ candidates: Doctor[] }> = ({ candidates }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [savedList, setSavedList] = useState<string[]>([]);
  const [inviteUser, setInviteUser] = useState("");

  const [available, setAvailable] = useState<string[]>(
    doctors.filter((x) => x.available).map((x) => x.id),
  );
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

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
    handleSaveClose();
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseInviteModal = () => setInviteUser("");

  const [userToFolder, setUserToFolder] = useState<string | null>("");

  const handleCloseAddToFolderModal = () => setUserToFolder(null);
  const handelAddToFolderModal = () => {
    setUserToFolder("folder");
    handleSaveClose();
  };

  return (
    <div className="w-full lg:w-[80%]">
      <div className="h-[80px] w-full pl-[39px]">
        <SearchInput
        formClassName="flex gap-3"
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
        >
          <Button type="submit" variant="contained" className="w-1/5">
            Search
          </Button>
        </SearchInput>
        <p className="mt-2 text-sm text-secondary">Showing 2500 Results</p>
      </div>
      <InviteModal open={!!inviteUser} onClose={handleCloseInviteModal} />
      <FolderModal open={openModal} onClose={handleCloseModal} />
      <AddToFolderModal
        open={!!userToFolder}
        onClose={handleCloseAddToFolderModal}
      />
      <div className="mb-4 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSelectAll}
            className="h-[32px] w-[32px] bg-primary-100 p-[5px]"
          >
            {isAllSelect ? (
              <DeselectIcon className="h-6 w-6" />
            ) : (
              <SelectAllIcon className="h-6 w-6" />
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
                  className="p-0"
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
                    onClick={handleOpenModal}
                    className="flex items-center gap-4 hover:bg-gray-200"
                  >
                    <Image
                      src={"/images/folder.svg"}
                      alt="save"
                      width={24}
                      height={24}
                    />
                    Add New Folder
                    <Add className="h-5 w-5 rounded-full bg-green-500 text-white" />
                  </MenuItem>
                  <MenuItem
                    onClick={handelAddToFolderModal}
                    className="flex items-center gap-4 hover:bg-gray-200"
                  >
                    <Image
                      src={"/images/folder.svg"}
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
                  className="flex h-[32px] items-center rounded-md bg-primary-100 px-4 duration-300 hover:bg-primary hover:text-primary-foreground"
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
                    onClick={() => {
                      setInviteUser("id");
                      handleClose();
                    }}
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <Mail color="primary" className="h-5 w-5" />
                    Invite to Apply
                  </MenuItem>
                  <Divider className="!m-0" />
                  {/* <MenuItem
                  onClick={handleClose}
                  className="flex items-center gap-2 hover:bg-gray-200"
                >
                  <Delete className="h-5 w-5" color="error" />
                  Hide
                </MenuItem> */}
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
          available={available}
          setAvailable={setAvailable}
          setSelected={setSelected}
          selected={selected}
          setInviteUser={setInviteUser}
        />
      ))}

      {/* Pagination */}
      <CustomPagination totalItems={100} />
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

export default CvResults;

function areArraysEqual<T>(array1: T[], array2: T[]): boolean {
  return array1.every((id) => array2.includes(id));
}
