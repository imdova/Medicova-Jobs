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
    <div className="mb-4 flex">
      <button
        onClick={toggleSelect}
        className={`${
          isSelected ? "border-primary bg-primary" : "border-[#D6DDEB]"
        } mr-2 h-[24px] min-w-[24px] rounded-sm border-2 md:h-[32px] md:min-w-[32px]`}
      >
        {isSelected && (
          <CheckIcon className="text-primary-foreground m-auto h-5 w-5" />
        )}
      </button>

      <div className="flex w-full flex-col rounded-md border bg-white p-2 shadow-md md:p-5">
        <div className="flex w-full flex-wrap justify-between gap-5 sm:flex-nowrap">
          <div className="flex gap-5">
            <div>
              <Avatar
                src={
                  doctor.image ||
                  "https://randomuser.me/api/portraits/men/4.jpg"
                }
                alt={isAvailable ? doctor.name : formatName(doctor.name)}
                sx={{ width: { xs: 50, md: 100 }, height: { xs: 50, md: 100 } }}
              />
              <p className="text-secondary mt-2 max-w-[100px] text-center text-xs">
                applied 6 days ago
              </p>
            </div>
            <div>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography
                  variant="h2"
                  className="text-main"
                  sx={{
                    fontWeight: "600",
                    fontSize: { xs: "16px", md: "22px" },
                  }}
                >
                  {isAvailable ? doctor.name : formatName(doctor.name)}
                </Typography>
                {isAvailable ? (
                  <LockOpenIcon className="text-primary h-5 w-5" />
                ) : (
                  <LockIcon className="h-5 w-5 text-red-500" />
                )}
              </Stack>
              <div className="text-secondary my-1 flex max-w-[450px] flex-wrap gap-2">
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
                <h6 className="text-main text-sm font-semibold md:text-base">
                  Contact Info :
                </h6>
                <div className="flex flex-wrap justify-between">
                  <div className="mr-4 flex min-w-[80px] items-center">
                    <LocalPhoneIcon
                      color="primary"
                      className="h-4 w-4 md:h-5 md:w-5"
                    />
                    {isAvailable ? (
                      <span className="text-main mx-1 h-fit text-sm md:text-base">
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

                    <IconButton disabled={!isAvailable} className="p-0 md:p-2">
                      <ContentCopyIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </IconButton>
                  </div>
                  <div className="flex items-center">
                    <EmailIcon
                      color="primary"
                      className="h-4 w-4 md:h-5 md:w-5"
                    />
                    {isAvailable ? (
                      <span className="text-main mx-1 h-fit break-all text-sm md:text-base">
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
                    <IconButton disabled={!isAvailable} className="p-0 md:p-2">
                      <ContentCopyIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-2 sm:w-auto sm:flex-col">
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
                variant="contained"
                className="w-full"
                onClick={unlock}
                startIcon={<VpnKeyOutlinedIcon />}
              >
                Unlock Profile
              </Button>
            )}
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
          className="text-primary w-full px-2 pt-3 md:hidden"
        >
          {showMore
            ? "Hide Experience & Education"
            : "Show Experience & Education"}
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;

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
            <p className="text-main text-sm font-semibold md:text-base">
              {exp.name}
            </p>
          </div>
          <div className="text-main w-fit rounded-md bg-white px-4 py-2 text-xs">
            <Flag {...exp.country} /> {exp.country.name}
          </div>
          <div>
            <p className="text-secondary text-xs md:text-sm">
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
              <p className="text-main text-sm font-semibold md:text-base">
                {edu.name}
              </p>
              <p className="text-secondary text-xs md:text-sm">
                {edu.degree} in {edu.specialty}
              </p>
            </div>
          </div>
          <div className="text-main w-fit rounded-md bg-white px-4 py-2 text-xs">
            <Flag {...edu.country} /> {edu.country.name}
          </div>
          <div>
            <p className="text-secondary text-xs md:text-sm">
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
