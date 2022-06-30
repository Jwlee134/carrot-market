import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    body: { name, price, description },
    session: { user: { id } = {} },
  } = req;
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      user: { connect: { id } },
      image: "",
    },
  });
  res.status(200).json({ ok: true, product });
}

export default withSession(withHandler({ method: "POST", handler }));
