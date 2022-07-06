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
  const postExists = await client.post.findUnique({
    where: { id: parseId(id) },
  });
  if (!postExists) res.status(404).json({ ok: false });
  const wonderingExists = await client.wondering.findFirst({
    where: { postId: parseId(id), userId: user?.id },
  });
  if (wonderingExists) {
    await client.wondering.delete({ where: { id: wonderingExists.id } });
  } else {
    await client.wondering.create({
      data: {
        post: { connect: { id: parseId(id) } },
        user: { connect: { id: user?.id } },
      },
    });
  }
  res.status(200).json({ ok: true });
}

export default withSession(withHandler({ methods: ["POST"], handler }));
