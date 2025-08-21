// pages/api/hello.ts  (Pages Router — guaranteed Serverless Function)
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ ok: true, from: "pages/api/hello.ts", time: new Date().toISOString() });
}
