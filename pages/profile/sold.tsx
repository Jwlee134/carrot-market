import type { NextPage } from "next";
import Product from "@components/Product";
import Layout from "@components/Layout";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col divide-y">
        {Array(10)
          .fill(1)
          .map((_, i) => (
            <Product key={i} href={`/products/${i}`} />
          ))}
      </div>
    </Layout>
  );
};

export default Sold;
