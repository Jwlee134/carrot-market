import type { NextPage } from "next";
import Product from "@components/Product";
import Layout from "@components/Layout";
import useSWR from "swr";
import { Kinds, Product as TProduct } from "@prisma/client";
import { isProduct } from "@libs/client/utils";
import { useRouter } from "next/router";

interface Response {
  ok: true;
  records: (TProduct & { _count: { records: number } })[];
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
        {(data?.records ?? Array(10).fill(1)).map((fav, i) => (
          <Product
            key={i}
            href={isProduct(fav) ? `/products/${fav.id}` : null}
            {...(isProduct(fav) ? fav : null)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Records;
