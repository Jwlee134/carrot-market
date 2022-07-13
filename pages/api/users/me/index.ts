import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const id = req.session.user?.id;
  const user = await client.user.findUnique({ where: { id } });
  if (req.method === "GET") {
    res.status(200).json({ ok: true, user });
  }
  if (req.method === "POST") {
    const { email, phone, name } = req.body;
    if (email && email !== user?.email) {
      const emailExists = Boolean(
        await client.user.findUnique({ where: { email }, select: { id: true } })
      );
      if (emailExists) {
        return res
          .status(409)
          .json({ ok: false, error: "This email is already taken." });
      } else {
        await client.user.update({ where: { id }, data: { email } });
      }
    }
    if (phone && phone !== user?.phone) {
      const phoneExists = Boolean(
        await client.user.findUnique({ where: { phone }, select: { id: true } })
      );
      if (phoneExists) {
        return res
          .status(409)
          .json({ ok: false, error: "This phone number is already taken." });
      } else {
        await client.user.update({ where: { id }, data: { phone } });
      }
    }
    if (name) {
      await client.user.update({ where: { id }, data: { name } });
    }
    res.status(200).json({ ok: true });
  }
}

export default withSession(withHandler({ methods: ["GET", "POST"], handler }));
