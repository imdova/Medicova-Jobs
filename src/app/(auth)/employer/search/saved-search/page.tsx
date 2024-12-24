"use client";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Suspense, useState } from "react";
import CandidateTable from "./folders-table";
import { folders } from "@/constants";
import FolderBig from "../folder-main-card";
import FolderModal from "./folder-modal";

const SavedSearchPage: React.FC = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { fname } = searchParams as {
    [key: string]: string;
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="p-5">
      <div className="p- mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Folders</h1>
        <IconButton
          onClick={handleOpenModal}
          className="rounded-md border border-solid border-[#D6DDEB] p-2"
        >
          <Add />
        </IconButton>
      </div>
      <div className="p-2">
        <h2 className="mb-4 text-2xl font-semibold">Recently Used</h2>
        <div className="grid grid-cols-2 flex-wrap gap-2 md:flex md:gap-5">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <FolderBig key={index} />
          ))}
        </div>
      </div>
      <div className="p-2">
        <h2 className="mb-4 text-2xl font-semibold">All folders</h2>
        <div className="max-w-[calc(100vw-50px)] overflow-x-auto">
          <CandidateTable data={folders} />
        </div>
      </div>
      <Suspense>
        <FolderModal
          open={openModal || !!fname}
          type={fname ? "edit" : "create"}
          folderName={fname}
          onClose={handleCloseModal}
        />
      </Suspense>
    </div>
  );
};

export default SavedSearchPage;
