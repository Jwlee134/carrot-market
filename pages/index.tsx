import type { NextPage } from "next";
import FloatingButton from "@components/FloatingButton";
import Item from "@components/Product";
import Layout from "@components/Layout";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";
import useUser from "@libs/client/useUser";

export type TProduct = Product & { _count: { records: number } };

const isProduct = (item: TProduct | number): item is TProduct =>
  (item as TProduct).id !== undefined;

const Home: NextPage = () => {
  const {} = useUser();
  const { data } = useSWR<{ ok: boolean; products: TProduct[] }>("/products");

  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>홈</title>
      </Head>
      <div className="flex flex-col divide-y">
        {(data?.products ?? Array(20).fill(1)).map((item, i) => (
          <Item
            key={isProduct(item) ? item.id : i}
            href={isProduct(item) ? `/products/${item.id}` : null}
            {...(isProduct(item) ? item : null)}
          />
        ))}
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
