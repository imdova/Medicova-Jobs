"use client";
import Image from "next/image";
import { Folder } from "@/types";
import { getFullLastEdit } from "@/util";
import { SelectChangeEvent } from "@mui/material";

interface FolderMainCardProps {
  folder: Folder;
  onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  value?: string;
}

const FolderSmallCard: React.FC<FolderMainCardProps> = ({
  folder,
  onChange,
  value,
}) => {
  const isSelected = folder.id === value;

  const clickHandler = () => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: folder.id || "" },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent, null);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={clickHandler}
        className={`${isSelected ? "border border-green-400 bg-[#ddebf7]" : "bg-[#ECF0F3]"} group flex h-[80px] w-full items-center justify-center rounded-md bg-[#ECF0F3] duration-150 hover:bg-[#D6DDEB]`}
      >
        <Image
          src="/images/folder.svg"
          width={25}
          height={25}
          alt="folder icon"
          className="object-contain duration-300 group-hover:scale-110"
        />
      </button>
      <h6 className="mt-2 px-2 text-sm line-clamp-2">{folder.name}</h6>
      <p className="px-2 text-xs text-black/50">
        {getFullLastEdit(folder.created_at)}
      </p>
    </div>
  );
};

export default FolderSmallCard;
