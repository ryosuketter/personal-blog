import type { NextApiRequest, NextApiResponse } from 'next'

const crypto = require('crypto')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  if (!req.headers['x-microcms-signature']) return res.status(401).send('Invalid signature')

  const signature = req.headers['x-microcms-signature'] as string

  const expectedSignature: string = crypto
    .createHmac('sha256', process.env.MICROCMS_SIGNATURE)
    .update(JSON.stringify(req.body))
    .digest('hex')

  // eslint-disable-next-line no-console
  console.log('signature', signature)
  // eslint-disable-next-line no-console
  console.log('expectedSignature', expectedSignature)

  // if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
  //   return res.status(401).send('Invalid signature')
  // }

  try {
    await res.revalidate('/projects')
    return res.status(200).send('Revalidated')
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}