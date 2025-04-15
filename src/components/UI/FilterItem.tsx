import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  TextField,
  InputAdornment,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";

interface FilterItemProps extends FilterType {
  value: string[];
  index?: number;
  handleCheckChange: (params: FilterParam[]) => void; 
}

function getTotalCount(items: FilterItem[]) {
  return items.reduce((sum, item) => sum + (item.count || 0), 0);
}

const filterOptions = (options: FilterItem[], query?: string) => {
  if (!query) return options;
  return options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase()),
  );
};

function mergeCheckedWithAll<T>(checkedList: T[], allList: T[]): T[] {
  const allSet = new Set(allList); // for quick lookup
  const missingFromAll = checkedList.filter((item) => !allSet.has(item));
  return [...missingFromAll, ...allList];
}

const FilterItem: React.FC<FilterItemProps> = ({
  value,
  handleCheckChange,
  index,
  items,
  sectionKey,
  name,
  resetSections,
  multiple,
  maxItems = 15,
  searchable,
}) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(
    index ? index === 0 || index === 1 : true,
  );
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredOptions = filterOptions(items, query);
  const checkList = items.filter((item) => value.includes(item.value));
  const allOptions = mergeCheckedWithAll(
    checkList,
    filteredOptions.slice(0, maxItems),
  );

  const isAllSelected = value.length === items.length;

  const handleAllChange = () => {
    const newValue = isAllSelected
      ? [] // Deselect all if "All" is checked
      : items.map((option) => option.value);
    const params = [];
    params.push({ sectionKey, value: newValue });
    if (resetSections && resetSections?.length > 0) {
      const resetParams: FilterParam[] = resetSections.map((key) => ({
        sectionKey: key,
        value: [],
      }));
      params.push(...resetParams);
    }
    handleCheckChange(params);
  };

  const handleCheckboxChange = (optionValue: string) => {
    let newValue: string[];

    if (multiple) {
      newValue = value.includes(optionValue)
        ? value.filter((val) => val !== optionValue)
        : [...value, optionValue];
    } else {
      newValue = [optionValue]; // Only one can be selected
    }
    const params = [];
    params.push({ sectionKey, value: newValue });
    if (resetSections && resetSections?.length > 0 && value.includes(optionValue)) {
      const resetParams: FilterParam[] = resetSections.map((key) => ({
        sectionKey: key,
        value: [],
      }));
      params.push(...resetParams);
    }
    handleCheckChange(params);
  };

  return (
    <div className="border-b pb-4 last:border-b-0">
      <div
        className="mb-3 flex cursor-pointer items-center justify-between"
        onClick={toggleExpand}
      >
        <h6 className="font-bold text-[#25324B]">{name}</h6>
        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>

      <Collapse className="px-1" in={isExpanded}>
        {searchable && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={query || ""}
            onChange={searchHandler}
            sx={{
              "& .MuiInputBase-input": {
                padding: "8px 8px",
                paddingLeft: 0,
              },
            }}
            className="my-1 py-0"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        )}
        <FormControl component="fieldset">
          {/* All Checkbox */}

          <div className="grid grid-cols-1 gap-1 px-1">
            {multiple && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleAllChange}
                    // indeterminate={!isNoneSelected && !isAllSelected}
                    icon={
                      <div className="h-5 w-5 rounded-sm border-2 border-[#D6DDEB]" />
                    }
                    checkedIcon={
                      <div className="flex h-5 w-5 items-center justify-center rounded-sm border-2 border-primary bg-primary">
                        <CheckIcon className="m-auto h-4 w-4 text-primary-foreground" />
                      </div>
                    }
                    sx={{ padding: 0, px: 1 }}
                  />
                }
                label={`All (${getTotalCount(items)})`}
                className="rounded-md text-[#515B6F] transition-colors hover:bg-gray-50"
              />
            )}
            {allOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={value.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    icon={
                      <div className="h-5 w-5 rounded-sm border-2 border-[#D6DDEB]" />
                    }
                    checkedIcon={
                      <div className="flex h-5 w-5 items-center justify-center rounded-sm border-2 border-primary bg-primary">
                        <CheckIcon className="m-auto h-4 w-4 text-primary-foreground" />
                      </div>
                    }
                    sx={{ padding: 0, px: 1 }}
                  />
                }
                label={`${option.label} ${option.count ? `(${option.count})` : ""}`}
                className="rounded-md text-[#515B6F] transition-colors hover:bg-gray-50"
              />
            ))}
          </div>
        </FormControl>
      </Collapse>
    </div>
  );
};

export default FilterItem;
