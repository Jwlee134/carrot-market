import type { NextPage } from "next";
import ChatInput from "@components/ChatInput";
import Layout from "@components/Layout";
import Message from "@components/Message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

const Stream: NextPage = () => {
  const { query } = useRouter();
  const { data: { stream } = {} } = useSWR<{ ok: boolean; stream: Stream }>(
    query.id ? `/streams/${query.id}` : null
  );

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
          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
            <Message text="Hi how much are you selling them for?" />
            <Message text="I want ￦20,000" reversed />
            <ChatInput />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
