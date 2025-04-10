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
}

interface ActionOption<T> {
  label: string;
  action: (item: T) => void;
  icon?: React.ReactNode;
}

interface NoDataMessage {
  title: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
}

interface StatusCardType {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  trend?: {
    value?: string;
    description?: string;
    trendDirection?: "up" | "down";
  };
}