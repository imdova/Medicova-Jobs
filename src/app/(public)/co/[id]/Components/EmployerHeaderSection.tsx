"use client";
import React, { memo, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import { Verified } from "@mui/icons-material";
import { Company } from "@/types";
import { companySizeList } from "@/constants";
import Avatar from "@/components/UI/Avatar";
import Image from "next/image";
import ShareMenu from "@/components/UI/ShareMenu";
import Link from "next/link";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_COMPANY } from "@/api/employer";
import { TAGS } from "@/api";
import uploadImages from "@/lib/files/imageUploader";
import { ProfileCoverImage } from "@/components/pages/co/ProfileCoverImage";

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


  const size = companySizeList.find((item) => item.value === data.size);

  const { update } = useUpdateApi<Company>();

  const handleUpdateCompany = async (formData: Partial<Company>) => {
    await update(API_UPDATE_COMPANY, {
      body: { id: data.id, ...formData } as Company,
    }, TAGS.company);
  };

  const updateImage = async (file: File) => {
    const [avatar] = await uploadImages([file]);
    handleUpdateCompany({ avatar });
    setImage(file);
  };
  const updateCoverImage = async (file: File) => {
    const [cover] = await uploadImages([file]);
    handleUpdateCompany({ cover });
    setCover(file);
  };
  return (
    <div className="overflow-hidden rounded-base border border-gray-100 bg-white shadow-lg">
      {/* Background Cover Image */}
      <div className="grid grid-cols-1 grid-rows-1">
        {/* Avatar Positioned on Background Image */}
        <div className="col-start-1 row-start-1 min-h-24 w-full">
          <ProfileCoverImage
            currentImageUrl={cover ? URL.createObjectURL(cover) : data.cover || ""}
            onImageUpdate={isEmployee ? updateCoverImage : undefined}
          />
        </div>
        <div className="col-start-1 row-start-1 z-[1] flex w-full items-end justify-center px-4 md:justify-start">
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
              <ShareMenu path={`/co/${data.username}`} />
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EmployerHeaderSection;

