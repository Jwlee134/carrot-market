import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  res.status(200).json({ ok: true });
}

export default withSession(withHandler({ methods: ["POST"], handler }));
