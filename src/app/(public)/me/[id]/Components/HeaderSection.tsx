"use client";
import { useState } from "react";
import { FlagOutlined, LocationOn, Verified } from "@mui/icons-material";
import ProfileImage from "@/components/UI/ProfileImage";
import { useSession } from "next-auth/react";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_SEEKER } from "@/api/seeker";
import { TAGS } from "@/api";
import uploadFiles from "@/lib/files/imageUploader";
import Avatar from "@/components/UI/Avatar";
import {
  calculateAge,
  getExperienceDetail,
  getOptionLabel,
} from "@/util/general";
import EditProfile from "./editProfile";
import { formatName } from "@/util";
import { nationalitiesOptions } from "@/constants";

const HeaderSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const { update: updateSession } = useSession();
  const [image, setImage] = useState<File | null>(null);

  const { update } = useUpdateApi<UserProfile>();

  const handleUpdateProfile = async (formData: Partial<UserProfile>) => {
    const newProfile = await update(
      API_UPDATE_SEEKER,
      { body: { id: user.id, ...formData } },
      TAGS.profile,
    );
    await updateSession({
      photo: newProfile.avatar,
    });
  };

  const updateImage = async (file: File) => {
    const [avatar] = await uploadFiles([file]);
    handleUpdateProfile({ avatar });
    setImage(file);
  };

  const age = user.birthDate ? calculateAge(new Date(user.birthDate)) : "";
  const nationality = getOptionLabel(nationalitiesOptions, user.nationality);
  const title = getExperienceDetail(user.title || "");
  return (
    <div className="mb-12 rounded-lg bg-[url('/images/search-background.jpg')] bg-cover bg-center">
      <div className="relative flex h-fit min-h-[230px] w-full flex-col items-end gap-8 rounded-lg bg-gradient-to-b from-light-primary-transparent to-primary-transparent p-5 pb-8 shadow-soft lg:flex-row">
        <div className="min-w-[100px]">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 lg:left-3 lg:-translate-x-0">
            {isMe ? (
              <ProfileImage
                currentImageUrl={
                  image ? URL.createObjectURL(image) : user.avatar || ""
                }
                alt={user.firstName + " " + user.lastName + " user image"}
                size="xLarge"
                onImageUpdate={updateImage}
                imageClassName="border-4 border-white shadow-md"
              />
            ) : (
              <Avatar
                src={user.avatar}
                alt={user.firstName + " " + user.lastName + " user image"}
                size={230}
                className="border-4 border-white shadow-md"
              />
            )}
          </div>
        </div>
        <div className="flex w-full">
          <div className="mr-5 flex-1">
            <h5 className="text-xl font-bold text-white">
              {formatName(user, true)}
              {/* TODO: add it  */}
              {/* {user.isVerified && (
              <Verified color="primary" className="ml-1 h-6 w-6" />
              )} */}
            </h5>
            <p className="text-sm text-white">{title}</p>
            <div>
              <p className="text-sm text-gray-100">
                {age ? `${age} years old` : ""}{" "}
                {nationality ? `- ${nationality}` : ""}{" "}
                {user.maritalStatus ? `- ${user.maritalStatus}` : ""}{" "}
                {user.speciality ? `- ${user.speciality}` : ""}{" "}
                {/* {user.careerLevel ? `- Ex ${user.careerLevel} years` : ""}{" "} */}
              </p>
              {(user.country?.name || user.state?.name || user.city) && (
                <div className="mr-3 flex items-center gap-1">
                  <LocationOn className="text-gray-100" />
                  <p className="text-sm text-gray-100">
                    {(user.country?.name || "") +
                      (user.state?.name ? `, ${user.state.name}` : "") +
                      (user.city ? `, ${user.city}` : "")}
                  </p>
                </div>
              )}
              {user.isPublic && (
                <p className="mt-3 text-xs font-medium text-white">
                  <FlagOutlined className="mr-1 h-4 w-4 font-medium text-white" />
                  Open For Opportunities
                </p>
              )}
            </div>
          </div>
          <EditProfile isMe={isMe} user={user} />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
