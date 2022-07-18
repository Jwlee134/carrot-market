import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";
import { parseId } from "@libs/server/utils";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    session: { user },
    query: { id },
    body: { message },
  } = req;
  const streamMessage = await client.streamMessage.create({
    data: {
      text: message,
      user: { connect: { id: user?.id } },
      stream: { connect: { id: parseId(id) } },
    },
  });
  res.status(200).json({ ok: true });
}

export default withSession(withHandler({ methods: ["POST"], handler }));
