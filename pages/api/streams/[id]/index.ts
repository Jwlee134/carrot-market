import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";
import { parseId } from "@libs/server/utils";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { id },
  } = req;
  const stream = await client.stream.findUnique({
    where: { id: parseId(id) },
    include: {
      messages: {
        select: {
          id: true,
          text: true,
          user: { select: { id: true, avatar: true } },
        },
      },
    },
  });
  if (!stream) {
    res.status(404).json({ ok: false });
    return;
  }
  res.status(200).json({ ok: true, stream });
}

export default withSession(withHandler({ methods: ["GET"], handler }));
