import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface Response {
  ok: true;
  user: User | null;
}

export default function useUser() {
  const router = useRouter();
  const { data, error } = useSWR<Response>("/users/me");

  useEffect(() => {
    if (data && !data.user) {
      router.replace("/enter");
    }
  }, [router, data]);

  return { user: data?.user || null, isLoading: !data && !error };
}
