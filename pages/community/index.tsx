import type { NextPage } from "next";
import FloatingButton from "@components/FloatingButton";
import Layout from "@components/Layout";
import useSWR from "swr";
import { Post } from "@prisma/client";
import PostComponent from "@components/Post";

export type PostType = Post & {
  user: { name: string };
  _count: { answers: number; wonderings: number };
};

const isPost = (item: PostType | number): item is PostType =>
  (item as PostType).id !== undefined;

const Community: NextPage = () => {
  const { data: { posts } = {} } = useSWR<{
    ok: true;
    posts: PostType[];
  }>("/posts");

  return (
    <Layout title="동네생활" hasTabBar>
      <div className="space-y-8 py-4 px-4">
        {(posts ?? Array(20).fill(1))?.map((post, i) => (
          <PostComponent
            key={isPost(post) ? post.id : i}
            href={isPost(post) ? `/community/${post.id}` : undefined}
            {...(isPost(post) ? post : null)}
          />
        ))}
        <FloatingButton href="/community/write">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
