type FilterItem = {
  label: string;
  count?: number;
  value: string;
};

type FilterParam = {
  sectionKey: string;
  value: string[];
};

type FilterType = {
  name: string;
  sectionKey: string;
  items: FilterItem[];
  multiple?: boolean;
  searchable?: boolean;
  resetSections?: string[];
  maxItems?: number;
};

type FilterProps = {
  className?: string;
  sections: FilterType[];
};

type FilterDrawerProps = {
  sections: FilterType[];
  searchKeys?: string[];
  selectedFilters: Record<string, string[]>;
  handleCheckChange: (params: FilterParam[]) => void;
};
