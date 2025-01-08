"use client";
import Image from "next/image";
import { Folder } from "@/types";
import { getLastEdit } from "@/util";

interface FolderMainCardProps {
  folder: Folder;
  onClick: (id: string | number) => void;
  selected: string | number;
}

const FolderSmallCard: React.FC<FolderMainCardProps> = ({
  folder,
  onClick,
  selected,
}) => {
  const isSelected = folder.id === selected;
  return (
    <div className="relative">
      <button
        onClick={() => onClick(folder.id)}
        className={`${isSelected ? "border border-green-400 bg-[#ddebf7]" : "bg-[#ECF0F3]"} group flex h-[80px] w-full items-center justify-center rounded-md bg-[#ECF0F3] duration-150 hover:bg-[#D6DDEB]`}
      >
        <Image
          src="/images/folder.png"
          width={25}
          height={25}
          alt="folder icon"
          className="object-contain duration-300 group-hover:scale-110"
        />
      </button>
      <h6 className="mt-2 px-2 text-sm">{folder.name}</h6>
      <p className="mb-2 px-2 text-xs text-black/50">
        {getLastEdit(folder.lastModified)}
      </p>
    </div>
  );
};

export default FolderSmallCard;
