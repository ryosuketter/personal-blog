import type { NextApiRequest, NextApiResponse } from 'next'

const crypto = require('crypto')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const signature = req.headers['x-microcms-signature'] as string

  const expectedSignature = crypto
    .createHmac('sha256', process.env.MICROCMS_SIGNATURE)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return res.status(401).send('Invalid signature')
  }

  try {
    await res.revalidate('/projects')
    return res.status(200).send('Revalidated')
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
