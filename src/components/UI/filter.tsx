import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Collapse,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";
interface FilterOption {
  label: string;
  count: number;
  value: string;
}

type Props<T extends Record<string, FilterOption[]>, K extends keyof T> = {
  sections: T; // The object
  searchKeys: K[]; // A key of the object
  onFilterChange: (sectionKey: string, value: string) => void;
};

const FilterSections = <
  T extends Record<string, FilterOption[]>,
  K extends keyof T
>({
  searchKeys,
  sections,
  onFilterChange,
}: Props<T, K>) => {
  const [searchTerm, setSearchTerm] = useState<Record<string, string>>({
    nationality: "",
  });
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(
    Object.keys(sections).reduce((acc, key) => {
      acc[key] = true; // All sections open by default
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleSearchChange = (
    sectionKey: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm((prev) => ({
      ...prev,
      [sectionKey]: event.target.value,
    }));
  };

  const handleRadioChange = (sectionKey: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [sectionKey]: value,
    }));
    onFilterChange(sectionKey, value);
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredSections = Object.entries(sections).map(([key, options]) => ({
    key,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    options:
      searchKeys.includes(key as K) && searchTerm[key]
        ? options.filter((option) =>
            option.label.toLowerCase().includes(searchTerm[key].toLowerCase())
          )
        : options,
  }));

  return (
    <div className=" bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center bg-[#DEF0EB] py-2">
        <h5 className="text-3xl font-bold">Filters</h5>
      </div>
      <div className="space-y-6 p-4">
        {filteredSections.map((section) => (
          <div key={section.key} className="border-b pb-4 last:border-b-0">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                className="text-[16px] font-bold text-[#25324B] mb-3"
              >
                {section.title}
              </Typography>
              <IconButton
                onClick={() => toggleSection(section.key)}
                size="small"
              >
                {expandedSections[section.key] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </Box>

            <Collapse className="px-1" in={expandedSections[section.key]}>
              <FormControl component="fieldset">
                <RadioGroup
                  value={selectedValues[section.key] || ""}
                  onChange={(e) =>
                    handleRadioChange(section.key, e.target.value)
                  }
                >
                  <div className="grid grid-cols-1 gap-2">
                    {section.options.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                          <Radio
                            checkedIcon={
                              <Box
                                sx={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: 1,
                                  backgroundColor: "#2EAE7D", // Checked color
                                  border: "2px solid #2EAE7D",
                                }}
                              >
                                <CheckIcon
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    margin: "auto",
                                    color: "white", // Checked icon color
                                  }}
                                />
                              </Box>
                            }
                            icon={
                              <Box
                                sx={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: 1,
                                  backgroundColor: "transparent", // Unchecked color
                                  border: "2px solid #D6DDEB",
                                }}
                              />
                            }
                          />
                        }
                        label={`${option.label} (${option.count})`}
                        className="text-[#515B6F] text-[16px] hover:bg-gray-50 rounded-md transition-colors"
                      />
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
              {searchKeys.includes(section.key as K) && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search..."
                  value={
                    searchTerm[section.key as keyof typeof searchTerm] || ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearchChange(section.key, e)
                  }
                  className="mb-3"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSections;
