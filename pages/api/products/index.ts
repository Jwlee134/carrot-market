import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === "POST") {
    const {
      body: { name, price, description, pictureId },
      session: { user: { id } = {} },
    } = req;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        user: { connect: { id } },
        ...(pictureId ? { image: pictureId } : { image: "" }),
      },
    });
    res.status(200).json({ ok: true, product });
  }
  if (req.method == "GET") {
    const products = await client.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { records: true } } },
    });
    res.status(200).json({ ok: true, products });
  }
}

export default withSession(withHandler({ methods: ["GET", "POST"], handler }));
