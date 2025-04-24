"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItem from "@/components/UI/FilterItem";
import { createUrl } from "@/util";
import { Suspense, useState } from "react";
import FilterDrawer from "@/components/UI/FilterDrawer";
import FilterSkeleton from "@/components/loading/filterSkelton";
import { FilterList } from "@mui/icons-material";

const FilterSideBar: React.FC<FilterProps> = ({ sections }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleCheckChange = (params: FilterParam[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    params.forEach(({ sectionKey, value }) => {
      newParams.set(sectionKey, value.join(","));
    });
    router.push(createUrl(pathname, newParams), { scroll: false });
  };

  // Get current selected filters from URL
  const getSelectedFilters = () => {
    const selected: Record<string, string[]> = {};

    sections.forEach((section) => {
      const param = searchParams.get(section.sectionKey);
      const values = param?.split(",").filter(Boolean) || [];
      if (values.length > 0) {
        selected[section.sectionKey] = values;
      } else {
        selected[section.sectionKey] = [];
      }
    });

    return selected;
  };

  const selectedFilters = getSelectedFilters();

  return (
    <>
      <div className="hidden w-1/5 rounded-[10px] border border-gray-200 bg-white p-[20px] shadow-xl lg:block">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <FilterItem
              key={section.sectionKey}
              {...section}
              index={index}
              value={selectedFilters[section.sectionKey] || []}
              handleCheckChange={handleCheckChange}
            />
          ))}
        </div>
      </div>
      <button
        className="fixed bottom-4 left-4 z-30 block rounded-full bg-[#2EAE7D] p-2 shadow-lg md:left-16 lg:hidden"
        onClick={onOpen}
      >
        <FilterList className="h-8 w-8 text-white" />
      </button>
      <FilterDrawer
        isOpen={isOpen}
        onClose={onClose}
        sections={sections}
      />
    </>
  );
};

const Filter: React.FC<FilterProps> = (props) => {
  return (
    <Suspense fallback={<FilterSkeleton />}>
      <FilterSideBar {...props} />
    </Suspense>
  );
};

export default Filter;
