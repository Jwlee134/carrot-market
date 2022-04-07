import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { phone, email } = req.body;
  if (!phone && !email) {
    res.status(400).json({ ok: false });
    return;
  }
  const user = phone ? { phone: +phone } : { email };
  const payload = new Date().valueOf().toString();
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: user,
          create: { ...user, name: "Anonymous" },
        },
      },
    },
  });
  res.status(200).json({ ok: true });
}

export default withHandler("POST", handler);
