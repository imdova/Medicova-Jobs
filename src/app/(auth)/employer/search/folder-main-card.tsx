"use client";
import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "./search-page";
import { Folder } from "@/types";
import { getLastEdit } from "@/util";

interface FolderMainCardProps {
  folder: Folder;
}

const FolderMainCard: React.FC<FolderMainCardProps> = ({ folder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function edit() {
    handleClose();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("fname", "Cardiology Specialists");
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  }

  return (
    <div className="relative">
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
          onClick={edit}
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
      <Link
        href={`/employer/search/saved-search/${folder.id}`}
        className="group flex h-[100px] items-center justify-center rounded-md bg-[#ECF0F3] duration-150 hover:bg-[#D6DDEB] md:min-w-40"
      >
        <Image
          src="/images/folder.png"
          width={40}
          height={40}
          alt="folder icon"
          className="object-contain duration-300 group-hover:scale-110"
        />
      </Link>
      <h6 className="mt-2 px-2 text-base font-semibold md:text-lg">
        {folder.name}
      </h6>
      <p className="mb-2 px-2 text-xs text-black/50 md:text-sm">
        {getLastEdit(folder.lastModified)}
      </p>
    </div>
  );
};

export default FolderMainCard;
