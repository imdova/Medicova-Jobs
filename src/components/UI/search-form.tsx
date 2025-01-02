"use client";
import { createUrl } from "@/app/(auth)/employer/search/search-page";
import {
  FilterAltOutlined,
  LocationOnOutlined,
  Search,
} from "@mui/icons-material";
import { FormControl, MenuItem, Select } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Flag from "./flagitem";

let timer: NodeJS.Timeout;
function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const searchData = {
  countries: [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "United Kingdom", code: "gb" },
    { name: "Australia", code: "AU" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
  ],
  categories: [
    "nursing",
    "physician",
    "pharmacist",
    "dentist",
    "therapist",
    "technician",
    "administration",
    "public health",
  ],
};

const SearchForm: React.FC<{
  onClick?: () => void;
  pathname?: string;
}> = ({ onClick, pathname: initialPathname }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();
  const newPathname = initialPathname || pathname;

  const initialSearchText = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialSearchText);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());

    if (query) {
      newParams.set("q", query);
      newParams.delete("page");
    } else {
      newParams.delete("q");
    }
    onClick?.();
    router.push(createUrl(newPathname, newParams));
  }

  const updateSearchParams = debounce((value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("q", value);
    newParams.delete("page");
    router.push(createUrl(pathname, newParams));
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (currentPage === "shop") {
      updateSearchParams(value);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 rounded-[20px] bg-white p-[10px] md:h-[70px] md:flex-row"
    >
      <div className="flex flex-1 items-center gap-2 px-2">
        <Search className="h-8 w-8 text-light-primary" />
        <input
          type="text"
          placeholder="Job title or keyword"
          value={query}
          onChange={handleChange}
          className="h-[50px] w-full border-b border-gray-300 bg-transparent focus:border-light-primary focus:outline-none md:h-full"
        />
      </div>
      <div className="flex flex-1 md:gap-2">
        <div className="flex flex-1 items-center gap-2 pl-2">
          <LocationOnOutlined className="h-8 w-8 text-light-primary" />
          <FormControl
            variant="standard"
            className="h-full w-full justify-center border-b border-solid border-gray-300"
          >
            <Select
              displayEmpty
              className="border-none bg-transparent text-main focus:outline-none"
              disableUnderline
              renderValue={(selected: string) => {
                if (!selected) {
                  return <em className="text-gray-400">Select Country</em>;
                }
                const item = searchData.countries.find(
                  (x) => x.name == selected,
                );
                return (
                  <span>
                    {item && (
                      <Flag
                        code={item.code.toLocaleLowerCase()}
                        name={item.name}
                        className="mr-2 inline"
                      />
                    )}
                    {selected}
                  </span>
                );
              }}
              // defaultValue="Select-Category"
            >
              <MenuItem disabled value="">
                <em>Select Category</em>
              </MenuItem>
              {searchData.countries.map((item, i) => (
                <MenuItem key={i} value={item.name}>
                  {" "}
                  <Flag
                    code={item.code.toLocaleLowerCase()}
                    name={item.name}
                    className="mr-2"
                  />{" "}
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-1 items-center gap-2 pr-2">
          <FilterAltOutlined className="h-8 w-8 text-light-primary" />
          <FormControl
            variant="standard"
            className="h-full w-full justify-center border-b border-solid border-gray-300"
          >
            <Select
              displayEmpty
              className="border-none bg-transparent text-main focus:outline-none"
              disableUnderline
              renderValue={(selected) => {
                if (!selected) {
                  return <em className="text-gray-400">Select Category</em>;
                }
                return <span>{selected ? selected.toString() : ""}</span>;
              }}
              // defaultValue="Select-Category"
            >
              <MenuItem disabled value="">
                <em>Select Category</em>
              </MenuItem>
              <MenuItem value="Nurse">Nurse</MenuItem>
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Physician Assistant">
                Physician Assistant
              </MenuItem>
              <MenuItem value="Dentist">Dentist</MenuItem>
              <MenuItem value="Pharmacist">Pharmacist</MenuItem>
              <MenuItem value="Occupational Therapist">
                Occupational Therapist
              </MenuItem>
              <MenuItem value="Physical Therapist">Physical Therapist</MenuItem>
              <MenuItem value="Speech Therapist">Speech Therapist</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <button className="hover:scale-102 h-[50px] text-nowrap rounded-[10px] bg-primary px-4 py-4 font-semibold text-white transition-all duration-300 hover:bg-primary-900 hover:shadow-2xl focus:ring-2 focus:ring-white md:h-full">
        Search my job
      </button>
    </form>
  );
};

export default SearchForm;
