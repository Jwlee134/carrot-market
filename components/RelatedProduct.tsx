import { Product } from "@prisma/client";
import Link from "next/link";
import Skeleton from "./Skeleton";

interface Props extends Partial<Product> {
  href: string | null;
}

const RelatedProduct = ({ href, image, name, price }: Props) => {
  if (!href) {
    return (
      <div>
        <div className="mb-4 h-56 w-full bg-slate-300 leading-none">
          <Skeleton height="14rem" />
        </div>
        <h3 className="-mb-1 text-gray-700">
          <Skeleton />
        </h3>
        <span className="text-sm font-medium text-gray-900">
          <Skeleton />
        </span>
      </div>
    );
  }
  return (
    <Link href={href}>
      <a>
        <div className="mb-4 h-56 w-full bg-slate-300 leading-none">
          {image}
        </div>
        <h3 className="-mb-1 text-gray-700">{name}</h3>
        <span className="text-sm font-medium text-gray-900">${price}</span>
      </a>
    </Link>
  );
};

export default RelatedProduct;
