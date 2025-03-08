"use client";
import React, { useState } from "react";
import { Company } from "@/types";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_COMPANY } from "@/api/employer";
import { TAGS } from "@/api";
import uploadImages from "@/lib/files/imageUploader";
import { ProfileCoverImage } from "@/components/pages/co/ProfileCoverImage";
import { useSession } from "next-auth/react";
import Avatar from "@/components/UI/Avatar";
import ProfileImage from "@/components/UI/ProfileImage";

interface EmployerHeaderSectionProps {
  isEmployee: boolean;
  company: Company;
}

const ProfileCoverSection: React.FC<EmployerHeaderSectionProps> = ({
  company,
  isEmployee,
}) => {
  const { update: updateSession } = useSession();

  const [image, setImage] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const { update } = useUpdateApi<Company>(handleSuccess);

  const handleUpdateCompany = async (formData: Partial<Company>) => {
    await update(API_UPDATE_COMPANY, {
      body: { id: company.id, ...formData } as Company,
    }, TAGS.company);
  };

  async function handleSuccess(updatedCompany: Company) {
    await updateSession({
      companyPhoto: updatedCompany.avatar,
    });
    // window.location.reload();
  }

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
    <div className="grid grid-cols-1 grid-rows-1">
      {/* Avatar Positioned on Background Image */}
      <div className="col-start-1 row-start-1 min-h-24 w-full">
        <ProfileCoverImage
          currentImageUrl={
            cover ? URL.createObjectURL(cover) : company.cover || ""
          }
          onImageUpdate={isEmployee ? updateCoverImage : undefined}
        />
      </div>
      <div className="col-start-1 row-start-1 h-fit w-fit self-end px-4">
        {isEmployee ? (
          <ProfileImage
            currentImageUrl={
              image ? URL.createObjectURL(image) : company.avatar || ""
            }
            alt={company.name}
            size="xLarge"
            onImageUpdate={updateImage}
            imageClassName="border-4 border-white shadow-md"
          />
        ) : (
          <Avatar
            src={company.avatar}
            alt={company.name}
            size={100}
            className="border-4 border-white shadow-md"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCoverSection;
