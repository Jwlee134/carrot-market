import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { token } = req.body;
  const ok = await client.token.findUnique({ where: { payload: token } });
  if (!ok) {
    return res.status(404).end();
  }
  req.session.user = { id: ok.userId };
  await req.session.save();
  res.status(200).json({ ok: true });
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrot_session",
  password: process.env.SESSION_PW!,
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
});
