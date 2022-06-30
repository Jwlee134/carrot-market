import type { NextPage } from "next";
import Product from "@components/Product";
import Layout from "@components/Layout";

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
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

export default Loved;
