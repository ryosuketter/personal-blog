import siteImg from 'images/ogp.jpg'
import { siteMeta } from 'libs/constants'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'

const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } = siteMeta

interface Props {
  pageTitle?: string
  pageDesc?: string
  pageImg?: string
  pageImgW?: string
  pageImgH?: string
}

export const Meta: FC<Props> = ({ pageTitle, pageDesc, pageImg, pageImgW, pageImgH }) => {
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle
  const desc = pageDesc ?? siteDesc

  const router = useRouter()
  const url = `${siteUrl}${router.asPath}`

  // OGP
  const img = pageImg || siteImg.src
  const imgW = pageImgW || siteImg.width
  const imgH = pageImgH || siteImg.height
  const imgUrl = img.startsWith('https') ? img : `${siteUrl}${img}`

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />

      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />

      <meta name="robots" content="noindex" />

      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={siteType} />
      <meta property="og:locale" content={siteLocale} />

      <link rel="icon" href={siteIcon} />
      <link rel="apple-touch-icon" href={siteIcon} />

      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={`${imgW}`} />
      <meta property="og:image:height" content={`${imgH}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
