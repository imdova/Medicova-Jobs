"use client";
import { createUrl } from "@/util";
import { TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, KeyboardEvent, Suspense, useState } from "react";

interface SearchProps extends ComponentProps<typeof TextField> {
  onClick?: () => void;
  pathname?: string;
  children?: React.ReactNode;
  isBounce?: boolean;
}

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

const Input: React.FC<SearchProps> = ({
  onClick,
  pathname: initialPathname,
  children,
  isBounce,
  ...props
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // const currentPage = pathname.split("/").pop();
  const newPathname = initialPathname || pathname;
  const initialSearchText = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialSearchText);

  function onSubmit() {
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
    if (isBounce) {
      updateSearchParams(value);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      onSubmit()
    }
  };
  return (
    <TextField
      {...props}
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}

    />
  );
};

const SearchInput: React.FC<SearchProps> = (props) => {
  return (
    <Suspense>
      <Input {...props} />
    </Suspense>
  );
};
export default SearchInput;
