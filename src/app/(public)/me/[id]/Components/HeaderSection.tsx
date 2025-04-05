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
import { calculateAge } from "@/util/general";
import EditProfile from "./editProfile";
import { formatName } from "@/util";

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
    console.log("🚀 ~ handleUpdateProfile ~ newProfile:", newProfile);
    await updateSession({
      photo: newProfile.avatar,
    });
  };

  const updateImage = async (file: File) => {
    const [avatar] = await uploadFiles([file]);
    // TODO: update profile
    console.log("🚀 ~ updateImage ~ avatar:", avatar);
    handleUpdateProfile({ avatar });
    setImage(file);
  };

  const age = user.birth ? calculateAge(new Date(user.birth)) : "";
  return (
    <div className="flex h-fit min-h-[200px] w-full flex-col items-center gap-8 overflow-hidden rounded-base rounded-t-base border border-gray-200 bg-primary-100 p-5 shadow-soft lg:flex-row">
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
          size={100}
          className="border-4 border-white shadow-md"
        />
      )}
      <div className="flex w-full">
        <div className="mr-5 flex-1">
          <h5 className="text-xl font-bold text-main">
            {formatName(user, true)}{" "}
            {user.isVerified && (
              <Verified color="primary" className="ml-1 h-6 w-6" />
            )}
          </h5>
          <p className="text-sm text-secondary">{user.title}</p>
          <div>
            <p className="text-sm text-secondary">
              {age ? `${age} years old` : ""}{" "}
              {user.nationality ? `- ${user.nationality}` : ""}{" "}
              {user.maritalStatus ? `- ${user.maritalStatus}` : ""}{" "}
              {user.speciality ? `- ${user.speciality}` : ""}{" "}
              {/* {user.careerLevel ? `- Ex ${user.careerLevel} years` : ""}{" "} */}
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
