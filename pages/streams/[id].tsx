import type { NextPage } from "next";
import ChatInput from "@components/ChatInput";
import Layout from "@components/Layout";
import Message from "@components/Message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";

interface Response {
  ok: boolean;
  stream: Stream & {
    messages: {
      user: { id: number; avatar: string | null };
      id: number;
      text: string;
    }[];
  };
}

interface Form {
  message: string;
}

const Stream: NextPage = () => {
  const { user } = useUser();
  const { query } = useRouter();
  const { data: { stream } = {}, mutate } = useSWR<Response>(
    query.id ? `/streams/${query.id}` : null,
    { refreshInterval: 1000 }
  );
  const { register, handleSubmit, reset } = useForm<Form>();
  const [send] = useMutation<{ ok: true }>(`/streams/${query.id}/messages`);

  const onValid = async (data: Form) => {
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                text: data.message,
                user: { id: user?.id, avatar: user?.avatar },
              },
            ],
          },
        } as any),
      { revalidate: false, rollbackOnError: true }
    );
    await send(data);
  };

  return (
    <Layout canGoBack>
      <div className="space-y-4 px-4 py-10">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">{stream?.name}</h1>
          <span className="mt-3 block text-2xl text-gray-900">
            ${stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <form
            className="h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16"
            onSubmit={handleSubmit(onValid)}
          >
            {stream?.messages.map((msg) => (
              <Message
                key={msg.id}
                text={msg.text}
                reversed={msg.user.id === user?.id}
              />
            ))}
            <ChatInput register={register("message", { required: true })} />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
