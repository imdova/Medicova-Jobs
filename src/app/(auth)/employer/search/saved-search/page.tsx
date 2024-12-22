"use client";
import { Add, Delete, Edit, MoreHoriz, MoreVert } from "@mui/icons-material";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CandidateTable from "./folders-table";
import { folders } from "@/constants";

const savedSearchPage = () => {
  return (
    <div className="p-5">
      <div className="p- mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Folders</h1>
        <IconButton className="rounded-md border border-solid border-[#D6DDEB] p-2">
          <Add />
        </IconButton>
      </div>
      <div className="p-2">
        <h2 className="mb-4 text-2xl font-semibold">Recently Used</h2>
        <div className="flex gap-2 md:gap-5">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <FolderBig key={index} />
          ))}
        </div>
      </div>
      <div className="p-2">
        <h2 className="mb-4 text-2xl font-semibold">All folders</h2>
        <CandidateTable data={folders} />
      </div>
    </div>
  );
};

export default savedSearchPage;

const FolderBig = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="relative flex h-[100px] items-center justify-center rounded-3xl bg-[#ECF0F3]">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "save-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black/50"
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="Action-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="mt-2"
        >
          <MenuItem
            onClick={handleClose}
            className="flex items-center gap-2 px-2 text-black/80 hover:bg-gray-200"
          >
            <Edit className="h-5 w-5" />
            Edit
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            className="flex items-center gap-2 px-2 text-black/80 hover:bg-gray-200"
          >
            <Delete className="h-5 w-5" />
            Delete
          </MenuItem>
        </Menu>
        <Image
          src="/images/folder.png"
          width={70}
          height={40}
          alt="folder icon"
        />
      </div>
      <h6 className="text-lg font-semibold">Cardiology Specialists</h6>
      <p className="text-sm text-black/50">2days ago</p>
    </div>
  );
};
