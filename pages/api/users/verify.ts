import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { token } = req.body;
  const ok = await client.token.findUnique({ where: { payload: token } });
  if (!ok) {
    return res.status(404).end();
  }
  req.session.user = { id: ok.userId };
  await req.session.save();
  await client.token.deleteMany({ where: { userId: ok.userId } });
  res.status(200).json({ ok: true });
}

export default withSession(withHandler("POST", handler));
