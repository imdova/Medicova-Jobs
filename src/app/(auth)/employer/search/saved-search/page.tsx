"use client";
import DataTable from "@/components/UI/data-table";
import FolderMainCard from "@/components/UI/folder-main-card";
import FolderModal from "@/components/UI/folder-modal";
import SearchInput from "@/components/UI/search-Input";
import { folders } from "@/constants";
import { Folder } from "@/types";
import { Add, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";

const SavedSearchPage: React.FC = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { fname, q: query } = searchParams as {
    [key: string]: string;
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="p-2 md:p-5">
      <div className="mb-4 flex items-center justify-between">
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
        <div className="grid grid-cols-2 flex-wrap gap-2 md:grid-cols-3 lg:grid-cols-5">
          {folders.slice(0, 5).map((folder, index) => (
            <FolderMainCard key={index} folder={folder} />
          ))}
        </div>
      </div>
      <div className="p-2">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">All folders</h2>
          <SearchInput
            isBounce={true}
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
        <div className="max-w-[calc(100vw-50px)] overflow-x-auto">
          <DataTable
            data={folders}
            fixedNumberPerPage={5}
            searchQuery={query}
            columns={[
              {
                key: "name",
                header: "Name",
                sortable: true,
                render: (folder) => (
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/folder.png"
                      width={20}
                      height={20}
                      alt="folder"
                    />
                    <Link
                      className="hover:underline"
                      href={`/folder/${folder.id}`}
                    >
                      {folder.name}
                    </Link>
                  </div>
                ),
              },
              { key: "candidates", header: "Candidates", sortable: true },
              {
                key: "lastModified",
                header: "Last Modified",
                sortable: true,
                render: (folder) =>
                  new Date(folder.lastModified).toLocaleDateString(),
              },
            ]}
            isSelectable
            onEdit={(folder) => console.log("Edit", folder)}
            onDelete={(folder) => console.log("Delete", folder)}
          />
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
