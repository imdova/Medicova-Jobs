import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Folder, SortFolders } from "@/types";
import { getLastEdit } from "@/util";
import CustomPagination from "@/components/UI/CustomPagination";
import Image from "next/image";
import Link from "next/link";

interface FolderTableProps {
  data: Folder[];
  select?: boolean;
  onClick?: (folder: Folder) => void;
  onEdit?: (folder: Folder) => void;
  onDelete?: (folder: Folder) => void;
  size?: "small" | "medium";
  fixedNumberPerPage?: number;
  selectedItem?: number | string;
}

const CandidateTable: React.FC<FolderTableProps> = ({
  data,
  select,
  onClick,
  onEdit,
  onDelete,
  size,
  fixedNumberPerPage,
  selectedItem,
}) => {
  const isSmall = size === "small";
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortFolders>({
    key: "lastModified",
    direction: "desc",
  });

  const handleSort = (key: keyof Folder) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return filtered.sort((a, b) => {
      if (
        sortConfig.key === "lastModified" ||
        sortConfig.key === "candidates"
      ) {
        return sortConfig.direction === "asc"
          ? Number(a[sortConfig.key]) - Number(b[sortConfig.key])
          : Number(b[sortConfig.key]) - Number(a[sortConfig.key]);
      }
      return 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchQuery, sortConfig]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(filteredAndSortedData.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <div className="w-full">
      <TableContainer component={Paper} className="border-0">
        <Table className="min-w-full">
          <TableHead className={`bg-gray-50`}>
            <TableRow>
              {select ? (
                <TableCell
                  className={`${isSmall ? "p-2 text-xs" : "p-5"}`}
                  padding="checkbox"
                >
                  <Checkbox
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < filteredAndSortedData.length
                    }
                    checked={selected.length === filteredAndSortedData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              ) : null}
              <TableCell
                className={`p-2 font-semibold ${isSmall ? "text-xs" : ""}`}
              >
                Name
              </TableCell>
              <TableCell className={`cursor-pointer p-2 font-semibold`}>
                <TableSortLabel
                  active={sortConfig.key === "candidates"}
                  direction={
                    sortConfig.key === "candidates"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSort("candidates")}
                  className={`${isSmall ? "text-xs" : ""}`}
                >
                  candidates
                </TableSortLabel>
              </TableCell>
              <TableCell className={`cursor-pointer p-2 font-semibold`}>
                <TableSortLabel
                  active={sortConfig.key === "lastModified"}
                  direction={
                    sortConfig.key === "lastModified"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSort("lastModified")}
                  className={`${isSmall ? "text-xs" : ""}`}
                >
                  last Modified
                </TableSortLabel>
              </TableCell>
              {onEdit || onDelete ? (
                <TableCell
                  className={`p-2 font-semibold ${isSmall ? "text-xs" : ""}`}
                >
                  Actions
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData
              .slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage,
              )
              .map((row) => {
                const isItemSelected =
                  isSelected(row.id) || row.id === selectedItem;
                return (
                  <TableRow
                    key={row.id}
                    hover
                    className="hover:bg-gray-50"
                    selected={isItemSelected}
                  >
                    {select ? (
                      <TableCell
                        className={`${isSmall ? "p-2 text-xs" : "p-5"}`}
                        padding="checkbox"
                      >
                        <Checkbox
                          checked={isItemSelected}
                          onChange={() => handleSelect(row.id)}
                        />
                      </TableCell>
                    ) : null}
                    <TableCell className={`${isSmall ? "p-2 text-xs" : "p-5"}`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/images/folder.png"
                          width={isSmall ? 16 : 20}
                          height={isSmall ? 16 : 20}
                          alt="folder icon"
                          className="object-contain duration-300 group-hover:scale-110"
                        />
                        {onClick ? (
                          <button
                            onClick={() => onClick(row)}
                            className={`hover:underline ${isSmall ? "text-xs" : ""}`}
                          >
                            {row.name}
                          </button>
                        ) : (
                          <Link
                            className={`hover:underline ${isSmall ? "text-xs" : ""}`}
                            href={`/employer/search/saved-search/${row.id}`}
                          >
                            {row.name}
                          </Link>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className={`${isSmall ? "p-2 text-xs" : "p-5"}`}>
                      {row.candidates}
                    </TableCell>
                    <TableCell className={`${isSmall ? "p-2 text-xs" : "p-5"}`}>
                      {getLastEdit(row.lastModified)}
                    </TableCell>
                    {onEdit || onDelete ? (
                      <TableCell
                        className={`${isSmall ? "p-2 text-xs" : "p-5"}`}
                      >
                        <div className="flex space-x-2">
                          {onEdit ? (
                            <IconButton size="small" className="text-blue-600">
                              <Edit />
                            </IconButton>
                          ) : null}
                          {onDelete ? (
                            <IconButton size="small" className="text-red-600">
                              <Delete />
                            </IconButton>
                          ) : null}
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        fixedNumberPerPage={fixedNumberPerPage}
        currentPage={page}
        itemsPerPage={rowsPerPage}
        setCurrentPage={setPage}
        totalItems={filteredAndSortedData.length}
        setItemsPerPage={setRowsPerPage}
      />
    </div>
  );
};

export default CandidateTable;
