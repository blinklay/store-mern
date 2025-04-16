import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

interface UseAxiosResult<T> {
  result: T | null;
  error: unknown;
  isLoading: boolean;
}

export default function useAxios<T = unknown>(
  apiLink: string,
  initialState: T | null = null
): UseAxiosResult<T> {
  const [result, setResult] = useState<T | null>(initialState);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    axiosInstance
      .get<T>(apiLink)
      .then((res) => {
        if (isMounted) {
          setResult(res.data);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [apiLink]);

  return { result, error, isLoading };
}
