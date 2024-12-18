"use client";
import { Drawer } from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterItem from "./FilterItem";
import { FilterOption } from "@/types";

type Props<T extends Record<string, FilterOption[]>, K extends keyof T> = {
  sections: T; // The object
  searchKeys: K[]; // A key of the object
  selectedFilters: Record<keyof T, string[]>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<keyof T, string[]>>
  >;
};
const FilterDrawer = <
  T extends Record<string, FilterOption[]>,
  K extends keyof T,
>({
  searchKeys,
  sections,
  selectedFilters,
  setSelectedFilters,
}: Props<T, K>) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const handleCheckChange = (sectionKey: string, value: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [sectionKey]: value,
    }));
  };

  const filteredSections = Object.entries(sections).map(([key, options]) => ({
    key,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    options: options,
  }));

  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-30 block rounded-full bg-[#2EAE7D] p-2 shadow-lg md:left-16 lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FilterListIcon className="h-8 w-8 text-white" />
      </button>
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={close}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            padding: "1rem",
            maxHeight: "80dvh",
          },
        }}
      >
        <div className="flex items-center justify-center bg-[#DEF0EB] py-2">
          <h5 className="text-3xl font-bold">Filters</h5>
        </div>
        <div className="space-y-6 p-4">
          {filteredSections.map((section) => (
            <FilterItem
              key={section.key}
              section={section}
              value={selectedFilters[section.key] || ""}
              handleCheckChange={handleCheckChange}
              isSearch={searchKeys.includes(section.key as K)}
            />
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
