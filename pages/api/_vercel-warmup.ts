// pages/api/_vercel-warmup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ ok: true, warmed: true, time: new Date().toISOString() });
}
