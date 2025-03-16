"use client";
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import FilterItem from "./FilterItem";
import { Close, FilterList } from "@mui/icons-material";

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  searchKeys,
  sections,
  selectedFilters,
  handleCheckChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-30 block rounded-full bg-[#2EAE7D] p-2 shadow-lg md:left-16 lg:hidden"
        onClick={onOpen}
      >
        <FilterList className="h-8 w-8 text-white" />
      </button>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            // borderTopLeftRadius: "16px",
            // borderTopRightRadius: "16px",
            // padding: "1rem",
            maxHeight: "100dvh",
          },
        }}
      >
        <div className="sticky top-0 z-[2] p-4 bg-white">
          <div className=" flex items-center justify-between bg-[#DEF0EB] px-4 py-2">
            <h5 className="text-3xl font-bold">Filters</h5>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </div>
        </div>
        <div className="space-y-6 p-6">
          {sections.map((section, index) => (
            <FilterItem
              key={section.key}
              index={index}
              section={{
                key: section.key,
                title: section.name,
                options: section.items,
              }}
              value={selectedFilters[section.key] || []}
              handleCheckChange={handleCheckChange}
              isSearch={searchKeys ? searchKeys.includes(section.key) : false}
            />
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
