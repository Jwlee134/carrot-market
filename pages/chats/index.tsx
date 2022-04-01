import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/Layout";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <Link key={i} href={`/chats/${i}`}>
            <a>
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="h-12 w-12 cursor-pointer rounded-full bg-slate-300" />
                <div className="cursor-pointer">
                  <p className="text-gray-700">Steve Jebs</p>
                  <p className="text-sm text-gray-500">
                    See you tomorrow in the corner at 2pm!
                  </p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
