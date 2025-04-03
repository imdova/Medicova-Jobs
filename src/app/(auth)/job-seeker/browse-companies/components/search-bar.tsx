"use client";
import { createUrl } from "@/util";
import { LocationOn, MedicalServices, Search } from "@mui/icons-material";
import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const SearchInputForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const newPathname = pathname;

  const initialSearchText = searchParams.get("q") || "";
  const initialCompanyType = searchParams.get("cType") || "";
  const initialCountry = searchParams.get("country") || "";

  const [query, setQuery] = useState(initialSearchText);
  const [companyType, setCompanyType] = useState(initialCompanyType);
  const [country, steCountry] = useState(initialCountry);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("q", query);
    newParams.set("cType", companyType);
    newParams.set("country", country);
    newParams.delete("page");
    router.push(createUrl(newPathname, newParams));
  }

  return (
    <form
      className="flex flex-col gap-2 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:flex-row md:p-5"
      onSubmit={onSubmit}
    >
      {/* Text Input with Icon */}
      <TextField
        fullWidth
        placeholder="Company title or keyword"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      />

      
      <Select
        fullWidth
        value={companyType}
        onChange={(e) => setCompanyType(e.target.value)}
        variant="outlined"
        displayEmpty
        startAdornment={
          <InputAdornment position="start">
            <MedicalServices />
          </InputAdornment>
        }
        renderValue={(selected: string) => {
          return selected ? (
            selected
          ) : (
            <span className="text-neutral-400">select company</span>
          );
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <MenuItem disabled value="Company type">
          Select Company Type
        </MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="Pharmacy">Pharmacy</MenuItem>
        <MenuItem value="Finance">Finance</MenuItem>
        <MenuItem value="Technology">Technology</MenuItem>
      </Select>

      {/* Text Input for Location with Icon */}
      <TextField
        fullWidth
        placeholder="Italy"
        variant="outlined"
        value={country}
        onChange={(e) => steCountry(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      />

      {/* Search Button */}
      <Button
        variant="contained"
        type="submit"
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          px: 4,
          width: { xs: "100%", md: "50%" },
        }}
      >
        Search
      </Button>
    </form>
  );
};

const SearchBar: React.FC = (props) => {
  return (
    <Suspense>
      <SearchInputForm {...props} />
    </Suspense>
  );
};
export default SearchBar;
