import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";
import { parseId } from "@libs/server/utils";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { id },
    body: { answer },
    session: { user },
  } = req;
  const post = await client.post.findUnique({ where: { id: parseId(id) } });
  if (!post) res.status(404).json({ ok: false });
  const newAnswer = await client.answer.create({
    data: {
      text: answer,
      post: { connect: { id: post?.id } },
      user: { connect: { id: user?.id } },
    },
  });
  res.status(200).json({ ok: true, answer: newAnswer });
}

export default withSession(withHandler({ methods: ["POST"], handler }));
