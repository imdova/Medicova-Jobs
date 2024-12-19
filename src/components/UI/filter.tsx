import FilterDrawer from "./FilterDrawer";
import FilterItem from "./FilterItem";
import { FilterOption } from "@/types";

type Props<T extends Record<string, FilterOption[]>, K extends keyof T> = {
  className?: string;
  sections: T; // The object
  searchKeys: K[]; // A key of the object
  selectedFilters: Record<keyof T, string[]>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<keyof T, string[]>>
  >;
};

const FilterSections = <
  T extends Record<string, FilterOption[]>,
  K extends keyof T,
>({
  className,
  searchKeys,
  sections,
  selectedFilters,
  setSelectedFilters,
}: Props<T, K>) => {
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
      <div
        className={
          className ||
          "scroll-bar-hidden sticky top-[107px] hidden max-h-[calc(100vh-114px)] w-1/5 overflow-y-scroll pb-[16px] pt-[80px] lg:block"
        }
      >
        <div className="rounded-lg bg-white shadow-md">
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
        </div>
      </div>
      <FilterDrawer
        sections={sections}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        searchKeys={searchKeys}
      />
    </>
  );
};

export default FilterSections;
