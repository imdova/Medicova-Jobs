"use client";

import { Select, MenuItem, Pagination, SelectChangeEvent } from "@mui/material";

interface CustomPaginationProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalItems: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1); // Reset to the first page whenever items per page changes
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      {/* Select Input for Items Per Page */}
      <div className="flex items-center gap-2 pl-10 md:pl-12">
        <span>View:</span>
        <Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          size="small"
          variant="outlined"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </div>

      {/* Pagination Component */}
      <Pagination
        count={totalPages} // Dynamically set total pages
        page={currentPage}
        showFirstButton
        showLastButton
        color="primary"
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "4px",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "white", // Text color for selected page
          },
        }}
      />
    </div>
  );
};

export default CustomPagination;
