import { useState, useCallback } from "react";

// Define types
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface UseUpdateApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  onUpdate: (url: string, options: FetchOptions) => Promise<T>;
}

function useUpdateApi<T>(
  onSuccess?: (result: T) => void,
): UseUpdateApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onUpdate = useCallback(
    async (url: string, options: FetchOptions) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
        const result: T = await response.json();

        if (!response.ok) {
          throw new Error((result as any)?.message || "Update failed");
        }

        setData(result);
        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess],
  );

  return { data, loading, error, onUpdate };
}

export default useUpdateApi;
