import FilterItem from "@/components/UI/FilterItem";
import { FilterOption } from "@/types";

type Props<T extends Record<string, FilterOption[]>, K extends keyof T> = {
  className?: string;
  sections: T; // The object
  searchKeys?: K[]; // A key of the object
  selectedFilters: Record<keyof T, string[]>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<keyof T, string[]>>
  >;
};

const JobFilter = <
  T extends Record<string, FilterOption[]>,
  K extends keyof T,
>({
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
      <div className="hidden w-1/5 rounded-[10px] border border-gray-100 bg-white p-[20px] shadow-xl lg:block">
        <div className="space-y-6">
          {filteredSections.map((section, index) => (
            <FilterItem
              key={section.key}
              index={index}
              section={section}
              value={selectedFilters[section.key] || ""}
              handleCheckChange={handleCheckChange}
              isSearch={
                searchKeys && searchKeys.includes(section.key as K)
                  ? true
                  : false
              }
            />
          ))}
        </div>
      </div>
      {/* <FilterDrawer
        sections={sections}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        searchKeys={searchKeys}
      /> */}
    </>
  );
};

export default JobFilter;
