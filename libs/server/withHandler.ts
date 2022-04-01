import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      res.status(405).end();
      return;
    }
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}
