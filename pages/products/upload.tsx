import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import { useForm } from "react-hook-form";
import Layout from "@components/Layout";
import useMutation from "@libs/client/useMutation";

interface Form {
  name: string;
  price: number;
  description: string;
}

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<Form>();
  const [upload, { data, loading }] = useMutation("/api/products");

  const onValid = (data: Form) => {
    if (loading) return;
    upload(data);
  };

  return (
    <Layout canGoBack title="Upload Product">
      <form className="space-y-5 px-4 py-16" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register("name", { required: true })}
          label="Name"
          name="name"
          kind="text"
        />
        <Input
          register={register("price", { required: true })}
          label="Price"
          name="price"
          kind="price"
        />
        <Textarea
          register={register("description", { required: true })}
          label="Description"
          name="description"
        />
        <Button text={loading ? "Loading" : "Upload product"} type="submit" />
      </form>
    </Layout>
  );
};

export default Upload;
