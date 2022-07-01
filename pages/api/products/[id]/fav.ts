import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { id },
    session: { user },
  } = req;
  const parsedId = +(id as string).toString();
  const productExists = await client.product.findUnique({
    where: { id: parsedId },
  });
  if (!productExists) {
    res.status(404).json({ ok: false });
  }
  const favExists = await client.fav.findFirst({
    where: { productId: parsedId, userId: user?.id },
  });
  if (favExists) {
    await client.fav.delete({ where: { id: favExists.id } });
  } else {
    await client.fav.create({
      data: {
        product: { connect: { id: parsedId } },
        user: { connect: { id: user?.id } },
      },
    });
  }
  res.status(200).json({ ok: true });
}

export default withSession(withHandler({ methods: ["POST"], handler }));
