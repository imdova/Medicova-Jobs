"use client";

import { Suspense, useCallback, useEffect, useMemo } from "react";
import {
  Select,
  MenuItem,
  Pagination as MUIPagination,
  SelectChangeEvent,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/util";

interface PaginationProps {
  fixedNumberPerPage?: number;
  initialNumberPerPage?: number;
  totalItems: number;
  itemsPerPageOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  fixedNumberPerPage,
  initialNumberPerPage = 10,
  totalItems,
  itemsPerPageOptions = [5, 10, 20, 50],
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  // Memoized calculation of current page and items per page
  const { currentPage, itemsPerPage } = useMemo(() => {
    const page = Number(searchParams.get("page")) || 1;
    const limit = fixedNumberPerPage
      ? fixedNumberPerPage
      : Number(searchParams.get("limit")) || initialNumberPerPage;
    return {
      currentPage: Math.max(1, page), // Ensure page is at least 1
      itemsPerPage: Math.max(1, limit), // Ensure limit is at least 1
    };
  }, [searchParams, fixedNumberPerPage, initialNumberPerPage]);

  // Calculate total pages safely
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

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
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("limit", newLimit.toString());
    newParams.set("page", "1"); // Reset to first page when changing items per page
    router.push(createUrl(pathName, newParams), { scroll: false });
  };

  // Handle page change
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", value.toString());
    router.push(createUrl(pathName, newParams), { scroll: false });
  };

  // Validate current page when total items or items per page changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", totalPages.toString());
      router.push(createUrl(pathName, newParams), { scroll: false });
    }
  }, [totalItems, currentPage, totalPages, router, pathName, searchParams]);

  // Don't render if no pagination needed
  if (totalPages <= 1 && itemsPerPage === initialNumberPerPage) {
    return null;
  }

  return (
    <div
      className={`${fixedNumberPerPage ? "justify-center" : "justify-between"} mt-2 flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white p-2 shadow-soft`}
    >
      {/* Items Per Page Selector */}
      {!fixedNumberPerPage && (
        <div className="flex items-center gap-2 px-2 md:pl-12">
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            size="small"
            variant="outlined"
            sx={{
              "& .MuiSelect-select": {
                padding: "6px 32px 6px 12px",
              },
            }}
          >
            {itemsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}

      {/* Pagination Controls */}
      <MUIPagination
        count={totalPages}
        page={Math.min(currentPage, totalPages)} // Ensure page doesn't exceed total pages
        color="primary"
        onChange={handlePageChange}
        siblingCount={1}
        boundaryCount={1}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "4px",
            fontSize: "0.875rem",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          },
          "& .MuiPaginationItem-root:not(.Mui-selected)": {
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        }}
      />
    </div>
  );
};

const CustomPagination: React.FC<PaginationProps> = (props) => {
  return (
    <Suspense fallback={<div className="h-12 w-full" />}>
      <Pagination {...props} />
    </Suspense>
  );
};

export default CustomPagination;
