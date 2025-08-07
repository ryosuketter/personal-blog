import '../styles/global.scss'

import type { AppProps } from 'next/app'
import { Rubik } from 'next/font/google'

import { Layout } from '@/components/Layout'

const rubik = Rubik({
  subsets: ['latin']
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <style jsx global>{`
        html,
        body {
          font-family:
            ${rubik.style.fontFamily}, 'Noto Sans JP', 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴ ProN W3',
            'Hiragino Kaku Gothic ProN', メイリオ, Meiryo, 'Hiragino Sans', sans-serif;
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
