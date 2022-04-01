import type { NextPage } from "next";
import Item from "@components/Item";
import Layout from "@components/Layout";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col divide-y">
        {Array(10)
          .fill(1)
          .map((_, i) => (
            <Item key={i} href={`/items/${i}`} />
          ))}
      </div>
    </Layout>
  );
};

export default Sold;
