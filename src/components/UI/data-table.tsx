"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  TableSortLabel,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CustomPagination from "@/components/UI/CustomPagination";
import CellOptions from "./CellOptions";
import Link from "next/link";
import { ColumnConfig, SortConfig } from "@/types";
import { getNestedValue } from "@/util/forms";
import { Path } from "react-hook-form";
import SortableHeader from "./SortableHeader";
import { cn } from "@/util";

interface DataTableProps<T> {
  data: T[];
  total: number;
  className?: string;
  columns: ColumnConfig<T>[]; // Column definitions
  isSelectable?: boolean; // Enable row selection
  onRowClick?: (item: T) => void; // Click handler for rows
  onClick?: (folder: T) => void;
  onEdit?: (folder: T) => void;
  onDelete?: (folder: T) => void;
  size?: "small" | "medium";
  fixedNumberPerPage?: number;
  searchQuery?: string;
  options?: ActionOption<T>[]; // Action options for each row
  noDataMessage?: NoDataMessage;
}

function DataTable<T extends { id: number | string }>({
  data,
  noDataMessage,
  columns,
  isSelectable = false,
  onClick,
  onEdit,
  onDelete,
  size,
  fixedNumberPerPage,
  searchQuery,
  total,
  options,
  className,
}: DataTableProps<T>) {
  const isSmall = size === "small";
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  const handleSort = (key: Path<T>) => {
    setSortConfig({
      key,
      direction:
        sortConfig?.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredData = useMemo(() => {
    const searchFields = columns
      .map((column) => column.key)
      .filter((x) => Boolean(x)) as Path<T>[];
    if (!searchQuery || !searchFields?.length) return data;
    return data.filter((item) =>
      searchFields.some((field) =>
        String(getNestedValue(item, field)) // Ensure no undefined errors
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      ),
    );
  }, [data, searchQuery, columns]);

  // Sort data based on sort config
  const sortedData = useMemo(() => {
    if (!sortConfig?.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valueA = getNestedValue(a, sortConfig.key) ?? ""; // Ensure no undefined/null issues
      const valueB = getNestedValue(b, sortConfig.key) ?? "";
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }
      return sortConfig.direction === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }, [filteredData, sortConfig]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(sortedData.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: number | string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number | string) => selected.indexOf(id) !== -1;

  return (
    <div className="w-full">
      <TableContainer
        className={cn(
          "scroll-bar-minimal rounded-base border border-gray-200 bg-white shadow-soft",
          className,
        )}
      >
        <Table className="min-w-full">
          <TableHead className={`bg-gray-50`}>
            <TableRow>
              {isSelectable ? (
                <TableCell className="p-1 text-xs" padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < sortedData.length
                    }
                    checked={selected.length === sortedData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              ) : null}
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  className={`font-semibold relative ${isSmall ? "p-2" : "p-5"}`}
                  style={{ width: col.width }}
                >
                  {col.sortable && col.key ? (
                    <SortableHeader
                      active={sortConfig?.key === col.key}
                      direction={
                        sortConfig?.key === col.key
                          ? sortConfig.direction
                          : "asc"
                      }
                      onClick={() => col.key && handleSort(col.key)}
                      isSmall={isSmall}
                    >
                      <span
                        className={`line-clamp-1 text-nowrap ${isSmall ? "text-xs" : ""}`}
                      >
                        {col.header}
                      </span>
                    </SortableHeader>
                  ) : (
                    <span
                      className={`line-clamp-1 text-nowrap ${isSmall ? "text-xs" : ""}`}
                    >
                      {col.header}
                    </span>
                  )}
                </TableCell>
              ))}
              {onEdit || onDelete || (options && options.length > 0) ? (
                <TableCell
                  className={`p-2 font-semibold ${isSmall ? "text-xs" : ""}`}
                >
                  Actions
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item) => {
              const id = item.id;
              const isItemSelected = isSelected(id);
              return (
                <TableRow
                  key={id}
                  hover
                  className="hover:bg-gray-50"
                  selected={isItemSelected}
                  onClick={onClick ? () => onClick(item) : undefined}
                >
                  {isSelectable && (
                    <TableCell className="p-1 text-xs" padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleSelect(id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={`${isSmall ? "p-2 text-xs" : "p-5"}`}
                    >
                      {col.render
                        ? col.render(item)
                        : col.key && getNestedValue(item, col.key)}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell className={`${isSmall ? "p-2 text-xs" : "p-5"}`}>
                      <div className="flex space-x-2">
                        {onEdit && (
                          <IconButton
                            size="small"
                            disabled={selected.length > 0}
                            className="hover:bg-green-200 hover:text-green-600"
                            onClick={() => onEdit(item)}
                          >
                            <Edit />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton
                            size="small"
                            disabled={selected.length > 0}
                            className="hover:bg-red-200 hover:text-red-600"
                            onClick={() => onDelete(item)}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {options && options.length > 0 && (
                    <TableCell className={`${isSmall ? "p-2 text-xs" : "p-5"}`}>
                      <CellOptions options={options} item={item} />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {data.length === 0 && noDataMessage && (
          <div className="flex min-h-64 w-full flex-col items-center justify-center gap-2 p-5">
            <h3 className="text-center text-xl font-semibold text-secondary">
              {noDataMessage.title}
            </h3>
            <p className="text-center text-sm text-secondary">
              {noDataMessage.description}
            </p>
            <Button
              LinkComponent={Link}
              href={noDataMessage.action.href}
              variant="contained"
            >
              {noDataMessage.action.label}
            </Button>
          </div>
        )}
      </TableContainer>
      <CustomPagination
        fixedNumberPerPage={fixedNumberPerPage}
        totalItems={total}
      />
    </div>
  );
}

export default DataTable;
