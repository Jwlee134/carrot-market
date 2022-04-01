import { cls } from "@libs/client/utils";

interface Props {
  text: string;
  avatarUrl?: string;
  reversed?: boolean;
}

const Message = ({ text, avatarUrl, reversed }: Props) => {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      <div className="h-8 w-8 rounded-full bg-slate-400" />
      <div className="max-w-[50%] rounded-md border border-gray-300 p-2 text-sm text-gray-700">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
