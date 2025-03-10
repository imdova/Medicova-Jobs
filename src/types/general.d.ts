type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

interface TextEditorProps {
  defaultValue?: string;
  value: string;
  onChange: (e: string) => void;
}

interface LocationType {
  country?: { code?: string; name?: string } | null;
  state?: { code?: string; name?: string } | null;
  city?: string | null;
};