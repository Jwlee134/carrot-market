import type { NextPage } from "next";
import Layout from "@components/Layout";
import useSWR from "swr";
import { Kinds } from "@prisma/client";
import { useRouter } from "next/router";
import ProductList, { TProduct } from "@components/ProductList";

interface Response {
  ok: true;
  records: TProduct[];
}

const Records: NextPage = () => {
  const {
    query: { type },
  } = useRouter();
  const { data } = useSWR<Response>(
    type && !Array.isArray(type) && type in Kinds
      ? `/users/me/records?type=${type}`
      : null
  );

  return (
    <Layout
      title={
        type === Kinds.Fav
          ? "관심목록"
          : type === Kinds.Sold
          ? "판매내역"
          : "구매내역"
      }
      canGoBack
    >
      <div className="flex flex-col divide-y">
        <ProductList
          data={data?.records}
          href={({ id }) => `/products/${id}`}
        />
      </div>
    </Layout>
  );
};

export default Records;
