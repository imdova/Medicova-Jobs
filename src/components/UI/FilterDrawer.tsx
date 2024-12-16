"use client";
import FilterSections from "@/components/UI/filter";
import { filterSections } from "@/constants";
import { Drawer } from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
interface FilterDrawerProps {
  handleFilterChange: (key: string, value: any) => void;
}
const FilterDrawer: React.FC<FilterDrawerProps> = ({ handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-30 block rounded-full bg-[#2EAE7D] p-2 shadow-lg md:hidden"
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
        <FilterSections
          sections={filterSections}
          onFilterChange={handleFilterChange}
          searchKeys={["Residency (Location)"]}
        />
      </Drawer>
    </>
  );
};

export default FilterDrawer;
