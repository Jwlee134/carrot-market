import type { NextPage } from "next";
import Layout from "@components/Layout";
import Textarea from "@components/Textarea";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Answer, Post } from "@prisma/client";
import Link from "next/link";
import Skeleton from "@components/Skeleton";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import AnswerComponent from "@components/Answer";

export type AnswerType = Answer & {
  user: { id: number; name: string; avatar: string | null };
};

type PostType = Post & {
  _count: { answers: number; wonderings: number };
  user: { id: number; name: string; avatar: string | null };
  answers: AnswerType[];
};

interface Response {
  ok: boolean;
  post: PostType;
  isWondering: boolean;
}

interface Form {
  answer: string;
}

const isAnswer = (item: AnswerType | number): item is AnswerType =>
  (item as AnswerType).id !== undefined;

const CommunityPostDetail: NextPage = () => {
  const { query } = useRouter();
  const { data: { post, isWondering } = {}, mutate } = useSWR<Response>(
    query.id ? `/posts/${query.id}` : null
  );
  const [toggleWondering, { loading }] = useMutation(
    `/posts/${query.id}/wonder`
  );
  const [submitAnswer, { data, loading: answerLoading }] = useMutation<{
    ok: boolean;
    answer: Answer;
  }>(`/posts/${query.id}/answer`);
  const { register, handleSubmit, reset } = useForm<Form>();

  const onValid = async (data: Form) => {
    if (answerLoading) return;
    await submitAnswer(data);
  };

  const onWonderClick = async () => {
    mutate(
      (prev) =>
        prev && {
          ...prev,
          post: {
            ...prev.post,
            _count: {
              ...prev.post._count,
              wonderings: isWondering
                ? prev.post._count.wonderings - 1
                : prev.post._count.wonderings + 1,
            },
          },
          isWondering: !isWondering,
        },
      false
    );
    if (loading) return;
    await toggleWondering({});
    mutate();
  };

  useEffect(() => {
    if (data?.ok) {
      reset();
      mutate();
    }
  }, [data, reset, mutate]);

  return (
    <Layout canGoBack>
      <div className="py-4">
        <span className="ml-4 flex w-fit items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex items-center space-x-3 border-b px-4 py-3">
          <div className="h-10 w-10 cursor-pointer rounded-full bg-slate-300" />
          <div className="cursor-pointer">
            <p className="text-sm font-medium text-gray-700">
              {post?.user.name || <Skeleton />}
            </p>
            <Link href={`/users/profile/${post?.user.name}`}>
              <a>
                <p className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </p>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">Q. </span>
            {post?.question || <Skeleton width="50vw" />}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[1.5px] px-4 py-2.5 text-gray-700">
            <button
              className={cls(
                "flex items-center space-x-2 text-sm",
                isWondering ? "text-teal-600" : ""
              )}
              onClick={onWonderClick}
            >
              {!isWondering ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>
                궁금해요 {post?._count.wonderings ?? <Skeleton width={10} />}
              </span>
            </button>
            <div className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>
                답변 {post?._count.answers ?? <Skeleton width={10} />}
              </span>
            </div>
          </div>
        </div>
        {(post?.answers ?? [1, 2, 3, 4]).map((answer, i) => (
          <AnswerComponent
            key={isAnswer(answer) ? answer.id : i}
            {...(isAnswer(answer) ? answer : null)}
          />
        ))}
        <form className="px-4 pt-2" onSubmit={handleSubmit(onValid)}>
          <Textarea
            register={register("answer", { required: true })}
            placeholder="Answer this question!"
          />
          <button className="mt-2 w-full rounded-md border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            {answerLoading ? "Loading" : "Reply"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
