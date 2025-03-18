import React, { useState, useRef, useEffect } from "react";
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
  value,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    props.onOpen?.({} as React.SyntheticEvent);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
    props.onClose?.({} as React.SyntheticEvent);
  };

  return (
    <Select
      {...props}
      value={searchTerm ? "" : value}
      open={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
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
          inputRef={searchInputRef}
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
            autoComplete: "off", // Disable browser's autocomplete
          }}
          // Disable all auto-suggestions and autocomplete features
          autoComplete="off"
          inputProps={{
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: "false",
            "data-lpignore": "true", // Prevents LastPass from adding autofill
            form: "off", // Additional security against form autofill
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
