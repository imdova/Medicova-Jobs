"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  InputLabel,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import AddModal from "./Modals/AddModal";
import { Edit, LanguageOutlined, LinkOutlined } from "@mui/icons-material";
import { UserState } from "@/types";
import Link from "next/link";

const socialMedia: { url: string; name: string; icon: React.ElementType }[] = [
  { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/" },
  { name: "Twitter", icon: TwitterIcon, url: "https://www.instagram.com/" },
  { name: "Website", icon: LanguageIcon, url: "https://www.instagram.com/" },
];
const SocialMediaSection: React.FC<{
  user: UserState;
  isMe: boolean;
  isLocked: boolean;
}> = ({ user, isMe, isLocked }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [fields, setFields] = useState<JSX.Element[]>([]);

  const handleOpenModal = (title: string, getFields: () => JSX.Element[]) => {
    setModalTitle(title);
    setFields(getFields());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if ((!isMe && socialMedia.length === 0) || isLocked) {
    return null;
  }

  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-bold text-main">Social Links</h3>
        {isMe && (
          <IconButton
            className="rounded border border-solid border-gray-300 p-2"
            onClick={() =>
              handleOpenModal("Add Social Media", getSocialMediaFields)
            }
          >
            <Edit />
          </IconButton>
        )}
      </div>
      <AddModal
        open={openModal}
        onClose={handleCloseModal}
        modalTitle={modalTitle}
        fields={fields}
      />
      {!isLocked && (
        <div className="flex gap-4">
          {socialMedia.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link key={index} href={item.url} className="text-primary">
                {IconComponent ? <IconComponent /> : <LanguageOutlined />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SocialMediaSection;

const getSocialMediaFields = (): JSX.Element[] => [
  <Box key="socialMediaInfo">
    <Typography sx={{ fontSize: "14px", color: "#7C8493", marginBottom: 2 }}>
      Add elsewhere links to your profile. You can add full https links.
    </Typography>
  </Box>,

  <Box key="instagram">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Instagram
    </InputLabel>
    <TextField
      placeholder="Enter Instagram Link"
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          fontSize: "14px",
        },
      }}
    />
  </Box>,

  <Box key="facebook">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Facebook
    </InputLabel>
    <TextField
      placeholder="Enter Facebook Link"
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          fontSize: "14px",
        },
      }}
    />
  </Box>,

  <Box key="twitter">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      Twitter
    </InputLabel>
    <TextField
      placeholder="Enter Twitter Link"
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          fontSize: "14px",
        },
      }}
    />
  </Box>,

  <Box key="linkedin">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      LinkedIn
    </InputLabel>
    <TextField
      placeholder="Enter LinkedIn Link"
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          fontSize: "14px",
        },
      }}
    />
  </Box>,

  <Box key="youtube">
    <InputLabel
      sx={{
        marginBottom: 0.2,
        fontWeight: 600,
        color: "#000",
        fontSize: "14px",
      }}
    >
      YouTube
    </InputLabel>
    <TextField
      placeholder="Enter YouTube Link"
      fullWidth
      sx={{
        backgroundColor: "rgba(214, 221, 235, 0.18)",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          fontSize: "14px",
        },
      }}
    />
  </Box>,
];
