import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const router = useRouter();
  const { data, error } = useSWR("/users/me");

  useEffect(() => {
    if (data && !data.user) {
      router.replace("/enter");
    }
  }, [router, data]);

  return { user: data?.user, isLoading: !data && !error };
}
