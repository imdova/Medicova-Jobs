import { useState, useEffect, useRef } from "react";

interface FetchOptions extends RequestInit {
  skip?: boolean;
  fetchOnUrlChange?: boolean;
  fetchOnce?: boolean;
}

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const defaultOptions: FetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  fetchOnce: true,
  skip: false,
  fetchOnUrlChange: false,
};

export default function useFetch<T>(
  url: string | undefined | null,
  options: FetchOptions = {},
  onSuccess?: (data: T) => void,
): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const hasFetched = useRef<boolean>(false);
  const prevUrl = useRef<string | undefined | null>(url);

  // Merge default options with provided options
  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    const shouldFetch = () => {
      // Don't fetch if there's no URL
      if (!url) return false;

      // Don't fetch if skip is true
      if (mergedOptions.skip) return false;

      // If fetchOnce is true and we've already fetched, don't fetch again
      if (mergedOptions.fetchOnce && hasFetched.current) return false;

      // If fetchOnUrlChange is true, fetch when URL changes
      if (mergedOptions.fetchOnUrlChange)
        if (url != prevUrl.current || (url == prevUrl.current && !data)) {
          return true;
        }

      // If it's the first render and we haven't fetched, fetch
      if (!hasFetched.current) return true;

      return false;
    };

    const fetchData = async () => {
      if (!url) return setData(null);
      if (!shouldFetch()) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url!, mergedOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        hasFetched.current = true;
        prevUrl.current = url;
        if (onSuccess) {
          onSuccess(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Could add abort controller here if needed
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    url,
    mergedOptions.skip,
    mergedOptions.fetchOnUrlChange,
    mergedOptions.fetchOnce,
  ]);

  return { data, loading, error };
}
