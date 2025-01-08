"use client";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CheckIcon from "@mui/icons-material/Check";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import { Doctor } from "@/types";
import Image from "next/image";
import {
  Add,
  BookmarkAddOutlined,
  BookmarkBorderOutlined,
  BookmarkOutlined,
  KeyOutlined,
} from "@mui/icons-material";
import { formatName } from "@/util";
import AddToFolderModal from "./add-to-folder-modal";
import Link from "next/link";
import FolderModal from "./folder-modal";

interface CandidateCardProps {
  doctor: Doctor;
  selected: string[];
  available: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setInviteUser: React.Dispatch<React.SetStateAction<string>>;
  setAvailable: React.Dispatch<React.SetStateAction<string[]>>;
}

const CandideCard: React.FC<CandidateCardProps> = ({
  doctor,
  available,
  selected,
  setSelected,
  setInviteUser,
  setAvailable,
}) => {
  const isSelected = selected.includes(doctor.id);
  const isAvailable = available.includes(doctor.id);
  const toggleSelect = () => setSelected((pv) => toggleId(pv, doctor.id));

  // save to folder
  const [saveAnchorEl, setSaveAnchorEl] = useState(null);
  const saveOpen = Boolean(saveAnchorEl);
  const handleSaveClick = (event: any) => {
    setSaveAnchorEl(event.currentTarget);
  };
  const handleSaveClose = () => {
    setSaveAnchorEl(null);
  };
  const unlock = () => {
    setAvailable((pv) => [...pv, doctor.id]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <button
        onClick={toggleSelect}
        className={`${
          isSelected ? "border-primary bg-primary" : "border-gray-100 bg-white"
        } mr-1 h-[28px] w-[28px] rounded-base rounded-bl-none border-2 shadow-lg md:rounded-bl-base md:rounded-tr-none`}
      >
        {isSelected && <CheckIcon className="m-auto h-5 w-5 text-white" />}
      </button>

      <div className="mb-2 flex w-full flex-col rounded-base rounded-tl-none border border-gray-100 bg-white p-2 shadow-xl md:p-5">
        <div className="w-full">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar
                src={doctor.image}
                alt={isAvailable ? doctor.name : formatName(doctor.name)}
                sx={{ width: { xs: 50, md: 70 }, height: { xs: 50, md: 70 } }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/me/${doctor.name}`}
                    className="font-semibold text-main hover:underline md:text-[20px]"
                  >
                    {isAvailable ? doctor.name : formatName(doctor.name)}
                  </Link>
                  {isAvailable ? (
                    <LockOpenIcon className="h-5 w-5 text-primary" />
                  ) : (
                    <LockIcon className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <p className="text-secondary">
                  Cardiology Consultant at{" "}
                  <strong className="text-main">Saudi German Hospital</strong>
                </p>
                <div className="flex items-center gap-2 rounded-base text-secondary">
                  <SchoolIcon className="h-4 w-4 text-light-primary md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">
                    Master&apos;s Degree in Cardiology{" "}
                    <span className="mx-1 text-sm">(2022 - 2026)</span>
                  </p>
                </div>
              </div>
            </div>
            <IconButton
              onClick={handleSaveClick}
              aria-controls={saveOpen ? "save-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={saveOpen ? "true" : undefined}
              size="medium"
            >
              <BookmarkBorderOutlined className="h-8 w-8 text-secondary" />
            </IconButton>
            <SaveMenu
              saveAnchorEl={saveAnchorEl}
              saveOpen={saveOpen}
              handleSaveClose={handleSaveClose}
            />
          </div>
          <div className="flex flex-col items-end md:flex-row">
            <div className="flex-1">
              <div className="mt-1 flex flex-wrap items-center gap-2 md:flex-nowrap">
                <h6 className="mr-2 hidden rounded-base bg-primary-100 px-2 py-1 text-main md:block">
                  Contact Info :
                </h6>
                {/* <div className="flex items-center gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary">
                  <LocalPhoneIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">{doctor.location}</p>
                </div> */}
                <div className="flex min-w-[80px] items-center rounded-base bg-primary-100 px-2 py-1 text-main">
                  <LocalPhoneIcon className="h-4 w-4 text-secondary md:h-5 md:w-5" />
                  {isAvailable ? (
                    <span className="text-xs md:text-base">
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
                  <IconButton
                    disabled={!doctor.available}
                    className="p-0 md:ml-2"
                  >
                    <ContentCopyIcon className="h-4 w-4 md:h-5 md:w-5" />
                  </IconButton>
                </div>
                <div className="flex items-center rounded-base bg-primary-100 px-2 py-1 text-main">
                  <EmailIcon className="h-4 w-4 text-secondary md:h-5 md:w-5" />
                  {isAvailable ? (
                    <span className="h-fit text-sm text-main md:text-base">
                      {doctor.contactInfo.email}
                    </span>
                  ) : (
                    <div className="col-span-1 row-span-1 grid h-fit">
                      <span className="z-10 col-start-1 row-start-1 bg-white/20 px-2 text-sm backdrop-blur-[3px] md:text-base"></span>
                      <span className="col-start-1 row-start-1 select-none px-2 text-sm md:text-base">
                        this is dumy number
                      </span>
                    </div>
                  )}
                  <IconButton
                    disabled={!doctor.available}
                    className="p-0 md:ml-2"
                  >
                    <ContentCopyIcon className="h-4 w-4 md:h-5 md:w-5" />
                  </IconButton>
                </div>
              </div>
              <div className="my-1 flex flex-wrap gap-2 text-main">
                <div className="flex items-center gap-2 rounded-base text-secondary">
                  <LocationOnIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">{doctor.location}</p>
                </div>
                <div className="flex items-center gap-2 rounded-base text-secondary">
                  <PeopleAltIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Doctors</p>
                </div>
                <div className="flex items-center gap-2 rounded-base text-secondary">
                  <WorkspacePremiumIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">
                    {doctor.yearsOfExperience} years Experience
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-base text-secondary">
                  <PersonIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Consultant</p>
                </div>
                <div className="flex items-center gap-2 rounded-base text-secondary">
                  <MedicalServicesIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Cardiology</p>
                </div>
              </div>
            </div>
            <div
              className={`${isAvailable ? "mt-10" : "mt-2"} flex w-full flex-row md:w-auto md:flex-col`}
            >
              {!isAvailable && (
                <Button
                  startIcon={<KeyOutlined />}
                  variant="text"
                  className="mb-2 flex-1 text-nowrap p-0"
                  onClick={unlock}
                >
                  Unlock Now
                </Button>
              )}
              <Button
                className="flex-1 text-nowrap"
                onClick={() => setInviteUser("id")}
                variant="contained"
              >
                Invite To Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandideCard;

interface SaveMenuProps {
  saveAnchorEl: null | HTMLElement;
  saveOpen: boolean;
  handleSaveClose: () => void;
}

const SaveMenu: React.FC<SaveMenuProps> = ({
  saveAnchorEl,
  saveOpen,
  handleSaveClose,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
    handleSaveClose();
  };
  const handleCloseModal = () => setOpenModal(false);

  const [userToFolder, setUserToFolder] = useState<string | null>("");

  const handleCloseAddToFolderModal = () => setUserToFolder(null);
  const handelAddToFolderModal = () => {
    setUserToFolder("folder");
    handleSaveClose();
  };
  return (
    <>
      <FolderModal open={openModal} onClose={handleCloseModal} />
      <AddToFolderModal
        open={!!userToFolder}
        onClose={handleCloseAddToFolderModal}
      />
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
          <Image src={"/images/folder.png"} alt="save" width={24} height={24} />
          Add New Folder
          <Add className="h-5 w-5 rounded-full bg-green-500 text-white" />
        </MenuItem>
        <MenuItem
          onClick={handelAddToFolderModal}
          className="flex items-center gap-4 hover:bg-gray-200"
        >
          <Image src={"/images/folder.png"} alt="save" width={24} height={24} />
          Save in existing folder
        </MenuItem>
      </Menu>
    </>
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
