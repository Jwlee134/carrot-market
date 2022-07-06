import Link from "next/link";
import { PostType } from "pages/community";
import Skeleton from "./Skeleton";

interface Props extends Partial<PostType> {
  href?: string;
}

const Post = ({ id, href, user, createdAt, _count, question }: Props) => {
  if (!href) {
    return (
      <div className="flex flex-col items-start">
        <span className="flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mt-2 text-gray-700">
          <span className="font-medium text-orange-500">
            Q. <Skeleton width="50vw" />
          </span>
        </div>
        <div className="mt-5 flex w-full items-center justify-between text-xs font-medium text-gray-500">
          <span>
            <Skeleton width="4rem" />
          </span>
          <span>
            <Skeleton width="4rem" />
          </span>
        </div>
        <div className="mt-3 flex w-full space-x-5 border-t border-b-[1.5px] py-2.5 text-gray-700">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              궁금해요 <Skeleton width={10} />
            </span>
          </div>
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
              답변 <Skeleton width={10} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={href}>
      <a className="flex flex-col items-start">
        <span className="flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mt-2 text-gray-700">
          <span className="font-medium text-orange-500">Q. {question}</span>
        </div>
        <div className="mt-5 flex w-full items-center justify-between text-xs font-medium text-gray-500">
          <span>{user?.name}</span>
          <span>
            {createdAt ? new Date(createdAt).toISOString() : <Skeleton />}
          </span>
        </div>
        <div className="mt-3 flex w-full space-x-5 border-t border-b-[1.5px] py-2.5 text-gray-700">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>궁금해요 {_count?.wonderings}</span>
          </div>
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
            <span>답변 {_count?.answers}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
