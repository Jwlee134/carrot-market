import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const token = await client.token.create({
    data: {
      user: {
        connectOrCreate: {
          where: payload,
          create: { ...payload, name: "Anonymous" },
        },
      },
      payload: "1234",
    },
  });
  res.status(200).json({ token });
}

export default withHandler("POST", handler);
