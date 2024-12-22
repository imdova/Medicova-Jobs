"use client";
import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "./search-page";

interface FolderBigProps {
  isSmall?: boolean;
}

const FolderBig: React.FC<FolderBigProps> = ({ isSmall }) => {
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
        href={`/employer/search/saved-search/Cardiology`}
        className={`${isSmall ? "h-[80px] md:min-w-20" : "h-[100px] md:min-w-40"} group flex items-center justify-center rounded-md bg-[#ECF0F3] duration-150 hover:bg-[#D6DDEB]`}
      >
        <Image
          src="/images/folder.png"
          width={isSmall ? 30 : 40}
          height={isSmall ? 30 : 40}
          alt="folder icon"
          className="object-contain duration-300 group-hover:scale-110"
        />
      </Link>
      <h6
        className={`${isSmall ? "text-sm md:text-base" : "text-base font-semibold md:text-lg"} mt-2 px-2`}
      >
        Cardiology Specialists
      </h6>
      <p
        className={`${isSmall ? "text-xs" : "text-xs md:text-sm"} mb-2 px-2 text-black/50`}
      >
        2days ago
      </p>
    </div>
  );
};

export default FolderBig;
