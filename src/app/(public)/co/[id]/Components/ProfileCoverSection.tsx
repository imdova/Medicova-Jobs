"use client";
import React, { useState } from "react";
import { Company } from "@/types";
import Avatar from "@/components/UI/Avatar";
import Image from "next/image";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_COMPANY } from "@/api/employer";
import { TAGS } from "@/api";
import uploadImages from "@/lib/files/imageUploader";
import { ProfileCoverImage } from "@/components/pages/co/ProfileCoverImage";

interface EmployerHeaderSectionProps {
    isEmployee: boolean;
    company: Company;
}

const ProfileCoverSection: React.FC<EmployerHeaderSectionProps> = ({ company, isEmployee }) => {
    const [image, setImage] = useState<File | null>(null);
    const [cover, setCover] = useState<File | null>(null);

    const { update } = useUpdateApi<Company>();

    const handleUpdateCompany = async (formData: Partial<Company>) => {
        await update(API_UPDATE_COMPANY, {
            body: { id: company.id, ...formData } as Company,
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
        <div className="grid grid-cols-1 grid-rows-1">
            {/* Avatar Positioned on Background Image */}
            <div className="col-start-1 row-start-1 min-h-24 w-full">
                <ProfileCoverImage
                    currentImageUrl={cover ? URL.createObjectURL(cover) : company.cover || ""}
                    onImageUpdate={isEmployee ? updateCoverImage : undefined}
                />
            </div>
            <div className="col-start-1 row-start-1 z-[1] flex w-full items-end justify-center px-4 md:justify-start">
                {isEmployee ? (
                    <Avatar
                        currentImageUrl={
                            image ? URL.createObjectURL(image) : company.avatar || ""
                        }
                        size="xLarge"
                        onImageUpdate={updateImage}
                        maxFileSizeMB={5}
                        className="h-[100px] w-[100px] rounded-full border-4 border-white shadow-md"
                        imageClassName="w-full h-full object-cover bg-white hover:bg-gray-50"
                    />
                ) : (
                    <Image
                        src={company.avatar || "/images/placeholder-avatar.svg"}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="h-[100px] w-[100px] rounded-full border-4 border-white bg-white object-cover shadow-md"
                    />
                )}
            </div>
        </div>
    )
}

export default ProfileCoverSection