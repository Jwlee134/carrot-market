import { AnswerType } from "pages/community/[id]";
import Skeleton from "./Skeleton";

interface Props extends Partial<AnswerType> {}

const Answer = ({ user, createdAt, text }: Props) => {
  return (
    <div className="mt-5 mb-2 space-y-5 px-4">
      <div className="flex items-start space-x-3">
        <div className="h-8 w-8 rounded-full bg-slate-200" />
        <div>
          <span className="block text-sm font-medium text-gray-700">
            {user?.name || <Skeleton width="5rem" />}
          </span>
          <span className="block text-xs text-gray-500">
            {createdAt ? (
              new Date(createdAt).toISOString()
            ) : (
              <Skeleton width="5rem" />
            )}
          </span>
          <p className="mt-2 text-gray-700">
            {text || <Skeleton width="50vw" count={3} />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
