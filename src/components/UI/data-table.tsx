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
import CustomPagination from "@/components/UI/CustomPagination";

interface SortConfig<T> {
  key: keyof T;
  direction: "asc" | "desc";
}

// Column definition interface
interface ColumnConfig<T> {
  key: keyof T; // Field to display
  header: string; // Column header text
  sortable?: boolean; // Enable sorting
  render?: (item: T) => React.ReactNode; // Custom render function
  width?: string | number; // Optional column width
}

interface DataTableProps<T> {
  data: T[];
  total: number;
  columns: ColumnConfig<T>[]; // Column definitions
  isSelectable?: boolean; // Enable row selection
  onRowClick?: (item: T) => void; // Click handler for rows
  onClick?: (folder: T) => void;
  onEdit?: (folder: T) => void;
  onDelete?: (folder: T) => void;
  size?: "small" | "medium";
  fixedNumberPerPage?: number;
  searchQuery?: string;
}

const DataTable = <T extends { id: number | string }>({
  data,
  columns,
  isSelectable = false,
  onClick,
  onEdit,
  onDelete,
  size,
  fixedNumberPerPage,
  searchQuery,
  total,
}: DataTableProps<T>) => {
  const isSmall = size === "small";
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  const handleSort = (key: keyof T) => {
    setSortConfig({
      key,
      direction:
        sortConfig?.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredData = useMemo(() => {
    const searchFields = columns.map((column) => column.key);
    if (!searchQuery || !searchFields?.length) return data;
    return data.filter((item) =>
      searchFields.some((field) =>
        String(item[field] || "") // Ensure no undefined errors
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      ),
    );
  }, [data, searchQuery, columns]);

  // Sort data based on sort config
  const sortedData = useMemo(() => {
    if (!sortConfig?.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key] ?? ""; // Ensure no undefined/null issues
      const valueB = b[sortConfig.key] ?? "";
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
      <TableContainer component={Paper} className="border-0 scroll-bar-minimal">
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
                  className={`p-2 font-semibold w-full ${isSmall ? "text-xs" : ""}`}
                  style={{ width: col.width }}
                >
                  {col.sortable ? (
                    <TableSortLabel
                      active={sortConfig?.key === col.key}
                      direction={
                        sortConfig?.key === col.key
                          ? sortConfig.direction
                          : "asc"
                      }
                      onClick={() => handleSort(col.key)}
                    >
                      <span className="text-nowrap line-clamp-1">{col.header}</span>
                    </TableSortLabel>
                  ) : (
                    <span className="text-nowrap line-clamp-1">{col.header}</span>

                  )}
                </TableCell>
              ))}
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
                      {col.render ? col.render(item) : String(item[col.key])}
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {total > data.length && (
        <CustomPagination
          fixedNumberPerPage={fixedNumberPerPage}
          totalItems={total}
        />
      )}
    </div>
  );
};

export default DataTable;
