import { Product } from "@prisma/client";

export type TProduct = Product & { _count: { records: number } };

export function cls(...rest: string[]) {
  return rest.join(" ");
}

export const isProduct = (item: TProduct | number): item is TProduct =>
  (item as TProduct).id !== undefined;
