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
import { FilterSectionType } from "@/types";

interface FilterItemProps {
  section: FilterSectionType;
  value: string;
  handleRadioChange: (key: string, value: string) => void;
  isSearch: boolean;
}

const FilterItem: React.FC<FilterItemProps> = ({
  section,
  value,
  handleRadioChange,
  isSearch,
}) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredOptions =
    isSearch && query
      ? section.options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase()),
        )
      : section.options;
  return (
    <div className="border-b pb-4 last:border-b-0">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          className="mb-3 text-[14px] font-bold text-[#25324B]"
        >
          {section.title}
        </Typography>
        <IconButton onClick={toggleExpand} size="small">
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse className="px-1" in={isExpanded}>
        <FormControl component="fieldset">
          <RadioGroup
            value={value || ""}
            onChange={(e) => handleRadioChange(section.key, e.target.value)}
          >
            <div className="grid grid-cols-1 gap-1 px-1">
              {filteredOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Radio
                      checkedIcon={
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
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
                            width: 20,
                            height: 20,
                            borderRadius: 1,
                            backgroundColor: "transparent", // Unchecked color
                            border: "2px solid #D6DDEB",
                          }}
                        />
                      }
                      sx={{ padding: 0, px: 1 }}
                    />
                  }
                  label={`${option.label} (${option.count})`}
                  className="rounded-md text-[#515B6F] transition-colors hover:bg-gray-50"
                />
              ))}
            </div>
          </RadioGroup>
        </FormControl>
        {isSearch && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={query || ""}
            onChange={searchHandler}
            sx={{
              "& .MuiInputBase-input": {
                padding: "8px 8px", // Remove input padding
                paddingLeft: 0, // Add padding for the search icon
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
      </Collapse>
    </div>
  );
};

export default FilterItem;
