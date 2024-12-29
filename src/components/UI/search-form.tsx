"use client";
import { createUrl } from "@/app/(auth)/employer/search/search-page";
import { LocationOnOutlined, Search } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
        <Search className="text-light-primary h-8 w-8" />
        <input
          type="text"
          placeholder="Job title or keyword"
          value={query}
          onChange={handleChange}
          className="focus:border-light-primary h-[50px] w-full border-b border-gray-300 bg-transparent focus:outline-none md:h-full"
        />
      </div>
      <div className="flex flex-1 items-center gap-2 px-2">
        <LocationOnOutlined className="text-light-primary h-8 w-8" />
        <select className="focus:border-light-primary h-[50px] w-full border-b border-gray-300 bg-transparent focus:outline-none md:h-full">
          <option value="">Select country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="au">Australia</option>
          <option value="in">India</option>
        </select>
      </div>
      <button className="bg-primary hover:text-primary h-[50px] text-nowrap rounded-[10px] px-4 py-4 font-semibold text-white transition-colors duration-300 hover:bg-white focus:ring-2 focus:ring-white md:h-full">
        Search my job
      </button>
    </form>
  );
};

export default SearchForm;
