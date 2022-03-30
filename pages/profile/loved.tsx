import type { NextPage } from "next";
import Item from "../../components/Item";
import Layout from "../../components/Layout";

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
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

export default Loved;
