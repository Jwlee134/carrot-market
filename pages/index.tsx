import type { NextPage } from "next";
import FloatingButton from "@components/FloatingButton";
import Item from "@components/Item";
import Layout from "@components/Layout";
import Head from "next/head";
import useUser from "@libs/client/useUser";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>홈</title>
      </Head>
      <div className="flex flex-col divide-y">
        {Array(10)
          .fill(1)
          .map((_, i) => (
            <Item key={i} href={`/items/${i}`} />
          ))}
        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
