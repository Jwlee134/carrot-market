import type { NextPage } from "next";
import Button from "@components/Button";
import Layout from "@components/Layout";
import Textarea from "@components/Textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Form {
  question: string;
}

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm<Form>();
  const [submit, { data, loading }] = useMutation<{ ok: boolean; id: number }>(
    "/posts"
  );
  const router = useRouter();

  const onValid = (data: Form) => {
    if (loading) return;
    submit(data);
  };

  useEffect(() => {
    if (!data || !data.ok) return;
    router.push(`/community/${data.id}`);
  }, [data, router]);

  return (
    <Layout canGoBack title="Write a Post">
      <form className="space-y-2 px-4 py-4">
        <Textarea
          register={register("question", { required: true })}
          placeholder="Ask a question!"
        />
        <Button
          text={loading ? "Loading" : "Submit"}
          onClick={handleSubmit(onValid)}
        />
      </form>
    </Layout>
  );
};

export default Write;
