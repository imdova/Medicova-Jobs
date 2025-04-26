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

type FilterDrawerProps = FilterProps & { isOpen: boolean; onClose: () => void };
