"use client";
import { useEffect, useState } from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import { Verified } from "@mui/icons-material";
import ShareMenu from "@/components/UI/ShareMenu";
import { UserState } from "@/types";

interface HeaderData {
  name: string | null;
  isVerified: boolean;
  title: string | null;
  location: string | null;
  age: number | null;
  nationality: string | null;
  maritalStatus: string | null;
  field: string | null;
  yearsOfExperience: number | null;
  isAvailable: boolean ;
}


const HeaderSection: React.FC<{
  user: UserState;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const handleEditProfileClick = () => {
    router.push("/job-seeker/setting");
  };

  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  // Handle deleting the avatar image
  const handleDeleteImage = () => {
    setAvatarImage(undefined);
  };

  // Handle selecting a new image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
    }
  };

  return (
    <div className="flex h-fit min-h-[200px] gap-8 w-full flex-col items-center overflow-hidden rounded-base rounded-t-base border border-gray-100 bg-primary-100 p-5 shadow-lg lg:flex-row">
      <Avatar
        alt="Profile"
        src={avatarImage || undefined}
        className="lg:ml-8 xl:ml-14  min-h-[100px] min-w-[100px] border-[6px] border-white shadow-xl"
      />
      <div className="flex">
        <div className="mr-5">
          <h5 className="text-xl font-bold text-main">
            Jake Gyll <Verified color="primary" className="ml-1 h-6 w-6" />
          </h5>
          <p className="text-sm text-secondary">
            Cardiology Consultant at{" "}
            <span className="font-bold text-main">Saudi German Hospital</span>
          </p>
          <div>
            <p className="text-sm text-secondary">
              35 years old - Egyptian - Married - Cardiology - 10 years
              Experience
            </p>
            <p className="text-sm text-secondary">
              <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16 } }} /> Cairo,
              Egypt
            </p>
            <Button variant="text" className="p-1">
              <FlagIcon color="primary" sx={{ fontSize: { xs: 18, sm: 20 } }} />
              Open For Opportunities
            </Button>
          </div>
        </div>
        <div className="fex h-full flex-col items-center justify-center gap-1">
          {/* Edit Button */}
          {isMe && (
            <IconButton onClick={handleEditProfileClick}>
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
