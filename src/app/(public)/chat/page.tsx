"use client";
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PushPinIcon from "@mui/icons-material/PushPin";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import AttachmentIcon from "@mui/icons-material/Attachment";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const ChatPage: React.FC = () => {
  const [isStarred, setIsStarred] = useState(false);

  const handleStarClick = () => {
    setIsStarred((prev) => !prev); // Toggle state
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          borderRight: { md: "1px solid #ddd" },
          overflowY: "auto",
        }}
      >
        {/* Search Field */}
        <TextField
          variant="outlined"
          placeholder="Search messages"
          fullWidth
          sx={{ mb: 2, p: 1 }}
        />

        {/* List with Dividers */}
        <List>
          {Array.from({ length: 10 }).map((_, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                  alignItems: "flex-start",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`User ${index}`}
                    src={`https://via.placeholder.com/40`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      Jan Mayer
                    </Typography>
                  }
                  secondary="Hey, thanks for your interview..."
                />
                <Typography variant="body2" sx={{ color: "#888", ml: 2 }}>
                  12 mins ago
                </Typography>
              </ListItem>
              {/* Add Divider except after the last item */}
              {index < 9 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Main Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* User Info */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{ width: 60, height: 60 }}
              alt="Jan Mayer"
              src="https://via.placeholder.com/50"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                Jan Mayer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recruiter at Nomad
              </Typography>
            </Box>
          </Box>

          {/* Action Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton>
              <PushPinIcon />
            </IconButton>
            <IconButton onClick={handleStarClick}>
              {isStarred ? (
                <StarIcon sx={{ color: "#50BF73" }} />
              ) : (
                <StarBorderIcon />
              )}
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Chat Messages */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{ display: "block", textAlign: "center", mb: 1 }}
            >
              Today
            </Typography>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Avatar alt="Jan Mayer" src="https://via.placeholder.com/40" />
              <Box sx={{ ml: 2, maxWidth: "75%" }}>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    p: 1,
                  }}
                >
                  Hey Jake, I wanted to reach out because we saw your work
                  contributions and were impressed by your work. We want to
                  invite you for a quick interview.
                </Typography>
                <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                  12 mins ago
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "start",
                gap: 2, // Adds a gap between the avatar and the message box
              }}
            >
              <Box sx={{ ml: 2, maxWidth: "75%" }}>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    p: 1,
                  }}
                >
                  Hi Jan, sure I would love to. Thanks for taking the time to
                  see my work!
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 1, textAlign: "right" }}
                >
                  12 mins ago
                </Typography>
              </Box>
              <Avatar alt="You" src="https://via.placeholder.com/40" />
            </Box>
          </Box>
        </Box>

        {/* Chat Input */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    component="label"
                    color="primary"
                    sx={{ color: "#25324B" }}
                  >
                    <AttachmentIcon />
                    <input type="file" hidden />
                  </IconButton>
                </Box>
              ),
              endAdornment: (
                <Box sx={{ display: "flex", alignItems: "center", mr: 1, gap: 1 }}>
                  <IconButton
                    color="primary"
                    sx={{ color: "#25324B" }}
                  >
                    <EmojiEmotionsIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: "#2BA149",
                      color: "#fff",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#24913E",
                      },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              ),
            }}
            sx={{
              ".MuiOutlinedInput-root": {
                pr: 0, // Remove extra padding to fit the icon better
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
