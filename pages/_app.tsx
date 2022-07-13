import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";

function MyApp({ Component, pageProps }: AppProps) {
  const {} = useUser();

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(`/api/${url}`).then((res) => res.json()),
      }}
    >
      <div className="mx-auto w-full max-w-lg">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
