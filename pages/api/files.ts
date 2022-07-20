import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const response = await (
    await fetch(
      "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v2/direct_upload",
      { method: "POST", headers: { Authorization: "Bearer <API_TOKEN>" } }
    )
  ).json();
  res.status(200).json({ ok: true, ...response.result });
}

export default withSession(
  withHandler({ methods: ["GET"], handler, isPrivate: false })
);
