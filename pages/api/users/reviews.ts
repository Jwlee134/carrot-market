import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const reviews = await client.review.findMany({
    where: { createdForId: req.session.user?.id },
    include: { createdBy: { select: { avatar: true, name: true } } },
  });
  res.status(200).json({ ok: true, reviews });
}

export default withSession(withHandler({ methods: ["GET"], handler }));
