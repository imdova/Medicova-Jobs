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

const SkillsSection: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Leadership",
  ]);
  const [newKeyword, setNewKeyword] = useState<string>("");

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

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          padding: "16px",
          textAlign: "start",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Title and Description */}
        <Box>
          <h3 className="mb-2 text-2xl font-bold text-main">Skills</h3>

          {/* TextField and Add Skill Button in the same row */}
          <form onSubmit={handleAddKeyword}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              {/* TextField for adding new keyword */}
              <TextField
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
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
                    "& fieldset": {
                      border: "none",
                    },
                    "& input": {
                      padding: "10px 10px", // Vertically center the text inside
                    },
                  },
                }}
              />
              {/* Add IconButton */}
              <IconButton
                sx={{
                  border: "1px solid #D6DDEB",
                  borderRadius: "4px",
                  padding: "6px",
                }}
                type="submit"
                disabled={keywords.length >= 12} // Disable if 12 keywords are reached
              >
                <AddIcon />
              </IconButton>
            </Box>
          </form>

          {/* Display Keywords */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {keywords.map((keyword, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#F8F8FD",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    color: "#185D43",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {keyword}
                  <IconButton
                    onClick={() => handleDeleteKeyword(index)}
                    sx={{
                      color: "#D32F2F",
                      padding: "2px",
                      fontSize: "14px",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default SkillsSection;
