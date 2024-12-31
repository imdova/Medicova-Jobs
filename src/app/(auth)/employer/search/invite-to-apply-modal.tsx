import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { jobs } from "@/constants";
import { formatDate } from "@/util";

interface NewUserModalProps {
  open: boolean;
  onClose: () => void;
}

const InviteModal: React.FC<NewUserModalProps> = ({ open, onClose }) => {
  const [selected, setSelected] = useState("");

  const handleClose = () => {
    console.log("🚀 ~ selected:", selected);
    setSelected("");
    onClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "700px",
          width: "90%",
          maxHeight: "90dvh",
          overflowY: "auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 24,
          py: 2,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Modal Header */}
        <div className="mb-2 flex items-center justify-between">
          <h6 className="text-2xl font-bold text-main">
            Select Job to Invite User
          </h6>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-main">All Jobs</h2>
          <TextField
            variant="outlined"
            placeholder="Search folders"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              classes: {
                input: "p-2", // Add padding to the input element
              },
            }}
          />
        </div>
        <div className="scroll-bar-minimal grid max-h-[200px] grid-flow-row gap-1 overflow-y-auto overflow-x-hidden p-2">
          {jobs.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelected(job.id)}
              className={`${selected === job.id ? "scale-[1.01] border-primary shadow-lg" : "border-gray-200"} rounded-md border bg-white p-2 text-left duration-150 hover:scale-[1.01] hover:border-primary hover:shadow-lg`}
            >
              <h6 className="font-semibold text-main">
                {job.title}{" "}
                <span className="text-xs text-secondary">
                  {" | "}
                  {job.location} | {formatDate(job.timeStamps)}
                </span>
              </h6>
              {/* <p className="text-sm text-secondary">
                {job.location} | {job.education} | {job.specialty}
              </p> */}
            </button>
          ))}
        </div>
        {/* Modal Content */}
        <div className="mt-6 flex justify-start gap-2">
          {/* Add Button */}
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            disabled={selected === "" ? true : false}
            onClick={handleClose}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default InviteModal;
