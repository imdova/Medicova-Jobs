import React, { useState } from "react";
import { TextField, Box, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

// Example frequent and recent search topics
const frequentSearchTopics = [
  "Registered Nurses",
  "Physician Assistants",
  "Therapists",
  "Medical Technicians",
  "Healthcare Administrators",
];

const recentSearchTopics: string[] = []; // Example: Change this to test recent searches

const SearchComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      newParams.set("q", searchValue);
    } else {
      newParams.delete("q");
    }
    router.push(createUrl(pathname, newParams));
  }

  return (
    <div
      className="flex flex-col items-center justify-center bg-[#185D43] px-4 text-white"
      style={{ minHeight: "calc(100dvh - 100px)" }}
    >
      {/* Search Bar */}
      <Box className="flex w-full flex-col gap-3 md:w-4/5 md:flex-row" mb={4}>
        <p className="!font-dmSerifDisplay mb-4 w-full text-center text-[26px] md:w-1/4 md:text-left">
          Discover more than 2 million healthcare Providers CVs
        </p>
        <div className="w-full md:w-3/4">
          <form
            onSubmit={onSubmit}
            className="flex h-fit w-full gap-2 bg-white p-3"
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Job Candidates CV's"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                },
                minWidth: 200,
              }}
            />
            <Button type="submit" variant="contained" className="w-1/5">
              Search
            </Button>
          </form>
          <p className="my-4 text-white/50">
            Struggling to find the right candidate for your role? Search our
            database of over 2 million healthcare professionals and connect with
            your next top hire.
          </p>
          <Box className="mt-8 flex flex-col gap-4 md:flex-row">
            <h6 className="mb-4">
              {recentSearchTopics.length > 0
                ? "Recent Search Topics"
                : "Frequent Search Topics"}
            </h6>

            <ul className="group flex flex-row flex-wrap gap-2">
              {(recentSearchTopics.length > 0
                ? recentSearchTopics
                : frequentSearchTopics
              ).map((topic, index) => (
                <li key={index}>
                  <Link
                    href={{
                      query: {
                        q: topic,
                      },
                    }}
                    onClick={() => setSearchValue(topic)}
                  >
                    <button className="rounded-full border border-white p-2 px-4 text-white duration-300 hover:!opacity-100 group-hover:opacity-20">
                      {topic}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};
export default SearchComponent;
