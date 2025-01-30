import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { Search } from "@mui/icons-material";

type Option = {
  value: string;
  label: string;
};

// Create a more specific type for the select props
interface SearchableSelectProps
  extends Omit<MuiSelectProps<string>, "children"> {
  options: Option[];
}

const filterItems = (items: Option[], searchTerm: string) => {
  return items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Select
      {...props}
      MenuProps={{
        disableAutoFocusItem: true,
        disableScrollLock: true,
        PaperProps: {
          sx: { height: 300, width: 300, borderRadius: "20px" },
        },
        ...props.MenuProps,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sticky top-0 z-10 bg-white p-3"
      >
        <TextField
          placeholder="Search..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        />
      </div>
      {filterItems(options, searchTerm).map((item, i) => (
        <MenuItem key={item.value + i} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SearchableSelect;
