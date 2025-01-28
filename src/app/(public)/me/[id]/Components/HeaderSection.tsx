"use client";
import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Verified } from "@mui/icons-material";
import ShareMenu from "@/components/UI/ShareMenu";
import { UserProfile } from "@/types";
import Link from "next/link";
import Avatar from "@/components/UI/Avatar";
import Image from "next/image";

const HeaderSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const [image, setImage] = useState<File | null>(null);

  const updateImage = async (file: File) => {
    setImage(file);
  };
  const removeImage = async () => {
    console.log("remove image");
  };

  return (
    <div className="flex h-fit min-h-[200px] w-full flex-col items-center gap-8 overflow-hidden rounded-base rounded-t-base border border-gray-100 bg-primary-100 p-5 shadow-lg lg:flex-row">
      {/* <Avatar
        alt="Profile"
        src={avatarImage || undefined}
        className="min-h-[100px] min-w-[100px] border-[6px] border-white shadow-xl lg:ml-8 xl:ml-14"
      /> */}
      {isMe ? (
        <Avatar
          currentImageUrl={
            image ? URL.createObjectURL(image) : user.photo || ""
          }
          size="xLarge"
          onImageUpdate={updateImage}
          maxFileSizeMB={5}
          imageClassName="w-full h-full object-cover bg-white hover:bg-gray-50"
          containerClassName="rounded-full h-[100px] w-[100px] object-cover border-[6px] border-white shadow-xl lg:ml-8 xl:ml-14"
          acceptedFileTypes={["image/jpeg", "image/png", "image/gif"]}
        />
      ) : (
        <Image
          src={user.photo || "/images/placeholder-avatar.svg"}
          alt="avatar"
          width={100}
          height={100}
          className="min-h-[100px] min-w-[100px] border-[6px] border-white shadow-xl lg:ml-8 xl:ml-14"
        />
      )}
      <div className="flex">
        <div className="mr-5">
          <h5 className="text-xl font-bold text-main">
            {user.userName}{" "}
            <Verified color="primary" className="ml-1 h-6 w-6" />
          </h5>
          <p className="text-sm text-secondary">{user.title}</p>
          <div>
            <p className="text-sm text-secondary">
              {user.age ? `${user.age} years old` : ""}{" "}
              {user.nationality ? `- ${user.nationality}` : ""}{" "}
              {/* {user.isMarried ? `- ${user.isMarried}` : ""}{" "} */}
              {user.speciality ? `- ${user.speciality}` : ""}{" "}
              {user.careerLevel
                ? `- Ex ${user.careerLevel} years`
                : ""}{" "}
            </p>
            {/* <p className="text-sm text-secondary">
              <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16 } }} /> {user.location}
            </p> */}
            {/* <Button variant="text" className="p-1">
              <FlagIcon color="primary" sx={{ fontSize: { xs: 18, sm: 20 } }} />
              Open For Opportunities
            </Button> */}
          </div>
        </div>
        <div className="fex h-full flex-col items-center justify-center gap-1">
          {/* Edit Button */}
          {isMe && (
            <IconButton LinkComponent={Link} href="/job-seeker/setting">
              <EditIcon />
            </IconButton>
          )}
          {/* Share Button */}
          <ShareMenu link="https://medicova.com" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
