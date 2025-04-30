"use client";
import React, { useState, useMemo } from "react";
import { Checkbox, IconButton, Button } from "@mui/material"; // replace with your custom components
import { Pencil, Trash2 } from "lucide-react";
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
  total?: number;
  className?: string;
  cellClassName?: string;
  headerClassName?: string;
  columns: ColumnConfig<T>[]; // Column definitions
  selected?: (number | string)[];
  setSelected?: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  onRowClick?: (item: T) => void; // Click handler for rows
  onClick?: (folder: T) => void;
  onEdit?: (folder: T) => void;
  onDelete?: (folder: T) => void;
  fixedNumberPerPage?: number;
  searchQuery?: string;
  options?: ActionOption<T>[]; // Action options for each row
  noDataMessage?: NoDataMessage;
  hideTableHeader?: boolean;
}

function DataTable<T extends { id: number | string }>({
  data,
  noDataMessage,
  columns,
  selected = [],
  setSelected,
  onClick,
  onEdit,
  onDelete,
  cellClassName = "p-3 text-sm",
  headerClassName = "text-sm",
  fixedNumberPerPage,
  searchQuery,
  total,
  options,
  className,
  hideTableHeader,
}: DataTableProps<T>) {
  const isSelectable = Boolean(selected.length > 0);
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
    if (!setSelected) return;
    if (event.target.checked) {
      setSelected(sortedData.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: number | string) => {
    if (!setSelected) return;

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
    <div className="w-full text-[10px]">
      <div
        className={cn(
          "scroll-bar-minimal overflow-x-auto rounded-base border border-gray-200 bg-white shadow-soft",
          className,
        )}
      >
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
          {hideTableHeader ? null : (
            <thead className={`bg-gray-50`}>
              <tr>
                {isSelectable ? (
                  <th className="p-1 text-[0.75em]">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < sortedData.length
                      }
                      checked={selected.length === sortedData.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                ) : null}
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={cn("relative font-semibold", cellClassName)}
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
                        className={headerClassName}
                      >
                        <span
                          className={`line-clamp-1 text-nowrap ${cellClassName}`}
                        >
                          {col.header}
                        </span>
                      </SortableHeader>
                    ) : (
                      <span
                        className={`line-clamp-1 text-nowrap ${cellClassName}`}
                      >
                        {col.header}
                      </span>
                    )}
                  </th>
                ))}
                {onEdit || onDelete || (options && options.length > 0) ? (
                  <th className={`p-2 font-semibold ${cellClassName}`}>
                    Actions
                  </th>
                ) : null}
              </tr>
            </thead>
          )}
          <tbody>
            {sortedData.map((item, index) => {
              const id = item.id;
              const isItemSelected = isSelected(id);
              return (
                <tr
                  key={id}
                  aria-selected={isItemSelected}
                  className="border-b border-gray-200 hover:bg-gray-50 aria-selected:bg-gray-100"
                  onClick={onClick ? () => onClick(item) : undefined}
                >
                  {isSelectable && (
                    <td className="p-1 text-[0.75em]">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleSelect(id)}
                      />
                    </td>
                  )}
                  {columns.map((col, index) => (
                    <td key={index} className={cellClassName}>
                      {col.render
                        ? col.render(item)
                        : col.key && getNestedValue(item, col.key)}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className={cellClassName}>
                      <div className="flex space-x-2">
                        {onEdit && (
                          <IconButton
                            size="small"
                            disabled={selected.length > 0}
                            className="hover:bg-green-200 hover:text-green-600"
                            onClick={() => onEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton
                            size="small"
                            disabled={selected.length > 0}
                            className="hover:bg-red-200 hover:text-red-600"
                            onClick={() => onDelete(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </IconButton>
                        )}
                      </div>
                    </td>
                  )}
                  {options && options.length > 0 && (
                    <th className={cellClassName}>
                      <CellOptions options={options} item={item} />
                    </th>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
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
      </div>
      {total ? (
        <CustomPagination
          fixedNumberPerPage={fixedNumberPerPage}
          totalItems={total}
        />
      ) : null}
    </div>
  );
}

export default DataTable;
