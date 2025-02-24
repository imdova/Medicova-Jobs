"use client";
import React, { memo, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteOutline, PhotoCamera, Verified } from "@mui/icons-material";
import { Company } from "@/types";
import { companySizeList, DEFAULT_COVER_IMAGE } from "@/constants";
import Avatar from "@/components/UI/Avatar";
import Image from "next/image";
import ShareMenu from "@/components/UI/ShareMenu";
import Link from "next/link";
import { FileUploadModal } from "@/components/form/FileUploadModal";

interface EmployerHeaderSectionProps {
  isEmployee: boolean;
  data: Company;
}

const EmployerHeaderSection: React.FC<EmployerHeaderSectionProps> = ({
  data,
  isEmployee,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const updateCoverImage = async (file: File) => {
    setCover(file);
  };
  const size = companySizeList.find((item) => item.value === data.size);

  const updateImage = async (file: File) => {
    setImage(file);
  };
  return (
    <div className="overflow-hidden rounded-base border border-gray-100 bg-white shadow-lg">
      {/* Background Cover Image */}
      <div className="grid grid-cols-1 grid-rows-1">
        {/* Avatar Positioned on Background Image */}
        <div className="col-start-1 row-start-1 min-h-24 w-full">
          <CoverImage
            currentImageUrl={cover ? URL.createObjectURL(cover) : ""}
            onImageUpdate={updateCoverImage}
          />
        </div>
        <div className="col-start-1 row-start-1 flex w-full items-end justify-center px-4 md:justify-start">
          {isEmployee ? (
            <Avatar
              currentImageUrl={
                image ? URL.createObjectURL(image) : data.avatar || ""
              }
              size="xLarge"
              onImageUpdate={updateImage}
              maxFileSizeMB={5}
              className="h-[100px] w-[100px] rounded-full border-4 border-white shadow-md"
              imageClassName="w-full h-full object-cover bg-white hover:bg-gray-50"
            />
          ) : (
            <Image
              src={data.avatar || "/images/placeholder-avatar.svg"}
              alt="avatar"
              width={100}
              height={100}
              className="h-[100px] w-[100px] rounded-full border-4 border-white bg-white object-cover shadow-md"
            />
          )}
        </div>
      </div>
      {/* Profile Section */}
      <div className="rounded-base p-4">
        <Grid container alignItems="start">
          {/* Text Section */}
          <Grid item xs={12} sm={9}>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <h3 className="mb-2 text-2xl font-bold text-main">
                {data.name}
                <Verified className="ml-3 text-primary" />
              </h3>
              {data.title && (
                <Typography
                  variant="body1"
                  sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  {data.title}
                </Typography>
              )}
              <div className="mt-3 flex flex-wrap items-center justify-start">
                <div className="mr-3 flex items-center gap-1">
                  <LocalHospitalIcon className="text-primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data.type}
                  </Typography>
                </div>
                {(data.country || data.state || data.city) && (
                  <div className="mr-3 flex items-center gap-1">
                    <PlaceIcon className="text-primary" />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {data.country?.name +
                        ", " +
                        data.state?.name +
                        ", " +
                        data.city}
                    </Typography>
                  </div>
                )}
                {size && (
                  <div className="mr-3 flex items-center gap-1">
                    <GroupsIcon className="text-primary" />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {size?.name}
                    </Typography>
                  </div>
                )}
              </div>
            </Box>
          </Grid>

          {/* Edit Profile Button */}
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "center", sm: "flex-end" },
                height: "100%",
                gap: 1,
              }}
            >
              {/* Edit Button */}
              {isEmployee && (
                <IconButton LinkComponent={Link} href="/employer/company-info">
                  <EditIcon />
                </IconButton>
              )}
              {/* Share Button */}
              <ShareMenu path={`/co/${data.id}`} />
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EmployerHeaderSection;

interface CoverImageProps {
  currentImageUrl?: string;
  onImageUpdate: (file: File) => Promise<void>;
  onImageRemove?: () => Promise<void>;
}

export const CoverImage = memo(
  ({ currentImageUrl, onImageUpdate, onImageRemove }: CoverImageProps) => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Handlers
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleUploadClick = () => {
      handleMenuClose();
      setIsUploadModalOpen(true);
    };

    const handleRemoveClick = async () => {
      handleMenuClose();
      if (onImageRemove) {
        await onImageRemove();
      }
    };

    const handleUpload = async (files: File[]) => {
      const file = files[0];
      await onImageUpdate(file);
    };
    return (
      <div className="group relative">
        <Image
          src={currentImageUrl || DEFAULT_COVER_IMAGE}
          width={1080}
          height={200}
          alt="cover Image"
          className="aspect-[4/1] min-h-24 w-full object-cover"
        />

        {/* Overlay with PhotoCamera icon */}
        <button
          onClick={handleMenuOpen}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Update profile picture"
        >
          <PhotoCamera className="h-6 w-6 text-white" />
        </button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleUploadClick}>
            <PhotoCamera className="mr-2 h-4 w-4" />
            Update Photo
          </MenuItem>
          {onImageRemove && currentImageUrl && (
            <MenuItem onClick={handleRemoveClick} className="text-red-600">
              <DeleteOutline className="mr-2 h-4 w-4" />
              Remove Photo
            </MenuItem>
          )}
        </Menu>

        <FileUploadModal
          open={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
          title={"Upload a cover image for your blog"}
          uploadButtonText={"Upload"}
          description="choose a picture as your blog cover photo. Supported formats: JPG, PNG, GIF"
        />
      </div>
    );
  },
);

CoverImage.displayName = "CoverImage";
