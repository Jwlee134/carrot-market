import { useState } from "react";

type Trigger = (body: unknown) => Promise<void>;

interface UseMutationState<T, K> {
  data: T | undefined;
  loading: boolean;
  error: K | undefined;
}

type UseMutationResult<T, K> = [Trigger, UseMutationState<T, K>];

export default function useMutation<T = any, K = any>(
  url: string
): UseMutationResult<T, K> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<K | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const trigger: Trigger = async (body) => {
    setLoading(true);
    try {
      await (
        await fetch(`/api${url}`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        })
      ).json();
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [trigger, { data, loading, error }];
}
