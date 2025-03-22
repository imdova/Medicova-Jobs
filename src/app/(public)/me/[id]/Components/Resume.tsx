"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { FileUploadModal } from "@/components/form/FileUploadModal";
import uploadFiles from "@/lib/files/imageUploader";
import { PDF_ICON } from "@/components/icons/icons";
import { Upload } from "@mui/icons-material";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_UPDATE_SEEKER } from "@/api/seeker";
import { TAGS } from "@/api";

const getFileNameFromUrl = (url?: string | null): string => {
  if (!url) return "";
  const urlSplit = url.split("/");
  return urlSplit[urlSplit.length - 1];
};
const Resume: React.FC<{
  user: UserProfile;
  isMe: boolean;
  isLocked: boolean;
}> = ({ user, isMe, isLocked }) => {
  const myCv = user.resume;
  const fileName = getFileNameFromUrl(myCv);
  const { update } = useUpdateApi<UserProfile>();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    const [resume] = await uploadFiles([file]);
    const body = { id: user.id, resume };
    await update(API_UPDATE_SEEKER, { body }, TAGS.profile);
  };

  const handleReviewCV = () => {
    myCv && window.open(myCv, "_blank"); // Open the PDF in a new tab
  };

  if (!isMe && !myCv) {
    return null;
  }
  if (!isMe && isLocked) {
    return null;
  }
  return (
    <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      {/* Title and Description */}
      <h3 className="mb-2 text-xl font-semibold text-main">Resume</h3>

      {/* Uploaded CV Display */}
      <div className="my-2 flex items-center gap-2 rounded bg-primary-100 p-2">
        <PDF_ICON
          width={32}
          height={32}
          className="min-w-[40px] text-[#EF5350]"
        />
        {fileName ? (
          <p className="break-all text-sm text-main">{fileName}</p>
        ) : (
          <p className="text-sm text-secondary">No file uploaded</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-3">
        {myCv && (
          <Button
            variant="outlined"
            disabled={!myCv}
            onClick={handleReviewCV}
            className="flex-1 text-sm"
          >
            Download
          </Button>
        )}
        {isMe ? (
          myCv ? (
            <Button
              variant="contained"
              onClick={() => setIsUploadModalOpen(true)}
              className="flex-1 text-sm"
            >
              Change
            </Button>
          ) : (
            <Button
              variant="contained"
              className="flex-1 text-sm"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload <Upload className="ml-2" />
            </Button>
          )
        ) : null}
      </div>

      <FileUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        acceptedFileTypes={["application/pdf"]}
        title={"Upload a your resume"}
        previewType="pdf"
        uploadButtonText={"Upload"}
        description="choose a pdf file as your resume. Supported formats: PDF"
      />
    </div>
  );
};

export default Resume;
