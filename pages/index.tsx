import type { NextPage } from "next";
import FloatingButton from "@components/FloatingButton";
import Layout from "@components/Layout";
import Head from "next/head";
import useSWR from "swr";
import useUser from "@libs/client/useUser";
import ProductList, { TProduct } from "@components/ProductList";

const Home: NextPage = () => {
  const {} = useUser();
  const { data } = useSWR<{ ok: boolean; products: TProduct[] }>("/products");

  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>홈</title>
      </Head>
      <div className="flex flex-col divide-y">
        <ProductList
          data={data?.products}
          href={({ id }) => `/products/${id}`}
        />
        <FloatingButton href="/products/upload">
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
