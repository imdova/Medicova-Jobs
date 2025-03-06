"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItem from "@/components/UI/FilterItem";
import { FilterOption } from "@/types";
import { createUrl } from "@/util";
import { Suspense } from "react";

type JobFilter = {
  name: string;
  key: string;
  items: FilterOption[];
};

type FilterProps = {
  className?: string;
  sections: JobFilter[];
  searchKeys?: string[];
};
// TODO: add filter drawer here 
const FilterSideBar = ({ searchKeys, sections }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCheckChange = (sectionKey: string, value: string[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(sectionKey, value.join(","));
    router.push(createUrl(pathname, newParams), { scroll: false });
  };

  // Get current selected filters from URL
  const getSelectedFilters = () => {
    const selected: Record<string, string[]> = {};

    sections.forEach((section) => {
      const param = searchParams.get(section.key);
      const values = param?.split(",").filter(Boolean) || [];
      if (values.length > 0) {
        selected[section.key] = values;
      } else {
        selected[section.key] = [];
      }
    });

    return selected;
  };

  const selectedFilters = getSelectedFilters();

  return (
    <div className="hidden w-1/5 rounded-[10px] border border-gray-100 bg-white p-[20px] shadow-xl lg:block">
      <div className="space-y-6">
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
    </div>
  );
};

const Filter: React.FC<FilterProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div className="hidden w-1/5 rounded-[10px] border border-gray-100 bg-white p-[20px] shadow-xl lg:block">
          Loading...
        </div>
      }
    >
      <FilterSideBar {...props} />
    </Suspense>
  );
};

export default Filter;
