import { useState, useEffect, useRef } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type FetchOptions = RequestInit & {
  autoFetch?: boolean; // Optional flag to control auto-fetching
};

const defaultOptions: FetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  autoFetch: false, // Default to false (fetch only once)
};

const useFetch = <T>(
  url: string | null,
  options: FetchOptions = { ...defaultOptions },
  onSuccess?: (data: T) => void, // Optional callback for successful fetch
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false); // Track if fetch has already happened

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return; // Skip if no URL
      if (!options.autoFetch && hasFetched.current) return; // Skip if autoFetch is false and already fetched

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
        if (onSuccess) {
          onSuccess(result); // Call the onSuccess callback with the fetched data
        }
        if (!options.autoFetch) {
          hasFetched.current = true; // Mark as fetched only if autoFetch is false
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, options, onSuccess]); // Add onSuccess to dependencies

  return { data, loading, error };
};

export default useFetch;
