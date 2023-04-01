const crypto = require('crypto')
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line no-console
  console.log('再検証！')
  // eslint-disable-next-line no-console
  console.log(`req.headers['x-microcms-signature']`, req.headers['x-microcms-signature'])
  // eslint-disable-next-line no-console
  console.log('process.env.MICROCMS_SIGNATURE', process.env.MICROCMS_SIGNATURE)

  const signature = req.headers['x-microcms-signature']

  // eslint-disable-next-line no-console
  console.log('req.body', req.body)
  // eslint-disable-next-line no-console
  console.log('req.headers', req.headers)

  const expectedSignature = crypto
    .createHmac('sha256', process.env.MICROCMS_SIGNATURE)
    .update(JSON.stringify(req.body))
    .digest('hex')
  const expectedSignature_dig = crypto
    .createHmac('sha256', process.env.MICROCMS_SIGNATURE)
    .update(JSON.stringify(req.body))
  const expectedSignature_dig_up = crypto.createHmac('sha256', process.env.MICROCMS_SIGNATURE)

  // eslint-disable-next-line no-console
  console.log('expectedSignature', expectedSignature)
  // eslint-disable-next-line no-console
  console.log('expectedSignature_dig', expectedSignature_dig)
  // eslint-disable-next-line no-console
  console.log('expectedSignature_dig_up', expectedSignature_dig_up)
  // eslint-disable-next-line no-console
  console.log('Buffer.from(expectedSignature)', Buffer.from(expectedSignature))
  // eslint-disable-next-line no-console
  console.log('signature', signature)
  // eslint-disable-next-line no-console
  console.log(`req.headers['x-microcms-signature']`, Buffer.from(signature?.toString() || ''))

  // if check http request header named x-microcms-signature
  if (req.headers['x-microcms-signature'] !== process.env.MICROCMS_SIGNATURE) {
    return res.status(401).send('Unauthorized')
  }
  // eslint-disable-next-line no-console
  console.log('401ではない')

  try {
    await res.revalidate('/projects')
    return res.status(200).json({
      message: 'Revalidated',
      hd: req.headers['x-microcms-signature'],
      bools: req.headers['x-microcms-signature'] !== process.env.MICROCMS_SIGNATURE
    })
    // return res.status(200).send('Revalidated')
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
