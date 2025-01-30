"use client";

import { useCallback, useEffect } from "react";
import { Select, MenuItem, Pagination, SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

interface CustomPaginationProps {
  fixedNumberPerPage?: number;
  totalItems?: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  fixedNumberPerPage = 10,
  totalItems = 20,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current values from search params
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage =
    fixedNumberPerPage || Number(searchParams.get("limit")) || 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create URL search params utility function
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  // Handle items per page change
  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newLimit = event.target.value as number;
    router.push(
      `?${createQueryString("limit", newLimit.toString())}&${createQueryString("page", "1")}`,
    );
  };

  // Handle page change
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`?${createQueryString("page", value.toString())}`);
  };

  // Validate current page on total items change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      router.push(`?${createQueryString("page", totalPages.toString())}`);
    }
  }, [totalItems, currentPage, totalPages, router, createQueryString]);

  return (
    <div
      className={`${fixedNumberPerPage ? "justify-center" : "justify-between"} mt-2 flex items-center gap-2 rounded-[10px] border border-gray-100 bg-white p-2 shadow-lg`}
    >
      {/* Select Input for Items Per Page */}
      {fixedNumberPerPage ? null : (
        <div className="flex items-center gap-2 px-2 md:pl-12">
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
      )}

      {/* Pagination Component */}
      <Pagination
        count={totalPages}
        page={currentPage}
        color="primary"
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "4px",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default CustomPagination;
