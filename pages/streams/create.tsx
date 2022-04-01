import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import Textarea from "@components/Textarea";

const Create: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-5 px-4 py-10">
        <Input kind="text" label="Name" name="name" />
        <Input kind="price" label="Price" name="price" />
        <Textarea label="Description" name="description" />
        <Button text="Create stream" />
      </div>
    </Layout>
  );
};

export default Create;
