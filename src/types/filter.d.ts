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

type FilterDrawerProps = {
  sections: JobFilter[];
  searchKeys?: string[];
  selectedFilters: Record<string, string[]>
  handleCheckChange: (sectionKey: string, value: string[]) => void
};
