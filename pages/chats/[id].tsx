import type { NextPage } from "next";
import ChatInput from "@components/ChatInput";
import Layout from "@components/Layout";
import Message from "@components/Message";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title="Steve">
      <div className="space-y-4 py-4 px-4 pb-16">
        <Message text="Hi how much are you selling them for?" />
        <Message text="I want ￦20,000" reversed />
        <Message text="미쳤어" />
        <Message text="Hi how much are you selling them for?" />
        <Message text="I want ￦20,000" reversed />
        <Message text="미쳤어" />
        <Message text="Hi how much are you selling them for?" />
        <Message text="I want ￦20,000" reversed />
        <Message text="미쳤어" />
        <Message text="Hi how much are you selling them for?" />
        <Message text="I want ￦20,000" reversed />
        <Message text="미쳤어" />
        <Message text="Hi how much are you selling them for?" />
        <Message text="I want ￦20,000" reversed />
        <Message text="미쳤어" />
        <Message text="Hi how much are you selling them for?" />
        <Message text="I want ￦20,000" reversed />
        <Message text="미쳤어" />
        <ChatInput />
      </div>
    </Layout>
  );
};

export default ChatDetail;
