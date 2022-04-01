import { useState } from "react";

type Trigger = (body: unknown) => void;

interface UseMutationState<T, K> {
  data: T | undefined;
  loading: boolean;
  error: K | undefined;
}

type UseMutationResult<T, K> = [Trigger, UseMutationState<T, K>];

const useMutation = <T = {}, K = {}>(url: string): UseMutationResult<T, K> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<K | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const trigger: Trigger = (body) => {
    setLoading(true);
    fetch(`/api${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json().catch(() => {}))
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  };

  return [trigger, { data, loading, error }];
};

export default useMutation;
