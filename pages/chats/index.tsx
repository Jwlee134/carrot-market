import type { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <div className="divide-y py-10">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <div key={i} className="flex items-center space-x-3 px-4 py-3">
          <div className="h-12 w-12 cursor-pointer rounded-full bg-slate-300" />
          <div className="cursor-pointer">
            <p className="text-gray-700">Steve Jebs</p>
            <p className="text-sm text-gray-500">
              See you tomorrow in the corner at 2pm!
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
