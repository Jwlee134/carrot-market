import type { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import Textarea from "@components/Textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Form {
  name: string;
  price: string;
  description: string;
}

const Create: NextPage = () => {
  const { register, handleSubmit } = useForm<Form>();
  const [create, { data, loading }] = useMutation<{
    ok: boolean;
    stream: { id: number };
  }>("/streams");
  const router = useRouter();

  const onValid = (data: Form) => {
    if (loading) return;
    create(data);
  };

  useEffect(() => {
    if (data?.ok) router.push(`/streams/${data.stream.id}`);
  }, [data, router]);

  return (
    <Layout canGoBack>
      <form className="space-y-5 px-4 py-10" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("name", { required: true })}
          kind="text"
          label="Name"
          name="name"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          kind="price"
          label="Price"
          name="price"
        />
        <Textarea
          register={register("description", { required: true })}
          label="Description"
          name="description"
        />
        <Button text={loading ? "Loading" : "Create stream"} />
      </form>
    </Layout>
  );
};

export default Create;
