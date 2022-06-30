import Skeleton from "./Skeleton";

const ItemSkeleton = () => {
  return (
    <div className="-z-10 flex cursor-pointer justify-between px-4 py-4">
      <div className="flex space-x-4">
        <div className="h-20 w-20 rounded-md bg-gray-400 leading-none">
          <Skeleton className="h-20" />
        </div>
        <div className="flex flex-col justify-between pt-2">
          <h3 className="text-sm font-medium text-gray-900">
            <Skeleton width="6rem" />
          </h3>
          <span className="mt-1 font-medium text-gray-900">
            <Skeleton width="3rem" />
          </span>
        </div>
      </div>
      <div className="flex items-end justify-end space-x-2">
        <div className="flex items-center space-x-0.5 text-sm text-gray-600">
          <Skeleton width="4rem" />
        </div>
      </div>
    </div>
  );
};

export default ItemSkeleton;
