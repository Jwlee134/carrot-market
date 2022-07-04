import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    body: { question },
    session: { user },
  } = req;
  const post = await client.post.create({
    data: { question, user: { connect: { id: user?.id } } },
  });

  res.status(200).json({ ok: true, id: post.id });
}

export default withSession(withHandler({ methods: ["POST"], handler }));
