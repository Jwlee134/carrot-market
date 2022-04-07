import twilio from "twilio";
import mail from "@sendgrid/mail";
import client from "@libs/server/client";
import withHandler, { Response } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
mail.setApiKey(process.env.SG_API_KEY!);

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { phone, email } = req.body;
  if (!phone && !email) {
    res.status(400).json({ ok: false });
    return;
  }
  const user = phone ? { phone: +phone } : { email };
  const payload = new Date().valueOf().toString();
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: user,
          create: { ...user, name: "Anonymous" },
        },
      },
    },
  });
  if (phone) {
    /* const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}.`,
    });
    console.log(message); */
  } else {
    /* const email = await mail.send({
      from: "sorhd134@gmail.com",
      to: "sorhd134@gmail.com",
      subject: "Your Carrot Market Verification Email.",
      text: `Your token is ${payload}.`,
      html: `Your token is ${payload}.`,
    });
    console.log(email); */
  }
  res.status(200).json({ ok: true });
}

export default withHandler("POST", handler);
