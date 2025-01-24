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
  const removeImage = async () => {
    console.log("remove image");
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

        <Avatar
          currentImageUrl={image ? URL.createObjectURL(image) : data.photo || ""}
          size="xLarge"
          onImageUpdate={updateImage}
          onImageRemove={removeImage}
          maxFileSizeMB={5}
          imageClassName="w-full h-full object-cover bg-white hover:bg-gray-50"
          containerClassName="rounded-full absolute bottom-[-50px] left-[20px] h-[80px] w-[80px] border-4 border-white shadow-md md:h-[120px] md:w-[120px]"
          acceptedFileTypes={["image/jpeg", "image/png", "image/gif"]}
        />
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
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#000",
                  marginBottom: "4px",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                {data.name}
                <Verified className="ml-3 text-primary" />
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                Healthcare: Medical Services and Education healthcare
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  alignItems: "center",
                  justifyContent: "start",
                  my: { xs: 1, sm: 2 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalHospitalIcon className="text-primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {data.type.name}
                  </Typography>
                </Box>
                {(data.country || data.state || data.city) && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PlaceIcon className="text-primary" />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {data.country + ", " + data.state + ", " + data.city}
                    </Typography>
                  </Box>
                )}
                {size && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <GroupsIcon className="text-primary" />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {size?.name}
                    </Typography>
                  </Box>
                )}
              </Box>
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
                <IconButton>
                  <EditIcon />
                </IconButton>
              )}
              {/* Share Button */}
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EmployerHeaderSection;
