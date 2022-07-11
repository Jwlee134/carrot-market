import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";
import { Kinds } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    session: { user },
    query: { type },
  } = req;
  const records = await client.product.findMany({
    where: { records: { every: { kinds: type as Kinds, userId: user?.id } } },
    include: { _count: { select: { records: true } } },
  });
  res.status(200).json({ ok: true, records });
}

export default withSession(withHandler({ methods: ["GET"], handler }));
