import type { NextPage } from "next";
import Link from "next/link";
import Button from "@components/Button";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Product, User } from "@prisma/client";
import Skeleton from "@components/Skeleton";
import RelatedProduct from "@components/RelatedProduct";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Image from "next/image";

type ProductType = Product & {
  user: { id: number; avatar: string; name: string };
};

interface ProductDetail {
  ok: boolean;
  product: ProductType;
  relatedProducts: Product[];
  isLiked: boolean;
}

const isProduct = (item: Product | number): item is Product =>
  (item as Product).id !== undefined;

const ProductDetail: NextPage = () => {
  const { query } = useRouter();
  const { data: { ok, product, relatedProducts, isLiked } = {}, mutate } =
    useSWR<ProductDetail>(query.id ? `/products/${query.id}` : null);
  const [toggleFav, { loading }] = useMutation(`/products/${query.id}/fav`);

  const onFavClick = async () => {
    mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    if (loading) return;
    await toggleFav({});
    mutate();
  };

  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          {product?.image ? (
            <img src={product?.image} />
          ) : (
            <div className="h-96 bg-slate-300" />
          )}
          <div className="flex items-center space-x-3 border-t border-b py-3 leading-none">
            {product?.user.avatar ? (
              <Image
                src={product?.user.avatar}
                alt="Profile picture of seller"
                className="h-12 w-12 rounded-full"
                width={48}
                height={48}
              />
            ) : (
              <Skeleton width="3rem" height="3rem" borderRadius={1000} />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {product?.user.name || <Skeleton />}
              </p>{" "}
              <Link href={`/users/profile/${product?.user.name}`}>
                <a>
                  <p className="text-xs font-medium text-gray-500">
                    View profile &rarr;
                  </p>
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name || <Skeleton />}
            </h1>
            <span className="mt-3 block text-3xl text-gray-900">
              {product?.price ? `$${product.price}` : <Skeleton />}
            </span>
            <p className="my-6 text-base text-gray-700">
              {product?.description || <Skeleton count={5} />}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button text="Talk to seller" large />
              <button
                onClick={onFavClick}
                className={cls(
                  "flex items-center justify-center rounded-md p-3 hover:bg-gray-100",
                  isLiked
                    ? "text-red-400 hover:text-red-500"
                    : "text-gray-400 hover:text-gray-500"
                )}
              >
                {isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {(relatedProducts ?? [1, 2, 3, 4]).map((item, i) => (
              <RelatedProduct
                key={isProduct(item) ? item.id : i}
                href={isProduct(item) ? `/products/${item.id}` : null}
                {...(isProduct(item) ? item : null)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
