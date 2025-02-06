"use client";
import React, { useState } from "react";
import { Box, IconButton, Typography, Grid } from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { Verified } from "@mui/icons-material";
import { Company } from "@/types";
import { companySizeList } from "@/constants";
import Avatar from "@/components/UI/Avatar";
import Image from "next/image";
import ShareMenu from "@/components/UI/ShareMenu";
import Link from "next/link";

interface EmployerHeaderSectionProps {
  isEmployee: boolean;
  data: Company;
}

const EmployerHeaderSection: React.FC<EmployerHeaderSectionProps> = ({
  data,
  isEmployee,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const size = companySizeList.find((item) => item.value === data.size);

  const updateImage = async (file: File) => {
    setImage(file);
  };
  return (
    <div className="overflow-hidden rounded-base border border-gray-100 bg-white shadow-lg">
      {/* Background Cover Image */}
      <Box
        component="div"
        sx={{
          width: "100%",
          height: { xs: "150px", sm: "200px" },
          backgroundImage: "url('https://via.placeholder.com/1500x400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Avatar Positioned on Background Image */}
        {isEmployee ? (
          <Avatar
            currentImageUrl={
              image ? URL.createObjectURL(image) : data.photo || ""
            }
            size="xLarge"
            onImageUpdate={updateImage}
            maxFileSizeMB={5}
            className="rounded-full absolute bottom-[-50px] left-[20px] h-[80px] w-[80px] border-4 border-white shadow-md md:h-[120px] md:w-[120px]"
            imageClassName="w-full h-full object-cover bg-white hover:bg-gray-50"
          />
        ) : (
          <Image
            src={data.photo || "/images/placeholder-avatar.svg"}
            alt="avatar"
            width={100}
            height={100}
            className="absolute bottom-[-50px] left-[20px] h-[80px] w-[80px] rounded-full border-4 border-white bg-white object-cover shadow-md md:h-[120px] md:w-[120px]"
          />
        )}
      </Box>
      {/* Profile Section */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "0 0 8px 8px",
          marginTop: "45px",
        }}
      >
        <Grid container alignItems="start">
          {/* Text Section */}
          <Grid item xs={12} sm={9}>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <h3 className="mb-2 text-main text-2xl font-bold">
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
                    {data.type?.name}
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
      </Box>
    </div>
  );
};

export default EmployerHeaderSection;
