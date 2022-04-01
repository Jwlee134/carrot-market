import type { NextPage } from "next";
import Button from "@components/Button";
import Layout from "@components/Layout";
import Textarea from "@components/Textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="space-y-2 px-4 py-10">
        <Textarea placeholder="Ask a question!" />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
