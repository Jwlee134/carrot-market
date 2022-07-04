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
  const postExists = await client.post.findUnique({
    where: { id: parsedId },
  });
  if (!postExists) res.status(404).json({ ok: false });
  const wonderingExists = await client.wondering.findFirst({
    where: { postId: parsedId, userId: user?.id },
  });
  if (wonderingExists) {
    await client.wondering.delete({ where: { id: wonderingExists.id } });
  } else {
    await client.wondering.create({
      data: {
        post: { connect: { id: parsedId } },
        user: { connect: { id: user?.id } },
      },
    });
  }
  res.status(200).json({ ok: true });
}

export default withSession(withHandler({ methods: ["POST"], handler }));
