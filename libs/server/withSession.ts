import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export default function withSession(
  handler: (req: NextApiRequest, res: NextApiResponse<any>) => Promise<any>
) {
  return withIronSessionApiRoute(handler, {
    cookieName: "carrot_session",
    password: process.env.SESSION_PW!,
    cookieOptions: { secure: process.env.NODE_ENV === "production" },
  });
}
