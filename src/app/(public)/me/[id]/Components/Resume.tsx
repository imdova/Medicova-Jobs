"use client";
import React, { useState, useRef } from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import pdf from "@/components/icons/pdf.png";
import Image from "next/image";
import { UserState } from "@/types";

const myCv = "sadasd";
const Resume: React.FC<{
  user: UserState;
  isMe: boolean;
  isLocked: boolean;
}> = ({ user, isMe, isLocked }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedExtensions = [
        "application/pdf",
        "application/msword",
        // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (allowedExtensions.includes(file.type)) {
        setFileName(file.name);
        setFileUrl(URL.createObjectURL(file));
        setAlertMessage(null); // Reset alert message on successful upload
      } else {
        setAlertMessage("Only Word and PDF files are allowed.");
        event.target.value = ""; // Clear the invalid file
      }
    }
  };

  const handleFileRemove = () => {
    setFileName(null);
    setFileUrl(null);
    setAlertMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  const handleReviewCV = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank"); // Open the PDF in a new tab
      setAlertMessage(null); // Reset alert message on successful review
    } else {
      setAlertMessage("No CV uploaded.");
    }
  };

  if (!isMe && !myCv) {
    return null;
  }
  if (!isMe && isLocked) {
    return null;
  }
  return (
    <div className="mb-5 rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
      {/* Title and Description */}
      <h3 className="mb-2 text-2xl font-bold text-main">Resume</h3>

      {/* Alert */}
      {alertMessage && (
        <Alert severity="error" sx={{ marginBottom: "16px" }}>
          {alertMessage}
        </Alert>
      )}

      {/* Uploaded CV Display */}
      <div className="my-2 flex items-center justify-between gap-2 rounded bg-primary-100 p-2">
        <Image
          src={pdf}
          alt="profile"
          width={40}
          height={40}
          className="rounded-xl object-cover"
        />
        <p className="flex-1 font-semibold text-main">
          {fileName || "No file uploaded"}
        </p>
        {isMe && (
          <IconButton
            color="error"
            onClick={handleFileRemove}
            disabled={!fileName}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-3">
        <Button
          variant="outlined"
          disabled={!fileName}
          onClick={handleReviewCV}
          className="flex-1"
        >
          Review CV
        </Button>
        {isMe ? (
          <Button
            variant="contained"
            className="text-nowrap flex-1"
            color="primary"
            component="label"
          >
            Upload CV
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              hidden
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
          </Button>
        ) : (
          fileUrl && (
            <Button
              href={fileUrl}
              className="flex-1 text-nowrap"
              variant="contained"
              color="primary"
              component="a"
              download
            >
              Download CV
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Resume;
