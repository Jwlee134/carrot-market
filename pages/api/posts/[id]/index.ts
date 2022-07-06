import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";
import { parseId } from "@libs/server/utils";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: { id: parseId(id) },
    include: {
      _count: { select: { answers: true, wonderings: true } },
      answers: {
        include: { user: { select: { id: true, avatar: true, name: true } } },
      },
      user: { select: { id: true, avatar: true, name: true } },
    },
  });
  if (!post) res.status(404).json({ ok: false });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: { postId: post?.id, userId: user?.id },
      select: { id: true },
    })
  );
  res.status(200).json({ ok: true, post, isWondering });
}

export default withSession(withHandler({ methods: ["GET"], handler }));
