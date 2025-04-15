"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItem from "@/components/UI/FilterItem";
import { createUrl } from "@/util";
import { Suspense } from "react";
import FilterDrawer from "@/components/UI/FilterDrawer";
import FilterSkeleton from "@/components/loading/filterSkelton";

const FilterSideBar: React.FC<FilterProps> = ({ sections }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      <FilterDrawer
        sections={sections}
        selectedFilters={selectedFilters}
        handleCheckChange={handleCheckChange}
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
