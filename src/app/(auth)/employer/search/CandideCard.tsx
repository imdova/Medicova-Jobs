"use client";
import {
  Avatar,
  Button,
  Typography,
  Stack,
  IconButton,
  Collapse,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CheckIcon from "@mui/icons-material/Check";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import { Doctor } from "@/types";
import Flag from "@/components/UI/flagitem";
import Image from "next/image";
import { Add } from "@mui/icons-material";
import { formatName } from "@/util";
import FolderModal from "./saved-search/folder-modal";
import AddToFolderModal from "./add-to-folder-modal";

interface CandidateCardProps {
  doctor: Doctor;
  selected: string[];
  savedList: string[];
  setSavedList: React.Dispatch<React.SetStateAction<string[]>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setInviteUser: React.Dispatch<React.SetStateAction<string>>;
}

const CandideCard: React.FC<CandidateCardProps> = ({
  doctor,
  savedList,
  setSavedList,
  selected,
  setSelected,
  setInviteUser,
}) => {
  const [showMore, setShowMore] = useState(false);

  const isSelected = selected.includes(doctor.id);
  const isSaved = savedList.includes(doctor.id);

  const toggleSelect = () => setSelected((pv) => toggleId(pv, doctor.id));

  const toggleSave = () => setSavedList((pv) => toggleId(pv, doctor.id));

  // save to folder
  const [saveAnchorEl, setSaveAnchorEl] = useState(null);
  const saveOpen = Boolean(saveAnchorEl);
  const handleSaveClick = (event: any) => {
    setSaveAnchorEl(event.currentTarget);
  };
  const handleSaveClose = () => {
    setSaveAnchorEl(null);
  };

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
    <div className="mb-4 flex">
      <FolderModal open={openModal} onClose={handleCloseModal} />
      <AddToFolderModal
        open={!!userToFolder}
        onClose={handleCloseAddToFolderModal}
      />
      <button
        onClick={toggleSelect}
        className={`${
          isSelected ? "border-primary bg-primary" : "border-[#D6DDEB]"
        } mr-2 h-[24px] min-w-[24px] rounded-sm border-2 md:h-[32px] md:min-w-[32px]`}
      >
        {isSelected && <CheckIcon className="m-auto h-5 w-5 text-white" />}
      </button>

      <div className="flex w-full flex-col rounded-md border bg-white p-2 shadow-md md:p-5">
        <div className="flex w-full flex-wrap items-center justify-between gap-5 sm:flex-nowrap">
          <div className="flex gap-5">
            <div>
              <Avatar
                src={
                  doctor.image ||
                  "https://randomuser.me/api/portraits/men/4.jpg"
                }
                alt={formatName(doctor.name)}
                sx={{ width: { xs: 50, md: 100 }, height: { xs: 50, md: 100 } }}
              />
            </div>
            <div>
              <Stack direction="row" alignItems="center" gap={1}>
                <h2 className="text-lg font-semibold text-main md:text-2xl">
                  {formatName(doctor.name)}
                </h2>

                {doctor.available ? (
                  <LockOpenIcon className="h-5 w-5 text-primary" />
                ) : (
                  <LockIcon className="h-5 w-5 text-red-500" />
                )}
              </Stack>
              <div className="my-1 flex max-w-[450px] flex-wrap gap-2 text-main">
                <div className="flex items-center gap-2">
                  <LocationOnIcon
                    color="primary"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <p className="text-xs md:text-base">{doctor.location}</p>
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
                  <p className="text-xs md:text-base">
                    {doctor.yearsOfExperience} years Experience
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SchoolIcon
                    color="primary"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <p className="text-xs md:text-base">
                    {doctor.education[0].degree} Degree
                  </p>
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
                <h6 className="text-sm font-semibold text-main md:text-base">
                  Contact Info :
                </h6>
                <div className="flex flex-wrap justify-between">
                  <div className="mr-4 flex min-w-[80px] items-center">
                    <LocalPhoneIcon
                      color="primary"
                      className="h-4 w-4 md:h-5 md:w-5"
                    />
                    {doctor.available ? (
                      <span className="mx-1 h-fit text-sm text-main md:text-base">
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
                      className="p-0 md:p-2"
                    >
                      <ContentCopyIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </IconButton>
                  </div>
                  <div className="flex items-center">
                    <EmailIcon
                      color="primary"
                      className="h-4 w-4 md:h-5 md:w-5"
                    />
                    {doctor.available ? (
                      <span className="mx-1 h-fit break-all text-sm text-main md:text-base">
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
                    <IconButton
                      disabled={!doctor.available}
                      className="p-0 md:p-2"
                    >
                      <ContentCopyIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-fit w-full justify-center gap-2 sm:w-auto">
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
                  onClick={handleOpenModal}
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
                  onClick={handelAddToFolderModal}
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
            <Button
              onClick={() => setInviteUser("id")}
              variant="contained"
              className="w-full"
            >
              Invite To Apply
            </Button>
          </div>
        </div>
        <Experience
          className="hidden flex-col items-center gap-2 bg-[#F8F8FD] p-5 md:flex"
          {...doctor}
        />
        <Collapse
          className="block md:hidden"
          in={showMore}
          timeout="auto"
          unmountOnExit
        >
          <Experience
            className="flex flex-col items-center gap-2 bg-[#F8F8FD] p-5"
            {...doctor}
          />
        </Collapse>

        <button
          onClick={() => setShowMore((pv) => !pv)}
          className="w-full px-2 pt-3 text-primary md:hidden"
        >
          {showMore
            ? "Hide Experience & Education"
            : "Show Experience & Education"}
        </button>
      </div>
    </div>
  );
};

export default CandideCard;

const Experience: React.FC<Doctor & { className?: string }> = ({
  id,
  education,
  experience,
  className,
}) => {
  return (
    <div className={className}>
      {experience.map((exp, index) => (
        <div
          className="flex w-full max-w-[700px] flex-wrap items-center gap-1 md:gap-4"
          key={`${id}-exp-${index}`}
        >
          <div className="flex w-[65%] items-center gap-3">
            <WorkOutlineOutlinedIcon color="primary" />
            <p className="text-sm font-semibold text-main md:text-base">
              {exp.name}
            </p>
          </div>
          <div className="w-fit rounded-md bg-white px-4 py-2 text-xs text-main">
            <Flag {...exp.country} /> {exp.country.name}
          </div>
          <div>
            <p className="text-xs text-secondary md:text-sm">
              ({exp.startDate} - {exp.endDate})
            </p>
          </div>
        </div>
      ))}
      {/* Education */}
      {education.map((edu, index) => (
        <div
          className="flex w-full max-w-[700px] flex-wrap items-center gap-1 md:gap-4"
          key={`${id}-edu-${index}`}
        >
          <div className="flex w-[65%] items-center gap-3">
            <SchoolIcon color="primary" />
            <div>
              <p className="text-sm font-semibold text-main md:text-base">
                {edu.name}
              </p>
              <p className="text-xs text-secondary md:text-sm">
                {edu.degree} in {edu.specialty}
              </p>
            </div>
          </div>
          <div className="w-fit rounded-md bg-white px-4 py-2 text-xs text-main">
            <Flag {...edu.country} /> {edu.country.name}
          </div>
          <div>
            <p className="text-xs text-secondary md:text-sm">
              ({edu.startDate} - {edu.endDate})
            </p>
          </div>
        </div>
      ))}
    </div>
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
