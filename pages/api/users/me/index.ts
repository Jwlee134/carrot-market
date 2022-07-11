import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const id = req.session.user?.id;
  const user = await client.user.findUnique({ where: { id } });
  res.status(200).json({ ok: true, user });
}

export default withSession(withHandler({ methods: ["GET"], handler }));
