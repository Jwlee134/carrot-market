import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === "POST") {
    const {
      body,
      session: { user },
    } = req;
    const stream = await client.stream.create({
      data: { user: { connect: { id: user?.id } }, ...body },
      select: { id: true },
    });
    res.status(200).json({ ok: true, stream });
  }
  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ ok: true, streams });
  }
}

export default withSession(withHandler({ methods: ["POST", "GET"], handler }));
