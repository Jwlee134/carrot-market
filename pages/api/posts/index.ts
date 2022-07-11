import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    query: { lat, lng },
    body: { question, latitude, longitude },
    session: { user },
  } = req;
  if (req.method === "POST") {
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: { connect: { id: user?.id } },
      },
    });
    res.status(200).json({ ok: true, id: post.id });
  }
  if (req.method === "GET") {
    const posts = await client.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        _count: { select: { answers: true, wonderings: true } },
      },
      ...(lat && lng
        ? {
            where: {
              latitude: {
                gte: parseFloat(lat.toString()) - 0.01,
                lte: parseFloat(lat.toString()) + 0.01,
              },
              longitude: {
                gte: parseFloat(lng.toString()) - 0.01,
                lte: parseFloat(lng.toString()) + 0.01,
              },
            },
          }
        : {}),
    });
    res.status(200).json({ ok: true, posts });
  }
}

export default withSession(withHandler({ methods: ["POST", "GET"], handler }));
