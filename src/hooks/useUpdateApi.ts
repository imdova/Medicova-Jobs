import revalidateTag from "@/lib/revalidate";
import { useState, useCallback } from "react";

// Define types
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  body?: any; // Allow any type for body
}

interface UseUpdateApiResponse<T> {
  data: T | null;
  isLoading: boolean; // Renamed for better convention
  error: Error | null; // Use Error type instead of string
  update: (
    url: string,
    options?: Partial<FetchOptions>,
    tags?: string,
  ) => Promise<T>; // Renamed and made options optional
  reset: () => void; // Added reset functionality
}

// Generic type for initial data
function useUpdateApi<T>(
  onSuccess?: (result: T) => void,
  initialData?: T,
): UseUpdateApiResponse<T> {
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(
    async (url: string, options: Partial<FetchOptions> = {}, tags?: string) => {
      setIsLoading(true);
      setError(null);

      // Default headers and options
      const defaultOptions: FetchOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        ...options,
      };

      // Stringify body if it's an object
      if (options.body && typeof options.body === "object") {
        defaultOptions.body = JSON.stringify(options.body);
      }

      try {
        const response = await fetch(url, defaultOptions);
        // Handle non-JSON responses
        const contentType = response.headers.get("content-type");
        let result: T;

        if (contentType?.includes("application/json")) {
          result = await response.json();
        } else {
          result = (await response.text()) as unknown as T;
        }

        if (!response.ok) {
          throw new Error(
            (result as any)?.message || `Update failed: ${response.status}`,
          );
        }

        setData(result);
        tags && await revalidateTag(tags);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const errorInstance =
          err instanceof Error ? err : new Error(String(err));
        setError(errorInstance);
        throw errorInstance;
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess],
  );

  const reset = useCallback(() => {
    setData(initialData ?? null);
    setError(null);
    setIsLoading(false);
  }, [initialData]);

  return { data, isLoading, error, update, reset };
}

export default useUpdateApi;

// Example usage:
/*
const { data, isLoading, error, update, reset } = useUpdateApi<User>(
  (result) => console.log("Success:", result),
  { id: 0, name: "" } // initial data
);

// Using the hook
const handleUpdate = async () => {
  try {
    const updatedUser = await update("/api/user/1", {
      method: "PATCH", // override default PUT
      body: { name: "John" },
    });
  } catch (err) {
    console.error("Update failed:", err);
  }
};
*/
