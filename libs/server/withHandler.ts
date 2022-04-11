import { NextApiRequest, NextApiResponse } from "next";

export interface Response {
  ok: boolean;
  [key: string]: any;
}

interface Config {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<Response>
  ) => Promise<any>;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: Config) {
  return async function (req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, user: null });
    }
    try {
      await handler(req, res);
    } catch (error) {
      res.status(500).json({ ok: false, error });
    }
  };
}
