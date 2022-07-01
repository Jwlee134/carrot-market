import Link from "next/link";
import { TProduct } from "pages";
import Skeleton from "./Skeleton";

interface Props extends Partial<TProduct> {
  href: string | null;
}

const Item = ({ href, name, price, image, _count }: Props) => {
  if (!href) {
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
  }

  return (
    <Link href={href}>
      <a>
        <div className="flex cursor-pointer justify-between px-4 py-4">
          <div className="flex space-x-4">
            <div className="h-20 w-20 rounded-md bg-gray-400"></div>
            <div className="flex flex-col justify-between pt-2">
              <h3 className="text-sm font-medium text-gray-900">{name}</h3>
              <span className="mt-1 font-medium text-gray-900">${price}</span>
            </div>
          </div>
          <div className="flex items-end justify-end space-x-2">
            <div className="flex items-center space-x-0.5 text-sm text-gray-600">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>{_count?.favs}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Item;
