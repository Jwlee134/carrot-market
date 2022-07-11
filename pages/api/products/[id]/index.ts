import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { id },
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: { id: +(id as string).toString() },
    include: { user: { select: { id: true, avatar: true, name: true } } },
  });
  const terms = product?.name
    .split(" ")
    .map((term) => ({ name: { contains: term } }));
  const relatedProducts = await client.product.findMany({
    where: { OR: terms, AND: [{ id: { not: product?.id } }] },
  });
  const isLiked = Boolean(
    await client.record.findFirst({
      where: { kinds: "Fav", productId: product?.id, userId: user?.id },
      select: { id: true },
    })
  );
  res.status(200).json({ ok: true, product, relatedProducts, isLiked });
}

export default withSession(withHandler({ methods: ["GET"], handler }));
