import { Product as ProductType } from "@prisma/client";
import Product from "@components/Product";

export type TProduct = ProductType & { _count: { records: number } };

interface Props<T> {
  data: T[] | undefined;
  href: (item: T) => string;
}

const isProduct = (item: TProduct | number): item is TProduct =>
  (item as TProduct).id !== undefined;

const ProductList = <T extends object>({ data, href }: Props<T>) => {
  return (
    <>
      {(data ?? Array(10).fill(1)).map((item, i) => (
        <Product
          key={isProduct(item) ? item.id : i}
          href={isProduct(item) ? href(item as T) : null}
          {...(isProduct(item) ? item : null)}
        />
      ))}
    </>
  );
};

export default ProductList;
