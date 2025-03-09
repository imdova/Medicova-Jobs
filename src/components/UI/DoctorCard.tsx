"use client";
import {
  Avatar,
  Button,
  Typography,
  Stack,
  IconButton,
  Collapse,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MessageIcon from "@mui/icons-material/Message";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";

import DownloadIcon from "@mui/icons-material/Download";

import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { Doctor } from "@/types";
import Flag from "./flagitem";
import { formatName } from "@/util";
import { KeyOutlined } from "@mui/icons-material";

interface DoctorCardProps {
  doctor: Doctor;
  selectedApplicants: string[];
  availableApplicants: string[];
  shortListed: string[];
  setShortListed: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedApplicants: React.Dispatch<React.SetStateAction<string[]>>;
  setAvailableApplicants: React.Dispatch<React.SetStateAction<string[]>>;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  availableApplicants,
  shortListed,
  setShortListed,
  setAvailableApplicants,
  selectedApplicants,
  setSelectedApplicants,
}) => {
  const [showMore, setShowMore] = useState(false);

  const isSelected = selectedApplicants.includes(doctor.id);
  const isAvailable = availableApplicants.includes(doctor.id);
  const isShortListed = shortListed.includes(doctor.id);

  const toggleSelect = () =>
    setSelectedApplicants((pv) => toggleId(pv, doctor.id));

  const toggleShortListed = () =>
    setShortListed((pv) => toggleId(pv, doctor.id));

  const unlock = () => {
    setAvailableApplicants((pv) => [...pv, doctor.id]);
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
                <div className="flex flex-wrap items-center gap-2">
                  <h6 className="font-semibold text-main md:text-xl">
                    {isAvailable ? doctor.name : formatName(doctor.name)}
                  </h6>
                  {isAvailable ? (
                    <LockOpenIcon className="h-5 w-5 text-primary" />
                  ) : (
                    <LockIcon className="h-5 w-5 text-red-500" />
                  )}
                  <p className="text-xs text-secondary md:text-sm">3d ago</p>
                </div>
                <p className="text-secondary">
                  Cardiology Consultant at{" "}
                  <strong className="text-main">Saudi German Hospital</strong>
                </p>
              </div>
            </div>
            {/* <IconButton
              onClick={handleSaveClick}
              aria-controls={saveOpen ? "save-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={saveOpen ? "true" : undefined}
              size="medium"
            >
              <BookmarkBorderOutlined className="h-8 w-8 text-secondary" />
            </IconButton> */}
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
                <div className="flex items-center gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary">
                  <LocationOnIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">{doctor.location}</p>
                </div>
                <div className="flex items-center gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary">
                  <PeopleAltIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Doctors</p>
                </div>
                <div className="flex items-center gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary">
                  <WorkspacePremiumIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">
                    {doctor.yearsOfExperience} years Experience
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary">
                  <SchoolIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">
                    {doctor.education[0].degree} Degree
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary">
                  <PersonIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Consultant</p>
                </div>
                <div className="flex items-center gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary">
                  <MedicalServicesIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Cardiology</p>
                </div>
              </div>
            </div>
            <div className="mt-2 flex w-full flex-row gap-2 md:w-auto md:flex-col">
              <div className="flex justify-between gap-2">
                <IconButton
                  disabled={!isAvailable}
                  size="small"
                  color="primary"
                  sx={{
                    border: 1,
                    padding: "6px",
                    borderColor: "grey.300",
                    borderRadius: 0,
                    "&:hover": { border: 1, borderColor: "primary.main" },
                  }}
                >
                  <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6" />
                </IconButton>
                <IconButton
                  disabled={!isAvailable}
                  size="small"
                  color="primary"
                  sx={{
                    border: 1,
                    padding: "6px",
                    borderColor: "grey.300",
                    borderRadius: 0,
                    "&:hover": { border: 1, borderColor: "primary.main" },
                  }}
                >
                  <MessageIcon className="h-5 w-5 md:h-6 md:w-6" />
                </IconButton>
                <IconButton
                  onClick={toggleShortListed}
                  size="small"
                  color="primary"
                  sx={{
                    border: 1,
                    padding: "6px",
                    borderColor: "grey.300",
                    borderRadius: 0,
                    "&:hover": { border: 1, borderColor: "primary.main" },
                  }}
                >
                  {isShortListed ? (
                    <StarIcon className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <StarBorderOutlinedIcon className="h-5 w-5 md:h-6 md:w-6" />
                  )}
                </IconButton>
              </div>
              {isAvailable ? (
                <Button
                  variant="outlined"
                  className="w-full text-sm md:text-base"
                  startIcon={<DownloadIcon className="h-5 w-5 md:h-6 md:w-6" />}
                >
                  Download CV
                </Button>
              ) : (
                <Button
                  startIcon={<KeyOutlined />}
                  className="flex-1 text-nowrap"
                  onClick={unlock}
                  variant="contained"
                >
                  Unlock Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

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
