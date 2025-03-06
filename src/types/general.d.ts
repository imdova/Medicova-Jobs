type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

interface TextEditorProps {
  defaultValue?: string;
  value: string;
  onChange: (e: string) => void;
}