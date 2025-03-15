"use client";
import { useState } from "react";
import { FlagOutlined, LocationOn, Verified } from "@mui/icons-material";
import ProfileImage from "@/components/UI/ProfileImage";
import { useSession } from "next-auth/react";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_SEEKER } from "@/api/seeker";
import { TAGS } from "@/api";
import uploadImages from "@/lib/files/imageUploader";
import Avatar from "@/components/UI/Avatar";
import { calculateAge } from "@/util/general";
import EditProfile from "./editProfile";

const HeaderSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const { update: updateSession } = useSession();
  const [image, setImage] = useState<File | null>(null);

  const { update } = useUpdateApi<UserProfile>(handleSuccess);

  const handleUpdateProfile = async (body: Partial<UserProfile>) => {
    await update(API_UPDATE_SEEKER, { body }, TAGS.profile);
  };

  async function handleSuccess(newProfile: UserProfile) {
    await updateSession({
      companyPhoto: newProfile.category,
    });
  }

  const updateImage = async (file: File) => {
    const [category] = await uploadImages([file]);
    handleUpdateProfile({ category });
    setImage(file);
  };

  const age = user.birth ? calculateAge(new Date(user.birth)) : "";
  const isMarried = user?.maritalStatus === "Married";
  return (
    <div className="flex h-fit min-h-[200px] w-full flex-col items-center gap-8 overflow-hidden rounded-base rounded-t-base border border-gray-100 bg-primary-100 p-5 shadow-lg lg:flex-row">
      {isMe ? (
        <ProfileImage
          currentImageUrl={
            image ? URL.createObjectURL(image) : user.avatar || ""
          }
          alt={user.firstName + " " + user.lastName + " profile image"}
          size="xLarge"
          onImageUpdate={updateImage}
          imageClassName="border-4 border-white shadow-md"
        />
      ) : (
        <Avatar
          src={user.avatar}
          alt={user.firstName + " " + user.lastName + " profile image"}
          size={100}
          className="border-4 border-white shadow-md"
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
              {age ? `${age} years old` : ""}{" "}
              {user.nationality ? `- ${user.nationality}` : ""}{" "}
              {user.maritalStatus ? `- ${user.maritalStatus}` : ""}{" "}
              {user.speciality ? `- ${user.speciality}` : ""}{" "}
              {user.careerLevel ? `- Ex ${user.careerLevel} years` : ""}{" "}
            </p>
            {(user.country?.name || user.state?.name || user.city) && (
              <div className="mr-3 flex items-center gap-1">
                <LocationOn className="text-primary" />
                <p className="text-sm text-secondary">
                  {(user.country?.name || "") +
                    (user.state?.name ? `, ${user.state.name}` : "") +
                    (user.city ? `, ${user.city}` : "")}
                </p>
              </div>
            )}
            {user.isPublic && (
              <p className="font-medium text-primary">
                <FlagOutlined className="mr-1 font-medium text-primary" />
                Open For Opportunities
              </p>
            )}
          </div>
        </div>
        <EditProfile isMe={isMe} user={user} />
      </div>
    </div>
  );
};

export default HeaderSection;
