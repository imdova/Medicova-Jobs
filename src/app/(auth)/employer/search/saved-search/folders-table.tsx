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
  TablePagination,
  TextField,
  TableSortLabel,
} from "@mui/material";
import { Edit, Delete, Folder as FolderIcon } from "@mui/icons-material";
import { Folder, SortFolders } from "@/types";
import { formatDate } from "@/util";
import CustomPagination from "@/components/UI/CustomPagination";

const CandidateTable: React.FC<{ data: Folder[] }> = ({ data }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortFolders>({
    key: "lastModified",
    direction: "desc",
  });

  console.log(
    page,
    rowsPerPage,
    rowsPerPage,
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full p-2">
      <TableContainer component={Paper} className="border-0">
        <Table className="min-w-full">
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < filteredAndSortedData.length
                  }
                  checked={selected.length === filteredAndSortedData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="cursor-pointer font-semibold">
                <TableSortLabel
                  active={sortConfig.key === "candidates"}
                  direction={
                    sortConfig.key === "candidates"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSort("candidates")}
                >
                  candidates
                </TableSortLabel>
              </TableCell>
              <TableCell className="cursor-pointer font-semibold">
                <TableSortLabel
                  active={sortConfig.key === "lastModified"}
                  direction={
                    sortConfig.key === "lastModified"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSort("lastModified")}
                >
                  last Modified
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData
              .slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage,
              )
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    key={row.id}
                    hover
                    className="hover:bg-gray-50"
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleSelect(row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FolderIcon className="text-gray-500" />
                        {row.name}
                      </div>
                    </TableCell>
                    <TableCell>{row.candidates}</TableCell>
                    <TableCell>{formatDate(row.lastModified)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <IconButton size="small" className="text-blue-600">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" className="text-red-600">
                          <Delete />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        currentPage={page}
        itemsPerPage={rowsPerPage}
        setCurrentPage={setPage}
        totalItems={filteredAndSortedData.length}
        setItemsPerPage={setRowsPerPage}
      />
      {/* <TablePagination
        component="div"
        count={filteredAndSortedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
};

export default CandidateTable;
