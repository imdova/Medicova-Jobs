"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const skillsData: string[] = [];

const SkillsSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const [keywords, setKeywords] = useState(skillsData);
  const [newKeyword, setNewKeyword] = useState("");

  const handleAddKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newKeyword.trim() && keywords.length < 12) {
      setKeywords((prevKeywords) => [...prevKeywords, newKeyword]);
      setNewKeyword(""); // Reset the input field after adding
    }
  };

  const handleDeleteKeyword = (index: number) => {
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  if (!isMe && skillsData.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h3 className="text-xl font-semibold text-main">Skills</h3>

        {/* TextField and Add Skill Button in the same row */}
        {isMe && (
          <form onSubmit={handleAddKeyword}>
            <TextField
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="m-0 rounded-base"
              variant="outlined"
              placeholder={
                keywords.length >= 12
                  ? "Maximum Entry 12 skills"
                  : "Enter Skills"
              }
              disabled={keywords.length >= 12} // Disable if 12 keywords are reached
              sx={{
                width: "250px",
                height: "40px",
                border: "none",
                backgroundColor: "#F8F8FD",
                "& .MuiOutlinedInput-root": {
                  p: 0,
                  "& fieldset": {
                    border: "none",
                  },
                  "& input": {
                    padding: "10px 10px", // Vertically center the text inside
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" disabled={keywords.length >= 12}>
                    <AddIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
        )}
      </div>

      {/* Display Keywords */}
      <div className="mt-2 flex flex-wrap">
        {keywords.map((skill, index) => (
          <div
            key={index}
            className="mb-2 mr-2 rounded-md bg-primary-100 px-2 py-1 text-main"
          >
            <span>{skill}</span>
            {isMe && (
              <IconButton
                onClick={() => handleDeleteKeyword(index)}
                color="error"
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
