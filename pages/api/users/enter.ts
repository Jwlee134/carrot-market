import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  // where에서 찾고 있으면 update로 넘어가는데 nothing, 없으면 create
  const user = await client.user.upsert({
    where: { ...payload },
    create: { ...payload, name: "Anonymous" },
    update: {},
  });
  res.status(200).json({ user });
}

export default withHandler("POST", handler);
