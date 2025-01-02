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

const Resume: React.FC = () => {
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

  return (
    <div className="mt-5 rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
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
        <Typography
          sx={{
            fontWeight: "400",
            color: "#555",
            fontSize: "14px",
          }}
        >
          {fileName || "No file uploaded"}
        </Typography>
        <IconButton
          color="error"
          onClick={handleFileRemove}
          disabled={!fileName}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: "500",
            borderColor: "#03353C",
            flex: 1,
          }}
          disabled={!fileName}
          onClick={handleReviewCV}
        >
          Review CV
        </Button>
        <Button
          variant="contained"
          color="primary"
          component="label"
          sx={{
            textTransform: "none",
            fontWeight: "500",
            flex: 1,
          }}
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
      </Box>
    </div>
  );
};

export default Resume;
